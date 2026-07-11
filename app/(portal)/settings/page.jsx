'use client'

import { useRef, useState } from 'react'
import { PageHeader, Card, Badge, Button, Table, Tabs, Avatar, Icon, Glyph } from '@/components/ui'
import { useApp, DEFAULT_ACCENT } from '@/components/AppContext'
import { schoolConfig, rolePermissions, staffUsers, integrations } from '@/lib/mockData'

export default function SettingsPage() {
  const [tab, setTab] = useState('branding')
  return (
    <div className="page">
      <PageHeader title="Settings" subtitle="Branding, school configuration, roles & access, users and integrations." />

      <Tabs value={tab} onChange={setTab} tabs={[
        { value: 'branding', label: 'Branding & Theme' },
        { value: 'general', label: 'General' },
        { value: 'rbac', label: 'Roles & Access' },
        { value: 'users', label: 'Users' },
        { value: 'integrations', label: 'Integrations' },
      ]} />

      {tab === 'branding' && <Branding />}
      {tab === 'general' && <General />}
      {tab === 'rbac' && <Rbac />}
      {tab === 'users' && <Users />}
      {tab === 'integrations' && <Integrations />}
    </div>
  )
}

const SWATCHES = ['#4f46e5', '#0d9488', '#db2777', '#d97706', '#2563eb', '#7c3aed', '#dc2626', '#059669', '#0891b2', '#e11d48']

function Branding() {
  const { accent, setAccent, logo, setLogo, resetTheme } = useApp()
  const fileRef = useRef(null)
  const [error, setError] = useState('')

  const onFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { setError('Please choose an image file.'); return }
    if (file.size > 1024 * 1024) { setError('Image must be under 1 MB.'); return }
    setError('')
    const reader = new FileReader()
    reader.onload = () => setLogo(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid cols-2">
      <Card title="School logo" subtitle="Shown in the sidebar and on the sign-in screen.">
        <div className="row" style={{ gap: 16, alignItems: 'center' }}>
          <div className="logo-preview">
            {logo ? <img src={logo} alt="Logo preview" /> : <Glyph name="school" size={30} color="#fff" strokeWidth={2} />}
          </div>
          <div className="stack" style={{ gap: 8 }}>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
            <Button variant="primary" icon="upload" onClick={() => fileRef.current?.click()}>Upload logo</Button>
            {logo && <Button size="sm" icon="cross" onClick={() => setLogo(null)}>Remove</Button>}
          </div>
        </div>
        {error && <p style={{ color: 'var(--red)', fontSize: 12.5, marginTop: 10 }}>{error}</p>}
        <p className="faint" style={{ fontSize: 11.5, marginTop: 12 }}>PNG, JPG or SVG · square works best · max 1 MB.</p>
      </Card>

      <Card title="Accent colour" subtitle="Applies across the whole app instantly.">
        <div className="swatches">
          {SWATCHES.map((c) => (
            <button key={c} className={`swatch ${accent.toLowerCase() === c ? 'on' : ''}`}
              style={{ background: c }} onClick={() => setAccent(c)} aria-label={c}>
              {accent.toLowerCase() === c && <Glyph name="check" size={16} color="#fff" />}
            </button>
          ))}
        </div>
        <div className="row" style={{ marginTop: 16, gap: 12 }}>
          <label className="row" style={{ gap: 8, fontSize: 13, fontWeight: 600 }}>
            <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="color-input" />
            Custom
          </label>
          <span className="mono muted" style={{ fontSize: 13 }}>{accent.toUpperCase()}</span>
          <div className="topbar__spacer" />
          <Button size="sm" onClick={resetTheme}>Reset to default</Button>
        </div>

        <div className="theme-preview">
          <div className="tp-row">
            <Icon name="dashboard" tone="accent" size="md" />
            <div style={{ flex: 1 }}>
              <b style={{ fontSize: 13 }}>Live preview</b>
              <div className="faint" style={{ fontSize: 11.5 }}>Buttons, icons and highlights use this colour.</div>
            </div>
            <button className="btn primary sm">Primary</button>
          </div>
        </div>
      </Card>

      <style jsx>{`
        .logo-preview { width: 66px; height: 66px; border-radius: 14px; overflow: hidden; flex: 0 0 auto;
          display: grid; place-items: center; background: linear-gradient(135deg, var(--accent), #7c74f0); }
        .logo-preview :global(img) { width: 100%; height: 100%; object-fit: cover; }
        .swatches { display: flex; flex-wrap: wrap; gap: 10px; }
        .swatch { width: 38px; height: 38px; border-radius: 10px; border: 2px solid var(--surface);
          box-shadow: 0 0 0 1px var(--border); display: grid; place-items: center; }
        .swatch.on { box-shadow: 0 0 0 2px var(--accent); }
        .color-input { width: 34px; height: 34px; border: 1px solid var(--border); border-radius: 8px; background: none; cursor: pointer; padding: 2px; }
        .theme-preview { margin-top: 16px; padding: 14px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface-2); }
        .tp-row { display: flex; align-items: center; gap: 12px; }
      `}</style>
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
