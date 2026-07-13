'use client'

import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Button, Avatar, Glyph, Icon } from '@/components/ui'
import { ROLE_LABELS } from '@/lib/nav'
import { findStudent } from '@/lib/mockData'

export default function AccountPage() {
  const { role, currentUser } = useApp()
  const student = role === 'student' ? findStudent(currentUser.studentId) : null

  const details = [
    ['Full name', currentUser.name],
    ['Role', ROLE_LABELS[role]],
    ['Email', currentUser.email],
    ...(student ? [
      ['Student ID', student.id],
      ['Class', `${student.grade}-${student.section} · Roll ${student.roll}`],
      ['House', student.house],
      ['Blood group', student.bloodGroup],
      ['Guardian', student.guardian],
    ] : []),
    ...(role === 'parent' ? [['Children', 'Aarav Mehta · Diya Mehta']] : []),
  ]

  return (
    <div className="page">
      <PageHeader title="My Account" subtitle="Your profile, preferences and security." />

      <Card className="acct-hero" style={{ marginBottom: 16 }}>
        <div className="row" style={{ gap: 16 }}>
          <Avatar name={currentUser.name} size="lg" />
          <div>
            <h2 style={{ fontSize: 20 }}>{currentUser.name}</h2>
            <p className="muted">{currentUser.title}</p>
          </div>
          <div className="topbar__spacer" />
          <Button icon="edit">Edit profile</Button>
        </div>
      </Card>

      <div className="grid cols-2">
        <Card title="Profile details">
          <dl className="stack" style={{ gap: 0 }}>
            {details.map(([k, v]) => (
              <div key={k} className="between" style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <span className="muted">{k}</span>
                <span style={{ fontWeight: 550, textAlign: 'right' }}>{v}</span>
              </div>
            ))}
          </dl>
        </Card>

        <div className="stack">
          <Card title="Security">
            <div className="stack">
              <Row icon="shield" label="Two-factor authentication" value={<Badge tone={role === 'admin' || role === 'teacher' ? 'green' : 'amber'}>{role === 'admin' || role === 'teacher' ? 'Enabled' : 'Not set'}</Badge>} />
              <Row icon="badge" label="Google sign-in" value={<Badge tone="green">Linked</Badge>} />
              <Row icon="userCheck" label="Password" value={<Button size="sm">Change</Button>} />
            </div>
          </Card>
          <Card title="Preferences">
            <div className="stack">
              <Row icon="whatsapp" label="WhatsApp notifications" value={<Badge tone="green">On</Badge>} />
              <Row icon="mail" label="Email notifications" value={<Badge tone="green">On</Badge>} />
              <Row icon="sms" label="SMS alerts" value={<Badge tone="gray">Off</Badge>} />
            </div>
          </Card>
        </div>
      </div>

      <style jsx>{`
        .acct-hero :global(h2) { line-height: 1.1; }
      `}</style>
    </div>
  )
}

function Row({ icon, label, value }) {
  return (
    <div className="between">
      <span className="row" style={{ gap: 10 }}><Glyph name={icon} size={17} color="var(--text-soft)" /> {label}</span>
      {value}
    </div>
  )
}
