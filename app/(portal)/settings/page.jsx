'use client'

import { useState } from 'react'
import { PageHeader, Card, Badge, Button, Table, Tabs, Avatar, Icon, Glyph } from '@/components/ui'
import { schoolConfig, rolePermissions, staffUsers, integrations } from '@/lib/mockData'

export default function SettingsPage() {
  const [tab, setTab] = useState('general')
  return (
    <div className="page">
      <PageHeader title="Settings" subtitle="School configuration, roles & access, users and integrations." />

      <Tabs value={tab} onChange={setTab} tabs={[
        { value: 'general', label: 'General' },
        { value: 'rbac', label: 'Roles & Access' },
        { value: 'users', label: 'Users' },
        { value: 'integrations', label: 'Integrations' },
      ]} />

      {tab === 'general' && <General />}
      {tab === 'rbac' && <Rbac />}
      {tab === 'users' && <Users />}
      {tab === 'integrations' && <Integrations />}
    </div>
  )
}

function General() {
  const c = schoolConfig
  const rows = [
    ['School name', c.name], ['Board', c.board], ['Academic year', c.academicYear],
    ['Address', c.address], ['Phone', c.phone], ['Email', c.email],
    ['Grading scale', c.gradingScale], ['Currency', c.currency],
    ['Terms', c.terms.join(' · ')], ['Data residency', c.dataResidency],
  ]
  return (
    <div className="grid cols-2">
      <Card title="School profile" action={<Button size="sm" icon="edit">Edit</Button>}>
        <dl className="stack" style={{ gap: 0 }}>
          {rows.map(([k, v]) => (
            <div key={k} className="between" style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <span className="muted">{k}</span>
              <span style={{ fontWeight: 550, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
            </div>
          ))}
        </dl>
      </Card>
      <Card title="Compliance — DPDP Act 2023">
        <div className="stack">
          {[
            ['Data Fiduciary registered', 'green'],
            ['Verifiable parental consent (OTP)', 'green'],
            ['Data localization — India region', 'green'],
            ['Audit logging enabled', 'green'],
            ['No child profiling / targeted ads', 'green'],
            ['Breach-reporting workflow', 'green'],
          ].map(([label, tone]) => (
            <div key={label} className="between">
              <span className="row"><Glyph name="badge" size={18} color="var(--green)" />{label}</span>
              <Badge tone={tone}>Enabled</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

function Rbac() {
  return (
    <Card bodyClass="tight" title="Role-based access control (RBAC)" subtitle="Least-privilege by default · enforced at service + data layers">
      <Table
        rowKey="module"
        columns={[
          { key: 'module', label: 'Module', render: (r) => <b>{r.module}</b> },
          { key: 'admin', label: 'Administrator', render: (r) => <Badge tone="gray">{r.admin}</Badge> },
          { key: 'teacher', label: 'Teacher', render: (r) => <Badge tone="gray">{r.teacher}</Badge> },
          { key: 'student', label: 'Student', render: (r) => <Badge tone="gray">{r.student}</Badge> },
          { key: 'parent', label: 'Parent', render: (r) => <Badge tone="gray">{r.parent}</Badge> },
        ]}
        rows={rolePermissions}
      />
    </Card>
  )
}

function Users() {
  return (
    <Card bodyClass="tight" title="Staff users" action={<Button size="sm" variant="primary" icon="add">Invite user</Button>}>
      <Table
        rowKey="id"
        columns={[
          { key: 'name', label: 'User', render: (r) => (<span className="row"><Avatar name={r.name} size="sm" /><div><b>{r.name}</b><div className="faint" style={{ fontSize: 12 }}>{r.email}</div></div></span>) },
          { key: 'role', label: 'Role', render: (r) => <Badge tone="blue">{r.role}</Badge> },
          { key: 'mfa', label: 'MFA', render: (r) => <Badge tone={r.mfa ? 'green' : 'amber'}>{r.mfa ? 'On' : 'Off'}</Badge> },
          { key: 'lastActive', label: 'Last active', render: (r) => <span className="muted">{r.lastActive}</span> },
          { key: 'act', label: '', align: 'right', render: () => <Button size="sm">Manage</Button> },
        ]}
        rows={staffUsers}
      />
    </Card>
  )
}

function Integrations() {
  return (
    <div className="grid cols-2">
      {integrations.map((i) => (
        <Card key={i.name}>
          <div className="between">
            <div className="row">
              <Icon name={i.tone === 'green' ? 'badge' : 'settings'} tone={i.tone === 'green' ? 'green' : 'amber'} size="md" />
              <div>
                <b>{i.name}</b>
                <div className="muted" style={{ fontSize: 12.5 }}>{i.purpose}</div>
              </div>
            </div>
            <Badge tone={i.tone}>{i.status}</Badge>
          </div>
        </Card>
      ))}
    </div>
  )
}
