import { Router } from 'express'
import { run, get } from '../config/db.js'
import { asyncHandler, ApiError, ok } from '../utils/helpers.js'
import { authenticate, resolveTenant, requireRole } from '../middleware/index.js'

// req.db is this tenant's OWN database pool (set by resolveTenant) — physical isolation.
const router = Router()
router.use(authenticate, resolveTenant)

// GET /api/students?search=&classId=
router.get('/', asyncHandler(async (req, res) => {
  const { search, classId } = req.query
  const params = {}
  let sql = `SELECT s.*, CONCAT(c.name, '-', c.section) AS class
             FROM students s LEFT JOIN classes c ON c.id = s.class_id WHERE 1=1`
  if (search) { sql += ' AND (s.name LIKE :q OR s.admission_no LIKE :q OR s.guardian_name LIKE :q)'; params.q = `%${search}%` }
  if (classId) { sql += ' AND s.class_id = :cid'; params.cid = classId }
  sql += ' ORDER BY s.roll_no IS NULL, s.roll_no, s.name'
  ok(res, { students: await run(req.db, sql, params) })
}))

// GET /api/students/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const student = await get(req.db, 'SELECT * FROM students WHERE id = :id', { id: req.params.id })
  if (!student) throw new ApiError(404, 'Student not found')
  ok(res, { student })
}))

// POST /api/students
router.post('/', requireRole('admin', 'staff', 'teacher'), asyncHandler(async (req, res) => {
  const { admissionNo, rollNo, name, gender, dob, classId, guardianName, guardianPhone } = req.body || {}
  if (!admissionNo || !name) throw new ApiError(400, 'admissionNo and name are required')
  if (await get(req.db, 'SELECT id FROM students WHERE admission_no = :adm', { adm: admissionNo })) throw new ApiError(409, 'Admission number already exists')
  const r = await run(req.db,
    `INSERT INTO students (admission_no, roll_no, name, gender, dob, class_id, guardian_name, guardian_phone)
     VALUES (:adm, :roll, :name, :gender, :dob, :cid, :gname, :gphone)`,
    { adm: admissionNo, roll: rollNo ?? null, name, gender: gender ?? null, dob: dob ?? null, cid: classId ?? null, gname: guardianName ?? null, gphone: guardianPhone ?? null })
  ok(res, { student: await get(req.db, 'SELECT * FROM students WHERE id = :id', { id: r.insertId }) }, 201)
}))

// PATCH /api/students/:id
router.patch('/:id', requireRole('admin', 'staff', 'teacher'), asyncHandler(async (req, res) => {
  const map = { rollNo: 'roll_no', name: 'name', gender: 'gender', dob: 'dob', classId: 'class_id', guardianName: 'guardian_name', guardianPhone: 'guardian_phone', status: 'status' }
  const sets = [], params = { id: req.params.id }
  for (const [key, col] of Object.entries(map)) if (req.body[key] !== undefined) { sets.push(`${col} = :${col}`); params[col] = req.body[key] }
  if (!sets.length) throw new ApiError(400, 'No updatable fields provided')
  const r = await run(req.db, `UPDATE students SET ${sets.join(', ')} WHERE id = :id`, params)
  if (!r.affectedRows) throw new ApiError(404, 'Student not found')
  ok(res, { updated: true })
}))

// DELETE /api/students/:id
router.delete('/:id', requireRole('admin'), asyncHandler(async (req, res) => {
  const r = await run(req.db, 'DELETE FROM students WHERE id = :id', { id: req.params.id })
  if (!r.affectedRows) throw new ApiError(404, 'Student not found')
  ok(res, { deleted: true })
}))

export default router
