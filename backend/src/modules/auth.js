import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { queryOne } from '../config/db.js'
import { asyncHandler, ApiError, signToken, ok } from '../utils/helpers.js'
import { authenticate } from '../middleware/index.js'

const router = Router()

// --- Tenant user login (requires a school code) ---
// POST /api/auth/login  { schoolCode, email, password }
router.post('/login', asyncHandler(async (req, res) => {
  const { schoolCode, email, password } = req.body || {}
  if (!schoolCode || !email || !password) throw new ApiError(400, 'schoolCode, email and password are required')

  const school = await queryOne('SELECT id, name, code, status, primary_color, logo_url FROM schools WHERE code = :code', { code: schoolCode })
  if (!school) throw new ApiError(404, 'Unknown school code')
  if (school.status !== 'active') throw new ApiError(403, 'This school is suspended')

  const user = await queryOne(
    'SELECT id, role, name, email, password_hash, status, student_id FROM users WHERE school_id = :sid AND email = :email',
    { sid: school.id, email }
  )
  if (!user || user.status !== 'active') throw new ApiError(401, 'Invalid credentials')
  if (!bcrypt.compareSync(password, user.password_hash)) throw new ApiError(401, 'Invalid credentials')

  const token = signToken({ kind: 'tenant', sub: user.id, schoolId: school.id, role: user.role, email: user.email })
  ok(res, {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, studentId: user.student_id },
    school: { id: school.id, name: school.name, code: school.code, primaryColor: school.primary_color, logoUrl: school.logo_url },
  })
}))

// --- Platform super-admin login ---
// POST /api/auth/platform/login  { email, password }
router.post('/platform/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) throw new ApiError(400, 'email and password are required')

  const admin = await queryOne('SELECT id, name, email, password_hash, status FROM platform_admins WHERE email = :email', { email })
  if (!admin || admin.status !== 'active') throw new ApiError(401, 'Invalid credentials')
  if (!bcrypt.compareSync(password, admin.password_hash)) throw new ApiError(401, 'Invalid credentials')

  const token = signToken({ kind: 'platform', sub: admin.id, email: admin.email })
  ok(res, { token, admin: { id: admin.id, name: admin.name, email: admin.email } })
}))

// --- Who am I ---
router.get('/me', authenticate, asyncHandler(async (req, res) => {
  ok(res, { auth: req.auth })
}))

export default router
