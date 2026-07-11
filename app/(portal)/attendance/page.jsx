'use client'

import { useState } from 'react'
import { useApp } from '@/components/AppContext'
import { Card, Badge, Kpi, Bar, Glyph } from '@/components/ui'
import { todayAttendance, leaveRequests, attendanceTrend, findStudent } from '@/lib/mockData'

export default function AttendancePage() {
  const { role } = useApp()
  return (
    <div className="page">
      <div className="page-head">
        <h2>Attendance</h2>
        <p className="muted">{subtitle(role)}</p>
      </div>
      {role === 'teacher' && <TeacherAttendance />}
      {role === 'admin' && <AdminAttendance />}
      {(role === 'student' || role === 'parent') && <StudentAttendance />}
    </div>
  )
}

function subtitle(role) {
  return {
    teacher: 'Mark daily roll-call for VIII-A and review leave requests.',
    admin: 'School-wide attendance reporting and leave approvals.',
    student: 'Your attendance record for the current term.',
    parent: "Your children's attendance record.",
  }[role]
}

/* -------- Teacher: interactive roll call -------- */
function TeacherAttendance() {
  const [marks, setMarks] = useState(() =>
    Object.fromEntries(todayAttendance.map((s) => [s.studentId, s.status]))
  )
  const [saved, setSaved] = useState(false)

  const set = (id, status) => { setMarks((m) => ({ ...m, [id]: status })); setSaved(false) }
  const present = Object.values(marks).filter((v) => v === 'Present').length
  const absent = Object.values(marks).filter((v) => v === 'Absent').length

  const markAll = (status) => {
    setMarks(Object.fromEntries(todayAttendance.map((s) => [s.studentId, status])))
    setSaved(false)
  }

  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Present" value={present} tone="green" icon="badge" />
        <Kpi label="Absent" value={absent} tone="red" icon="alert" />
        <Kpi label="Class strength" value={todayAttendance.length} tone="blue" icon="people" />
        <Kpi label="Attendance %" value={`${Math.round((present / todayAttendance.length) * 100)}%`} tone="accent" icon="chart" />
      </div>

      <Card
        title={`Roll call — VIII-A · ${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'short' })}`}
        action={
          <div className="row">
            <button className="btn sm" onClick={() => markAll('Present')}>All present</button>
            <button className="btn sm primary" onClick={() => setSaved(true)}>Save</button>
          </div>
        }
        bodyClass="tight">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Roll</th><th>Student</th><th className="right">Mark</th></tr></thead>
            <tbody>
              {todayAttendance.map((s) => (
                <tr key={s.studentId}>
                  <td className="mono">{s.roll}</td>
                  <td><span className="row"><span className="avatar-sm">{s.name.split(' ').map(w => w[0]).join('')}</span>{s.name}</span></td>
                  <td className="right">
                    <div className="row" style={{ justifyContent: 'flex-end' }}>
                      {['Present', 'Absent', 'Late'].map((opt) => (
                        <button key={opt}
                          className={`btn sm ${marks[s.studentId] === opt ? 'primary' : ''}`}
                          onClick={() => set(s.studentId, opt)}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {saved && (
        <div className="card row" style={{ padding: 14, borderColor: 'var(--green)', background: 'var(--green-soft)', gap: 10 }}>
          <Glyph name="check" size={20} color="var(--green)" />
          <span>
            <b style={{ color: 'var(--green)' }}>Attendance saved.</b>{' '}
            <span className="muted">Absence notifications queued to parents via WhatsApp/SMS (demo).</span>
          </span>
        </div>
      )}

      <LeaveRequests approvable />
    </div>
  )
}

/* -------- Admin: reporting -------- */
function AdminAttendance() {
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Present today" value="93%" sub="1,194 / 1,284" tone="green" icon="badge" />
        <Kpi label="On leave" value="41" sub="approved" tone="amber" icon="calendar" />
        <Kpi label="Absent" value="49" sub="unaccounted" tone="red" icon="alert" />
        <Kpi label="Weekly avg" value="94%" sub="school-wide" tone="accent" icon="chart" />
      </div>
      <div className="grid cols-2">
        <Card title="Attendance — last 7 school days">
          <div className="stack">
            {attendanceTrend.map((d, i) => (
              <div key={i}>
                <div className="between" style={{ marginBottom: 5 }}><span>{d.label}</span><b className="mono">{d.pct}%</b></div>
                <Bar pct={d.pct} color={d.pct >= 95 ? 'var(--green)' : d.pct >= 90 ? 'var(--accent)' : 'var(--amber)'} />
              </div>
            ))}
          </div>
        </Card>
        <Card title="Lowest attendance — flagged">
          <div className="stack">
            {['Ishaan Verma', 'Vivaan Joshi', 'Kabir Singh'].map((n, i) => {
              const pct = [76, 84, 88][i]
              return (
                <div key={n} className="between">
                  <span>{n}</span>
                  <span className="row" style={{ width: 160 }}><Bar pct={pct} color="var(--amber)" /><b className="mono">{pct}%</b></span>
                </div>
              )
            })}
            <p className="faint" style={{ fontSize: 12 }}>Students below 85% are flagged for follow-up (no profiling — DPDP-safe).</p>
          </div>
        </Card>
      </div>
      <LeaveRequests approvable />
    </div>
  )
}

/* -------- Student / Parent: history -------- */
function StudentAttendance() {
  const me = findStudent('STU-2401')
  const months = [
    { m: 'April', present: 21, total: 22 },
    { m: 'May', present: 18, total: 20 },
    { m: 'June', present: 23, total: 24 },
    { m: 'July', present: 8, total: 9 },
  ]
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Overall" value={`${me.attendancePct}%`} tone="green" icon="badge" />
        <Kpi label="Present days" value="70" tone="accent" icon="calendar" />
        <Kpi label="Absent days" value="4" tone="red" icon="alert" />
        <Kpi label="Leaves" value="1" tone="amber" icon="calendar" />
      </div>
      <Card title="Month-wise attendance">
        <div className="stack">
          {months.map((mo) => {
            const pct = Math.round((mo.present / mo.total) * 100)
            return (
              <div key={mo.m}>
                <div className="between" style={{ marginBottom: 5 }}>
                  <span>{mo.m}</span>
                  <span className="muted mono">{mo.present}/{mo.total} · {pct}%</span>
                </div>
                <Bar pct={pct} color="var(--green)" />
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

function LeaveRequests({ approvable }) {
  const [items, setItems] = useState(leaveRequests)
  const act = (id, status) => setItems((xs) => xs.map((x) => x.id === id ? { ...x, status } : x))
  return (
    <Card title="Leave requests">
      <div className="table-wrap">
        <table className="tbl">
          <thead><tr><th>Student</th><th>Class</th><th>Dates</th><th>Reason</th><th>Status</th>{approvable && <th className="right">Action</th>}</tr></thead>
          <tbody>
            {items.map((l) => (
              <tr key={l.id}>
                <td><b>{l.student}</b></td>
                <td>{l.grade}</td>
                <td className="mono">{l.from} → {l.to}</td>
                <td className="muted">{l.reason}</td>
                <td><Badge>{l.status}</Badge></td>
                {approvable && (
                  <td className="right">
                    {l.status === 'Pending' ? (
                      <div className="row" style={{ justifyContent: 'flex-end' }}>
                        <button className="btn sm primary" onClick={() => act(l.id, 'Approved')}>Approve</button>
                        <button className="btn sm" onClick={() => act(l.id, 'Rejected')}>Reject</button>
                      </div>
                    ) : <span className="faint">—</span>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
