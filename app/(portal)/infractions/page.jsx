'use client'

import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Button, Table, RowActions } from '@/components/ui'
import { infractions, infractionSummary } from '@/lib/mockData'

export default function InfractionsPage() {
  const { role } = useApp()
  const staff = role === 'admin' || role === 'teacher'
  // Student/parent see only Aarav's records.
  const rows = staff ? infractions : infractions.filter((i) => i.student === 'Aarav Mehta')

  return (
    <div className="page">
      <PageHeader
        title="Infractions"
        subtitle={staff ? 'Disciplinary records — logged fairly, no profiling (DPDP-safe).' : "Your discipline record and conduct notes."}
        actions={staff ? <Button variant="primary" icon="add">Record infraction</Button> : null}
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label={staff ? 'Total this term' : 'My infractions'} value={rows.length} icon="infraction" tone="amber" />
        <Kpi label="Demerit points" value={rows.reduce((a, r) => a + r.points, 0)} icon="alert" tone="red" />
        <Kpi label="This month" value={infractionSummary.thisMonth} icon="calendar" tone="blue" />
        <Kpi label="Merit / positive notes" value={infractionSummary.positive} icon="award" tone="green" />
      </div>

      <Card bodyClass="tight" title="Records">
        <Table
          rowKey="id"
          columns={[
            ...(staff ? [{ key: 'student', label: 'Student', render: (r) => (<div><b>{r.student}</b><div className="faint" style={{ fontSize: 12 }}>{r.class}</div></div>) }] : []),
            { key: 'type', label: 'Type', render: (r) => <b>{r.type}</b> },
            { key: 'note', label: 'Note', render: (r) => <span className="muted" style={{ fontSize: 12.5 }}>{r.note}</span> },
            { key: 'date', label: 'Date' },
            { key: 'points', label: 'Points', align: 'right', render: (r) => <span className="mono">{r.points}</span> },
            { key: 'by', label: 'Logged by', render: (r) => <span className="muted">{r.by}</span> },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={r.status === 'Resolved' ? 'green' : 'amber'}>{r.status}</Badge> },
            { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={`${r.type} record`} /> },
          ]}
          rows={rows}
          empty="No infractions recorded — clean record."
        />
      </Card>
    </div>
  )
}
