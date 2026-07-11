'use client'

import { useState } from 'react'
import { useApp } from '@/components/AppContext'
import { Card, Badge, Kpi, Bar, inr } from '@/components/ui'
import { invoices, feeStructure, feeSummary } from '@/lib/mockData'

export default function FeesPage() {
  const { role } = useApp()
  return (
    <div className="page">
      <div className="page-head">
        <h2>Fee Management</h2>
        <p className="muted">{role === 'parent' ? 'View and pay your children’s fees online — UPI, cards, net banking.' : 'Fee structure, invoices, collections and defaulters.'}</p>
      </div>
      {role === 'parent' ? <ParentFees /> : <AdminFees />}
    </div>
  )
}

/* -------- Admin -------- */
function AdminFees() {
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Collected (Term 1)" value={inr(feeSummary.collected)} sub={`${feeSummary.collectionRate}% of billed`} tone="green" icon="wallet" />
        <Kpi label="Pending" value={inr(feeSummary.pending)} tone="amber" icon="clock" />
        <Kpi label="Overdue" value={inr(feeSummary.overdue)} sub={`${feeSummary.defaulters} defaulters`} tone="red" icon="alert" />
        <Kpi label="Collection rate" value={`${feeSummary.collectionRate}%`} tone="accent" icon="chart" />
      </div>

      <Card title="Fee structure — Annual"
        action={<button className="btn sm">Edit structure</button>} bodyClass="tight">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Fee head</th><th className="num">Term 1</th><th className="num">Term 2</th><th className="num">Annual</th></tr></thead>
            <tbody>
              {feeStructure.map((f) => (
                <tr key={f.head}><td>{f.head}</td><td className="num mono">{inr(f.term1)}</td><td className="num mono">{inr(f.term2)}</td><td className="num mono"><b>{inr(f.annual)}</b></td></tr>
              ))}
              <tr style={{ background: 'var(--surface-2)' }}>
                <td><b>Total</b></td>
                <td className="num mono"><b>{inr(feeStructure.reduce((a, f) => a + f.term1, 0))}</b></td>
                <td className="num mono"><b>{inr(feeStructure.reduce((a, f) => a + f.term2, 0))}</b></td>
                <td className="num mono"><b>{inr(feeStructure.reduce((a, f) => a + f.annual, 0))}</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Invoices — Term 1"
        action={<div className="row"><button className="btn sm">Send reminders</button><button className="btn sm primary">Export</button></div>}
        bodyClass="tight">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Invoice</th><th>Student</th><th>Class</th><th className="num">Amount</th><th className="num">Paid</th><th className="num">Due</th><th>Method</th><th>Status</th></tr></thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id}>
                  <td className="mono muted">{i.id}</td>
                  <td><b>{i.student}</b></td>
                  <td>{i.grade}</td>
                  <td className="num mono">{inr(i.amount)}</td>
                  <td className="num mono">{inr(i.paid)}</td>
                  <td className="num mono" style={{ color: i.due ? 'var(--red)' : 'inherit' }}>{inr(i.due)}</td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{i.method}</td>
                  <td><Badge>{i.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

/* -------- Parent (with mock Razorpay pay flow) -------- */
function ParentFees() {
  const mine = invoices.filter((i) => ['STU-2401', 'STU-2402'].includes(i.studentId))
  const [rows, setRows] = useState(mine)
  const [paying, setPaying] = useState(null)

  const pay = (id) => {
    setRows((xs) => xs.map((x) => x.id === id ? { ...x, paid: x.amount, due: 0, status: 'Paid', method: 'UPI · Google Pay' } : x))
    setPaying(null)
  }

  const totalDue = rows.reduce((a, r) => a + r.due, 0)

  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Total due" value={inr(totalDue)} tone={totalDue ? 'amber' : 'green'} icon="wallet" />
        <Kpi label="Children" value={rows.length} tone="blue" icon="parent" />
        <Kpi label="Paid this year" value={inr(rows.reduce((a, r) => a + r.paid, 0))} tone="green" icon="badge" />
      </div>

      <div className="stack">
        {rows.map((i) => (
          <Card key={i.id} title={`${i.student} · ${i.grade}`}
            action={<Badge>{i.status}</Badge>}>
            <div className="between">
              <div>
                <div className="muted" style={{ fontSize: 12.5 }}>{i.id} · {i.term} · due {i.dueDate}</div>
                <div style={{ fontSize: 24, fontWeight: 750, marginTop: 6 }}>
                  {i.due ? inr(i.due) : inr(i.amount)}
                  {!i.due && <span className="muted" style={{ fontSize: 13, fontWeight: 500 }}> · paid via {i.method}</span>}
                </div>
              </div>
              {i.due > 0 ? (
                <button className="btn primary" onClick={() => setPaying(i)}>Pay now</button>
              ) : (
                <button className="btn">Download receipt</button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {paying && (
        <div className="modal-scrim" onClick={() => setPaying(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="between" style={{ marginBottom: 4 }}>
              <b style={{ fontSize: 16 }}>Razorpay Checkout</b>
              <span className="badge blue"><span className="dot" />Secure · demo</span>
            </div>
            <p className="muted" style={{ fontSize: 13 }}>{paying.student} · {paying.term}</p>
            <div style={{ fontSize: 30, fontWeight: 780, margin: '14px 0' }}>{inr(paying.due)}</div>
            <div className="pillrow" style={{ marginBottom: 14 }}>
              {['UPI', 'Cards', 'Net Banking', 'Wallet'].map((m) => <span key={m} className="pill">{m}</span>)}
            </div>
            <button className="btn primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => pay(paying.id)}>
              Pay {inr(paying.due)}
            </button>
            <button className="btn ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }} onClick={() => setPaying(null)}>Cancel</button>
            <p className="faint" style={{ fontSize: 11, textAlign: 'center', marginTop: 8 }}>Demo only — no real payment is processed.</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-scrim { position: fixed; inset: 0; background: rgba(15,18,40,0.5); display: grid; place-items: center; z-index: 60; padding: 20px; }
        .modal { width: 100%; max-width: 360px; background: var(--surface); border-radius: 16px; padding: 22px; box-shadow: var(--shadow-lg); }
      `}</style>
    </div>
  )
}
