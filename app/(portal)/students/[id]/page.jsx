'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, Badge, Bar, inr } from '@/components/ui'
import { findStudent, reportCard, invoices } from '@/lib/mockData'

export default function StudentDetail({ params }) {
  const s = findStudent(params.id)
  if (!s) return notFound()

  const invoice = invoices.find((i) => i.studentId === s.id)

  return (
    <div className="page">
      <div className="page-head">
        <Link href="/students" className="muted" style={{ fontSize: 13 }}>← Back to students</Link>
        <div className="between" style={{ marginTop: 8 }}>
          <div className="row" style={{ gap: 14 }}>
            <span className="avatar" style={{ width: 52, height: 52, fontSize: 18 }}>
              {s.name.split(' ').map(w => w[0]).join('')}
            </span>
            <div>
              <h2>{s.name}</h2>
              <p className="muted">{s.id} · Class {s.grade}-{s.section} · Roll {s.roll} · {s.house} House</p>
            </div>
          </div>
          <Badge>{s.status}</Badge>
        </div>
      </div>

      <div className="grid cols-3" style={{ marginBottom: 16 }}>
        <Card title="Attendance"><Big value={`${s.attendancePct}%`} tone="green" /><Bar pct={s.attendancePct} color="var(--green)" /></Card>
        <Card title="Overall grade"><Big value={s.avgGrade} tone="accent" /><span className="muted">CGPA {reportCard.scholastic.cgpa} · Rank {reportCard.scholastic.rank}</span></Card>
        <Card title="Fees (Term 1)"><Big value={s.feeStatus} tone={s.feeStatus === 'Paid' ? 'green' : 'amber'} />{invoice && <span className="muted">{inr(invoice.amount)} · due {invoice.dueDate}</span>}</Card>
      </div>

      <div className="grid cols-2">
        <Card title="Profile">
          <dl className="profile">
            <Field k="Gender" v={s.gender} />
            <Field k="Date of birth" v={s.dob} />
            <Field k="Blood group" v={s.bloodGroup} />
            <Field k="Admission date" v={s.admissionDate} />
            <Field k="Email" v={s.email} />
            <Field k="Address" v={s.address} />
          </dl>
        </Card>
        <Card title="Guardian & contact">
          <dl className="profile">
            <Field k="Primary guardian" v={s.guardian} />
            <Field k="Phone" v={s.guardianPhone} />
            <Field k="Consent (DPDP)" v={<Badge tone="green">Verified via OTP</Badge>} />
            <Field k="Communication" v="WhatsApp · SMS · Email" />
          </dl>
        </Card>
      </div>

      <div style={{ marginTop: 16 }}>
        <Card title="Academic performance — Term 1">
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Subject</th><th className="num">Marks</th><th>Grade</th><th style={{ width: '40%' }}></th></tr></thead>
              <tbody>
                {reportCard.subjects.map((r) => (
                  <tr key={r.subject}>
                    <td>{r.subject}</td>
                    <td className="num mono">{r.marks}/{r.max}</td>
                    <td><Badge tone="gray">{r.grade}</Badge></td>
                    <td><Bar pct={r.marks} color="var(--accent)" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

function Big({ value, tone }) {
  const fg = { green: 'var(--green)', accent: 'var(--accent)', amber: 'var(--amber)' }[tone]
  return <div style={{ fontSize: 30, fontWeight: 780, color: fg, marginBottom: 8 }}>{value}</div>
}

function Field({ k, v }) {
  return (
    <div className="between" style={{ padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
      <span className="muted">{k}</span>
      <span style={{ fontWeight: 550, textAlign: 'right' }}>{v}</span>
    </div>
  )
}
