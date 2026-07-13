import { Router } from 'express'
import { query } from '../config/db.js'
import { asyncHandler, ApiError, ok } from '../utils/helpers.js'
import { authenticate, resolveTenant, requireRole } from '../middleware/index.js'

const router = Router()
router.use(authenticate, resolveTenant)

// GET /api/attendance?date=YYYY-MM-DD
router.get('/', asyncHandler(async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10)
  const rows = await query(
    `SELECT a.id, a.student_id, a.date, a.status, s.name, s.roll_no
     FROM attendance a JOIN students s ON s.id = a.student_id AND s.school_id = a.school_id
     WHERE a.school_id = :sid AND a.date = :date ORDER BY s.roll_no`,
    { sid: req.schoolId, date }
  )
  ok(res, { date, attendance: rows })
}))

// POST /api/attendance  (teacher/admin/staff)  { date, records: [{ studentId, status }] }
router.post('/', requireRole('admin', 'staff', 'teacher'), asyncHandler(async (req, res) => {
  const { date, records } = req.body || {}
  if (!date || !Array.isArray(records) || !records.length) throw new ApiError(400, 'date and non-empty records[] are required')
  const valid = ['present', 'absent', 'late', 'leave']
  let saved = 0
  for (const rec of records) {
    if (!rec.studentId || !valid.includes(rec.status)) throw new ApiError(400, `Invalid record: ${JSON.stringify(rec)}`)
    // Upsert per (school, student, date) — the unique key enforces one row/day.
    await query(
      `INSERT INTO attendance (school_id, student_id, date, status, marked_by)
       VALUES (:sid, :stid, :date, :status, :by)
       ON DUPLICATE KEY UPDATE status = VALUES(status), marked_by = VALUES(marked_by)`,
      { sid: req.schoolId, stid: rec.studentId, date, status: rec.status, by: req.auth.sub || null }
    )
    saved++
  }
  ok(res, { date, saved })
}))

// GET /api/attendance/summary?from=&to=  — per-student attendance %
router.get('/summary', asyncHandler(async (req, res) => {
  const rows = await query(
    `SELECT s.id AS student_id, s.name,
            SUM(a.status = 'present') AS present,
            COUNT(a.id) AS total,
            ROUND(100 * SUM(a.status = 'present') / NULLIF(COUNT(a.id),0)) AS pct
     FROM students s LEFT JOIN attendance a ON a.student_id = s.id AND a.school_id = s.school_id
     WHERE s.school_id = :sid GROUP BY s.id, s.name ORDER BY pct`,
    { sid: req.schoolId }
  )
  ok(res, { summary: rows })
}))

export default router
