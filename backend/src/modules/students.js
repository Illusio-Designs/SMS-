import { Router } from 'express'
import { query, queryOne } from '../config/db.js'
import { asyncHandler, ApiError, ok } from '../utils/helpers.js'
import { authenticate, resolveTenant, requireRole } from '../middleware/index.js'

// Tenant-scoped: every query filters by req.schoolId (set by resolveTenant).
const router = Router()
router.use(authenticate, resolveTenant)

// GET /api/students?search=&classId=
router.get('/', asyncHandler(async (req, res) => {
  const { search, classId } = req.query
  const params = { sid: req.schoolId }
  let sql = `SELECT s.*, CONCAT(c.name, '-', c.section) AS class
             FROM students s LEFT JOIN classes c ON c.id = s.class_id AND c.school_id = s.school_id
             WHERE s.school_id = :sid`
  if (search) { sql += ' AND (s.name LIKE :q OR s.admission_no LIKE :q OR s.guardian_name LIKE :q)'; params.q = `%${search}%` }
  if (classId) { sql += ' AND s.class_id = :cid'; params.cid = classId }
  sql += ' ORDER BY s.roll_no IS NULL, s.roll_no, s.name'
  ok(res, { students: await query(sql, params) })
}))

// GET /api/students/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const student = await queryOne('SELECT * FROM students WHERE school_id = :sid AND id = :id', { sid: req.schoolId, id: req.params.id })
  if (!student) throw new ApiError(404, 'Student not found')
  ok(res, { student })
}))

// POST /api/students  (admin/staff/teacher)
router.post('/', requireRole('admin', 'staff', 'teacher'), asyncHandler(async (req, res) => {
  const { admissionNo, rollNo, name, gender, dob, classId, guardianName, guardianPhone } = req.body || {}
  if (!admissionNo || !name) throw new ApiError(400, 'admissionNo and name are required')
  const dupe = await queryOne('SELECT id FROM students WHERE school_id = :sid AND admission_no = :adm', { sid: req.schoolId, adm: admissionNo })
  if (dupe) throw new ApiError(409, 'A student with this admission number already exists')
  const r = await query(
    `INSERT INTO students (school_id, admission_no, roll_no, name, gender, dob, class_id, guardian_name, guardian_phone)
     VALUES (:sid, :adm, :roll, :name, :gender, :dob, :cid, :gname, :gphone)`,
    { sid: req.schoolId, adm: admissionNo, roll: rollNo ?? null, name, gender: gender ?? null, dob: dob ?? null,
      cid: classId ?? null, gname: guardianName ?? null, gphone: guardianPhone ?? null }
  )
  const student = await queryOne('SELECT * FROM students WHERE id = :id', { id: r.insertId })
  ok(res, { student }, 201)
}))

// PATCH /api/students/:id  (admin/staff/teacher)
router.patch('/:id', requireRole('admin', 'staff', 'teacher'), asyncHandler(async (req, res) => {
  const map = { rollNo: 'roll_no', name: 'name', gender: 'gender', dob: 'dob', classId: 'class_id',
    guardianName: 'guardian_name', guardianPhone: 'guardian_phone', status: 'status' }
  const sets = [], params = { sid: req.schoolId, id: req.params.id }
  for (const [key, col] of Object.entries(map)) {
    if (req.body[key] !== undefined) { sets.push(`${col} = :${col}`); params[col] = req.body[key] }
  }
  if (!sets.length) throw new ApiError(400, 'No updatable fields provided')
  const r = await query(`UPDATE students SET ${sets.join(', ')} WHERE school_id = :sid AND id = :id`, params)
  if (!r.affectedRows) throw new ApiError(404, 'Student not found')
  ok(res, { updated: true })
}))

// DELETE /api/students/:id  (admin only)
router.delete('/:id', requireRole('admin'), asyncHandler(async (req, res) => {
  const r = await query('DELETE FROM students WHERE school_id = :sid AND id = :id', { sid: req.schoolId, id: req.params.id })
  if (!r.affectedRows) throw new ApiError(404, 'Student not found')
  ok(res, { deleted: true })
}))

export default router
