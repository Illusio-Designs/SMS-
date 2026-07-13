import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { query, queryOne } from '../config/db.js'
import { asyncHandler, ApiError, ok } from '../utils/helpers.js'
import { authenticate, resolveTenant, requireRole } from '../middleware/index.js'

// Tenant-user management by the school admin (staff/teacher/parent/student accounts).
const router = Router()
router.use(authenticate, resolveTenant, requireRole('admin'))

// GET /api/users
router.get('/', asyncHandler(async (req, res) => {
  const users = await query(
    'SELECT id, role, name, email, phone, status, student_id, created_at FROM users WHERE school_id = :sid ORDER BY role, name',
    { sid: req.schoolId }
  )
  ok(res, { users })
}))

// POST /api/users  { role, name, email, phone, password, studentId }
router.post('/', asyncHandler(async (req, res) => {
  const { role, name, email, phone, password, studentId } = req.body || {}
  if (!role || !name || !email || !password) throw new ApiError(400, 'role, name, email and password are required')
  if (!['admin', 'staff', 'teacher', 'student', 'parent'].includes(role)) throw new ApiError(400, 'invalid role')
  const dupe = await queryOne('SELECT id FROM users WHERE school_id = :sid AND email = :email', { sid: req.schoolId, email })
  if (dupe) throw new ApiError(409, 'A user with this email already exists in this school')
  const r = await query(
    'INSERT INTO users (school_id, role, name, email, phone, password_hash, student_id) VALUES (:sid, :role, :name, :email, :phone, :hash, :stid)',
    { sid: req.schoolId, role, name, email, phone: phone ?? null, hash: bcrypt.hashSync(password, 10), stid: studentId ?? null }
  )
  ok(res, { id: r.insertId }, 201)
}))

// POST /api/users/:id/status  { status }
router.post('/:id/status', asyncHandler(async (req, res) => {
  const { status } = req.body || {}
  if (!['active', 'disabled'].includes(status)) throw new ApiError(400, "status must be 'active' or 'disabled'")
  const r = await query('UPDATE users SET status = :status WHERE school_id = :sid AND id = :id', { status, sid: req.schoolId, id: req.params.id })
  if (!r.affectedRows) throw new ApiError(404, 'User not found')
  ok(res, { id: Number(req.params.id), status })
}))

export default router
