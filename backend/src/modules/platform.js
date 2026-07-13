import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { query, queryOne, withTransaction } from '../config/db.js'
import { asyncHandler, ApiError, ok } from '../utils/helpers.js'
import { authenticate, requirePlatform } from '../middleware/index.js'

// All routes here are super-admin only — this is how tenancy is MANAGED
// (no self-service subscriptions; the platform admin provisions schools).
const router = Router()
router.use(authenticate, requirePlatform)

// GET /api/platform/schools  — list all tenants with basic counts
router.get('/schools', asyncHandler(async (_req, res) => {
  const schools = await query(`
    SELECT s.id, s.name, s.code, s.board, s.city, s.status, s.primary_color, s.created_at,
           (SELECT COUNT(*) FROM students st WHERE st.school_id = s.id) AS students,
           (SELECT COUNT(*) FROM users u WHERE u.school_id = s.id) AS users
    FROM schools s ORDER BY s.created_at DESC`)
  ok(res, { schools })
}))

// POST /api/platform/schools — provision a new tenant + its first admin
router.post('/schools', asyncHandler(async (req, res) => {
  const { name, code, board, city, primaryColor, adminName, adminEmail, adminPassword } = req.body || {}
  if (!name || !code) throw new ApiError(400, 'name and code are required')
  if (!/^[a-z0-9-]{2,40}$/.test(code)) throw new ApiError(400, 'code must be lowercase letters, numbers or hyphens')
  if (!adminEmail || !adminPassword) throw new ApiError(400, 'adminEmail and adminPassword are required')

  const dupe = await queryOne('SELECT id FROM schools WHERE code = :code', { code })
  if (dupe) throw new ApiError(409, 'A school with this code already exists')

  const result = await withTransaction(async (conn) => {
    const [s] = await conn.execute(
      'INSERT INTO schools (name, code, board, city, primary_color) VALUES (:name, :code, :board, :city, :color)',
      { name, code, board: board || null, city: city || null, color: primaryColor || '#4F46E5' }
    )
    const schoolId = s.insertId
    await conn.execute(
      'INSERT INTO users (school_id, role, name, email, password_hash) VALUES (:sid, :role, :name, :email, :hash)',
      { sid: schoolId, role: 'admin', name: adminName || 'School Admin', email: adminEmail, hash: bcrypt.hashSync(adminPassword, 10) }
    )
    return schoolId
  })

  const school = await queryOne('SELECT id, name, code, board, city, status, primary_color, created_at FROM schools WHERE id = :id', { id: result })
  ok(res, { school }, 201)
}))

// GET /api/platform/schools/:id
router.get('/schools/:id', asyncHandler(async (req, res) => {
  const school = await queryOne('SELECT * FROM schools WHERE id = :id', { id: req.params.id })
  if (!school) throw new ApiError(404, 'School not found')
  ok(res, { school })
}))

// PATCH /api/platform/schools/:id — update tenant profile
router.patch('/schools/:id', asyncHandler(async (req, res) => {
  const fields = ['name', 'board', 'city', 'primary_color', 'logo_url']
  const map = { name: 'name', board: 'board', city: 'city', primaryColor: 'primary_color', logoUrl: 'logo_url' }
  const sets = [], params = { id: req.params.id }
  for (const [key, col] of Object.entries(map)) {
    if (req.body[key] !== undefined) { sets.push(`${col} = :${col}`); params[col] = req.body[key] }
  }
  if (!sets.length) throw new ApiError(400, 'No updatable fields provided')
  const r = await query(`UPDATE schools SET ${sets.join(', ')} WHERE id = :id`, params)
  if (!r.affectedRows) throw new ApiError(404, 'School not found')
  ok(res, { updated: true })
}))

// POST /api/platform/schools/:id/status  { status: 'active' | 'suspended' }
// This is the admin-managed lifecycle control (in place of a subscription).
router.post('/schools/:id/status', asyncHandler(async (req, res) => {
  const { status } = req.body || {}
  if (!['active', 'suspended'].includes(status)) throw new ApiError(400, "status must be 'active' or 'suspended'")
  const r = await query('UPDATE schools SET status = :status WHERE id = :id', { status, id: req.params.id })
  if (!r.affectedRows) throw new ApiError(404, 'School not found')
  ok(res, { id: Number(req.params.id), status })
}))

// DELETE /api/platform/schools/:id — remove a tenant and all its data (cascade)
router.delete('/schools/:id', asyncHandler(async (req, res) => {
  const r = await query('DELETE FROM schools WHERE id = :id', { id: req.params.id })
  if (!r.affectedRows) throw new ApiError(404, 'School not found')
  ok(res, { deleted: true })
}))

export default router
