'use client'

import { useState } from 'react'
import { PageHeader, Card, Badge, Kpi, Button, Table, Icon, RowActions, toast } from '@/components/ui'
import { tenantSchools, systemKpis } from '@/lib/mockData'

export default function SchoolsPage() {
  const [rows, setRows] = useState(tenantSchools)
  const toggle = (id) => setRows((xs) => xs.map((s) => s.id === id
    ? { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' } : s))

  return (
    <div className="page">
      <PageHeader
        title="Schools"
        subtitle="System Admin · every school (tenant) on Scholr — each with its own database."
        actions={<Button variant="primary" icon="add">Provision school</Button>}
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Schools" value={systemKpis.schools} sub={`${systemKpis.activeSchools} active`} icon="school" tone="accent" />
        <Kpi label="Branches" value={systemKpis.branches} icon="building" tone="blue" />
        <Kpi label="Total students" value={systemKpis.totalStudents.toLocaleString('en-IN')} icon="people" tone="teal" />
        <Kpi label="Uptime" value={`${systemKpis.uptime}%`} icon="badge" tone="green" />
      </div>

      <Card bodyClass="tight" title="Tenants">
        <Table
          rowKey="id"
          columns={[
            { key: 'name', label: 'School', render: (r) => (
              <span className="row" style={{ gap: 11 }}>
                <Icon name="school" tone="accent" size="sm" />
                <span><b>{r.name}</b><div className="faint" style={{ fontSize: 12 }}>{r.domain}</div></span>
              </span>
            ) },
            { key: 'db', label: 'Database', render: (r) => <span className="mono muted" style={{ fontSize: 12 }}>{r.db}</span> },
            { key: 'branches', label: 'Branches', align: 'right' },
            { key: 'students', label: 'Students', align: 'right', render: (r) => r.students.toLocaleString('en-IN') },
            { key: 'plan', label: 'Plan', render: (r) => <Badge tone="gray">{r.plan}</Badge> },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Active' ? 'green' : 'red'}>{r.status}</Badge> },
            { key: 'toggle', label: '', align: 'right', render: (r) => (
              <Button size="sm" variant={r.status === 'Active' ? 'default' : 'primary'}
                onClick={() => { toggle(r.id); toast(`${r.name} ${r.status === 'Active' ? 'suspended' : 'activated'}`, r.status === 'Active' ? 'amber' : 'green') }}>
                {r.status === 'Active' ? 'Suspend' : 'Activate'}
              </Button>
            ) },
            { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={r.name} /> },
          ]}
          rows={rows}
        />
      </Card>
    </div>
  )
}
