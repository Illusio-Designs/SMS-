import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { run, get } from '../config/db.js'
import { asyncHandler, ApiError, ok } from '../utils/helpers.js'
import { authenticate, resolveTenant, requireRole } from '../middleware/index.js'

// School admin manages the tenant's own users (in the tenant's own DB).
const router = Router()
router.use(authenticate, resolveTenant, requireRole('admin'))

// GET /api/users
router.get('/', asyncHandler(async (req, res) => {
  const users = await run(req.db, 'SELECT id, role, name, email, phone, status, student_id, created_at FROM users ORDER BY role, name')
  ok(res, { users })
}))

// POST /api/users  { role, name, email, phone, password, studentId }
router.post('/', asyncHandler(async (req, res) => {
  const { role, name, email, phone, password, studentId } = req.body || {}
  if (!role || !name || !email || !password) throw new ApiError(400, 'role, name, email and password are required')
  if (!['admin', 'staff', 'teacher', 'student', 'parent'].includes(role)) throw new ApiError(400, 'invalid role')
  if (await get(req.db, 'SELECT id FROM users WHERE email = :email', { email })) throw new ApiError(409, 'A user with this email already exists')
  const r = await run(req.db,
    'INSERT INTO users (role, name, email, phone, password_hash, student_id) VALUES (:role, :name, :email, :phone, :hash, :stid)',
    { role, name, email, phone: phone ?? null, hash: bcrypt.hashSync(password, 10), stid: studentId ?? null })
  ok(res, { id: r.insertId }, 201)
}))

// POST /api/users/:id/status  { status }
router.post('/:id/status', asyncHandler(async (req, res) => {
  const { status } = req.body || {}
  if (!['active', 'disabled'].includes(status)) throw new ApiError(400, "status must be 'active' or 'disabled'")
  const r = await run(req.db, 'UPDATE users SET status = :status WHERE id = :id', { status, id: req.params.id })
  if (!r.affectedRows) throw new ApiError(404, 'User not found')
  ok(res, { id: Number(req.params.id), status })
}))

export default router
