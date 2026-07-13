'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, Badge, RowActions } from '@/components/ui'
import { students } from '@/lib/mockData'

export default function StudentsPage() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [grade, setGrade] = useState('All')

  const grades = ['All', ...Array.from(new Set(students.map((s) => s.grade)))]
  const rows = useMemo(() => {
    return students.filter((s) => {
      const matchQ =
        s.name.toLowerCase().includes(q.toLowerCase()) ||
        s.id.toLowerCase().includes(q.toLowerCase()) ||
        s.guardian.toLowerCase().includes(q.toLowerCase())
      const matchG = grade === 'All' || s.grade === grade
      return matchQ && matchG
    })
  }, [q, grade])

  return (
    <div className="page">
      <div className="page-head between">
        <div>
          <h2>Students (SIS)</h2>
          <p className="muted">Central student records — {students.length} enrolled · single source of truth.</p>
        </div>
        <div className="row">
          <button className="btn">Import CSV</button>
          <button className="btn primary">+ Add student</button>
        </div>
      </div>

      <Card bodyClass="tight"
        title={`${rows.length} student${rows.length === 1 ? '' : 's'}`}
        action={
          <div className="row">
            <select className="btn" value={grade} onChange={(e) => setGrade(e.target.value)}
              style={{ paddingRight: 26 }}>
              {grades.map((g) => <option key={g}>{g}</option>)}
            </select>
            <input placeholder="Search name, ID, guardian…" value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 9, fontSize: 13, minWidth: 220 }} />
          </div>
        }>
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Student</th><th>ID</th><th>Class</th><th>Guardian</th>
                <th className="num">Attendance</th><th>Avg</th><th>Fees</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className="row">
                      <span className="avatar-sm">{s.name.split(' ').map(w => w[0]).join('')}</span>
                      <b>{s.name}</b>
                    </span>
                  </td>
                  <td className="mono muted">{s.id}</td>
                  <td>{s.grade}-{s.section} · R{s.roll}</td>
                  <td>{s.guardian}<div className="faint" style={{ fontSize: 12 }}>{s.guardianPhone}</div></td>
                  <td className="num mono">{s.attendancePct}%</td>
                  <td><Badge tone="gray">{s.avgGrade}</Badge></td>
                  <td><Badge>{s.feeStatus}</Badge></td>
                  <td><Badge>{s.status}</Badge></td>
                  <td className="right"><RowActions label={s.name} onView={() => router.push(`/students/${s.id}`)} /></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={9} className="muted" style={{ padding: 32, textAlign: 'center' }}>No students match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
