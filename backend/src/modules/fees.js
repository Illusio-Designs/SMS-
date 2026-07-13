import { Router } from 'express'
import { query, queryOne } from '../config/db.js'
import { asyncHandler, ApiError, ok } from '../utils/helpers.js'
import { authenticate, resolveTenant, requireRole } from '../middleware/index.js'

const router = Router()
router.use(authenticate, resolveTenant)

// GET /api/fees  — invoices for the tenant (parents see only their child)
router.get('/', asyncHandler(async (req, res) => {
  const params = { sid: req.schoolId }
  let sql = `SELECT f.*, s.name AS student, s.admission_no
             FROM fee_invoices f JOIN students s ON s.id = f.student_id AND s.school_id = f.school_id
             WHERE f.school_id = :sid`
  if (req.auth.kind === 'tenant' && req.auth.role === 'student' && req.auth.sub) {
    const me = await queryOne('SELECT student_id FROM users WHERE id = :id AND school_id = :sid', { id: req.auth.sub, sid: req.schoolId })
    if (me?.student_id) { sql += ' AND f.student_id = :stid'; params.stid = me.student_id }
  }
  sql += ' ORDER BY f.due_date'
  ok(res, { invoices: await query(sql, params) })
}))

// GET /api/fees/summary  — collection totals
router.get('/summary', asyncHandler(async (req, res) => {
  const row = await queryOne(
    `SELECT COALESCE(SUM(paid),0) AS collected,
            COALESCE(SUM(amount - paid),0) AS pending,
            COALESCE(SUM(CASE WHEN status='overdue' THEN amount - paid ELSE 0 END),0) AS overdue,
            SUM(status IN ('due','overdue','partial')) AS open_invoices
     FROM fee_invoices WHERE school_id = :sid`,
    { sid: req.schoolId }
  )
  ok(res, { summary: row })
}))

// POST /api/fees/:id/pay  { amount, method }
router.post('/:id/pay', requireRole('admin', 'staff', 'parent'), asyncHandler(async (req, res) => {
  const { amount, method } = req.body || {}
  const inv = await queryOne('SELECT * FROM fee_invoices WHERE school_id = :sid AND id = :id', { sid: req.schoolId, id: req.params.id })
  if (!inv) throw new ApiError(404, 'Invoice not found')
  const pay = Number(amount ?? (Number(inv.amount) - Number(inv.paid)))
  if (pay <= 0) throw new ApiError(400, 'amount must be positive')

  const newPaid = Number(inv.paid) + pay
  const status = newPaid >= Number(inv.amount) ? 'paid' : 'partial'
  await query('UPDATE fee_invoices SET paid = :paid, status = :status, method = :method WHERE school_id = :sid AND id = :id',
    { paid: Math.min(newPaid, Number(inv.amount)), status, method: method || 'UPI', sid: req.schoolId, id: req.params.id })
  ok(res, { id: Number(req.params.id), paid: Math.min(newPaid, Number(inv.amount)), status })
}))

export default router
