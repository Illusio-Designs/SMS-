import { Router } from 'express'
import { master, tenantPool, get } from '../config/db.js'
import { provisionTenant, dropTenant } from '../lib/tenants.js'
import { asyncHandler, ApiError, ok } from '../utils/helpers.js'
import { authenticate, requirePlatform } from '../middleware/index.js'

// Super-admin only — the control plane. No self-service / subscriptions.
const router = Router()
router.use(authenticate, requirePlatform)

// GET /api/platform/schools — list tenants (+ per-tenant counts from each DB)
router.get('/schools', asyncHandler(async (_req, res) => {
  const tenants = await master.run('SELECT id, name, code, domain, db_name, board, city, status, primary_color, created_at FROM tenants ORDER BY created_at DESC')
  const schools = await Promise.all(tenants.map(async (t) => {
    let students = 0, users = 0
    try {
      const pool = tenantPool(t.db_name)
      students = (await get(pool, 'SELECT COUNT(*) AS c FROM students'))?.c ?? 0
      users = (await get(pool, 'SELECT COUNT(*) AS c FROM users'))?.c ?? 0
    } catch { /* tenant DB unreachable */ }
    return { ...t, students, users }
  }))
  ok(res, { schools })
}))

// POST /api/platform/schools — provision a new tenant (own DB) + its first admin
router.post('/schools', asyncHandler(async (req, res) => {
  const { name, code, domain, board, city, primaryColor, adminName, adminEmail, adminPassword } = req.body || {}
  if (!name || !code) throw new ApiError(400, 'name and code are required')
  if (!/^[a-z0-9-]{2,40}$/.test(code)) throw new ApiError(400, 'code must be lowercase letters, numbers or hyphens')
  if (!adminEmail || !adminPassword) throw new ApiError(400, 'adminEmail and adminPassword are required')

  if (await master.get('SELECT id FROM tenants WHERE code = :c', { c: code })) throw new ApiError(409, 'A school with this code already exists')
  if (domain && await master.get('SELECT id FROM tenants WHERE domain = :d', { d: domain })) throw new ApiError(409, 'That domain is already in use')

  const school = await provisionTenant({ name, code, domain, board, city, primaryColor, adminName, adminEmail, adminPassword })
  ok(res, { school }, 201)
}))

// GET /api/platform/schools/:id
router.get('/schools/:id', asyncHandler(async (req, res) => {
  const school = await master.get('SELECT * FROM tenants WHERE id = :id', { id: req.params.id })
  if (!school) throw new ApiError(404, 'School not found')
  ok(res, { school })
}))

// PATCH /api/platform/schools/:id — update tenant profile (incl. domain)
router.patch('/schools/:id', asyncHandler(async (req, res) => {
  const map = { name: 'name', domain: 'domain', board: 'board', city: 'city', primaryColor: 'primary_color', logoUrl: 'logo_url' }
  const sets = [], params = { id: req.params.id }
  for (const [key, col] of Object.entries(map)) {
    if (req.body[key] !== undefined) { sets.push(`${col} = :${col}`); params[col] = req.body[key] }
  }
  if (!sets.length) throw new ApiError(400, 'No updatable fields provided')
  const r = await master.run(`UPDATE tenants SET ${sets.join(', ')} WHERE id = :id`, params)
  if (!r.affectedRows) throw new ApiError(404, 'School not found')
  ok(res, { updated: true })
}))

// POST /api/platform/schools/:id/status  { status } — admin-managed lifecycle
router.post('/schools/:id/status', asyncHandler(async (req, res) => {
  const { status } = req.body || {}
  if (!['active', 'suspended'].includes(status)) throw new ApiError(400, "status must be 'active' or 'suspended'")
  const r = await master.run('UPDATE tenants SET status = :status WHERE id = :id', { status, id: req.params.id })
  if (!r.affectedRows) throw new ApiError(404, 'School not found')
  ok(res, { id: Number(req.params.id), status })
}))

// DELETE /api/platform/schools/:id — drop the tenant's database entirely
router.delete('/schools/:id', asyncHandler(async (req, res) => {
  const removed = await dropTenant(req.params.id)
  if (!removed) throw new ApiError(404, 'School not found')
  ok(res, { deleted: true })
}))

export default router
