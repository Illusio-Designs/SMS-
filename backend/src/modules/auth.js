import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { master, tenantPool, get } from '../config/db.js'
import { resolveTenantForLogin } from '../lib/tenants.js'
import { asyncHandler, ApiError, signToken, ok } from '../utils/helpers.js'
import { authenticate } from '../middleware/index.js'

const router = Router()

// --- Tenant user login ---
// Resolve the tenant by the request domain (Host header) or an explicit
// schoolCode, then authenticate against THAT tenant's own database.
// POST /api/auth/login  { email, password, schoolCode? }
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password, schoolCode } = req.body || {}
  if (!email || !password) throw new ApiError(400, 'email and password are required')

  const tenant = await resolveTenantForLogin({ schoolCode, host: req.headers.host })
  if (!tenant) throw new ApiError(404, 'Unknown school — send schoolCode or use the school domain')
  if (tenant.status !== 'active') throw new ApiError(403, 'This school is suspended')

  const pool = tenantPool(tenant.db_name)
  const user = await get(pool, 'SELECT id, role, name, email, password_hash, status, student_id FROM users WHERE email = :email', { email })
  if (!user || user.status !== 'active') throw new ApiError(401, 'Invalid credentials')
  if (!bcrypt.compareSync(password, user.password_hash)) throw new ApiError(401, 'Invalid credentials')

  const token = signToken({ kind: 'tenant', sub: user.id, tenantId: tenant.id, dbName: tenant.db_name, code: tenant.code, role: user.role, email: user.email })
  ok(res, {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, studentId: user.student_id },
    school: { id: tenant.id, name: tenant.name, code: tenant.code, domain: tenant.domain, primaryColor: tenant.primary_color, logoUrl: tenant.logo_url },
  })
}))

// --- Platform super-admin login ---
// POST /api/auth/platform/login  { email, password }
router.post('/platform/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) throw new ApiError(400, 'email and password are required')

  const admin = await master.get('SELECT id, name, email, password_hash, status FROM platform_admins WHERE email = :email', { email })
  if (!admin || admin.status !== 'active') throw new ApiError(401, 'Invalid credentials')
  if (!bcrypt.compareSync(password, admin.password_hash)) throw new ApiError(401, 'Invalid credentials')

  const token = signToken({ kind: 'platform', sub: admin.id, email: admin.email })
  ok(res, { token, admin: { id: admin.id, name: admin.name, email: admin.email } })
}))

router.get('/me', authenticate, asyncHandler(async (req, res) => ok(res, { auth: req.auth })))

export default router
