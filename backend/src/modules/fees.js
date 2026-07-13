import { Router } from 'express'
import { run, get } from '../config/db.js'
import { asyncHandler, ApiError, ok } from '../utils/helpers.js'
import { authenticate, resolveTenant, requireRole } from '../middleware/index.js'

const router = Router()
router.use(authenticate, resolveTenant)

// GET /api/fees — invoices (a student only sees their own)
router.get('/', asyncHandler(async (req, res) => {
  const params = {}
  let sql = `SELECT f.*, s.name AS student, s.admission_no
             FROM fee_invoices f JOIN students s ON s.id = f.student_id WHERE 1=1`
  if (req.auth.role === 'student' && req.auth.sub) {
    const me = await get(req.db, 'SELECT student_id FROM users WHERE id = :id', { id: req.auth.sub })
    if (me?.student_id) { sql += ' AND f.student_id = :stid'; params.stid = me.student_id }
  }
  sql += ' ORDER BY f.due_date'
  ok(res, { invoices: await run(req.db, sql, params) })
}))

// GET /api/fees/summary
router.get('/summary', asyncHandler(async (req, res) => {
  const summary = await get(req.db,
    `SELECT COALESCE(SUM(paid),0) AS collected,
            COALESCE(SUM(amount - paid),0) AS pending,
            COALESCE(SUM(CASE WHEN status='overdue' THEN amount - paid ELSE 0 END),0) AS overdue,
            SUM(status IN ('due','overdue','partial')) AS open_invoices
     FROM fee_invoices`)
  ok(res, { summary })
}))

// POST /api/fees/:id/pay  { amount, method }
router.post('/:id/pay', requireRole('admin', 'staff', 'parent'), asyncHandler(async (req, res) => {
  const { amount, method } = req.body || {}
  const inv = await get(req.db, 'SELECT * FROM fee_invoices WHERE id = :id', { id: req.params.id })
  if (!inv) throw new ApiError(404, 'Invoice not found')
  const pay = Number(amount ?? (Number(inv.amount) - Number(inv.paid)))
  if (pay <= 0) throw new ApiError(400, 'amount must be positive')
  const newPaid = Math.min(Number(inv.paid) + pay, Number(inv.amount))
  const status = newPaid >= Number(inv.amount) ? 'paid' : 'partial'
  await run(req.db, 'UPDATE fee_invoices SET paid = :paid, status = :status, method = :method WHERE id = :id',
    { paid: newPaid, status, method: method || 'UPI', id: req.params.id })
  ok(res, { id: Number(req.params.id), paid: newPaid, status })
}))

export default router
