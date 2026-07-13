'use client'

import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Button, Table, Bar, Icon, inr, RowActions } from '@/components/ui'
import { branches, branchFinance } from '@/lib/mockData'

export default function BranchesPage() {
  const { role } = useApp()
  const totalStudents = branches.reduce((a, b) => a + b.students, 0)
  const totalStaff = branches.reduce((a, b) => a + b.staff, 0)
  const finById = Object.fromEntries(branchFinance.map((f) => [f.branchId, f]))

  return (
    <div className="page">
      <PageHeader
        title="Branches"
        subtitle="Every campus of the school — students, staff and fee collection per branch."
        actions={role !== 'finance' ? <Button variant="primary" icon="add">Add branch</Button> : null}
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Branches" value={branches.length} icon="building" tone="accent" />
        <Kpi label="Total students" value={totalStudents.toLocaleString('en-IN')} icon="people" tone="blue" />
        <Kpi label="Total staff" value={totalStaff} icon="hr" tone="teal" />
        <Kpi label="Avg collection" value={`${Math.round(branches.reduce((a, b) => a + b.collectedPct, 0) / branches.length)}%`} icon="wallet" tone="amber" />
      </div>

      <div className="grid cols-3" style={{ marginBottom: 16 }}>
        {branches.map((b) => {
          const f = finById[b.id]
          return (
            <Card key={b.id}>
              <div className="row" style={{ gap: 12, marginBottom: 12 }}>
                <Icon name="building" tone="accent" size="md" />
                <div>
                  <b>{b.name}</b>
                  <div className="faint" style={{ fontSize: 12 }}>{b.city} · Head: {b.head}</div>
                </div>
              </div>
              <div className="between" style={{ fontSize: 13, marginBottom: 4 }}><span className="muted">Students</span><b>{b.students}</b></div>
              <div className="between" style={{ fontSize: 13, marginBottom: 8 }}><span className="muted">Staff</span><b>{b.staff}</b></div>
              <div className="between" style={{ marginBottom: 5 }}><span className="muted" style={{ fontSize: 12.5 }}>Fee collection</span><b className="mono" style={{ fontSize: 12.5 }}>{b.collectedPct}%</b></div>
              <Bar pct={b.collectedPct} color={b.collectedPct >= 50 ? 'var(--green)' : 'var(--amber)'} />
              {f && <div className="faint" style={{ fontSize: 11.5, marginTop: 8 }}>Overdue {inr(f.overdue)} · {f.defaulters} defaulters</div>}
            </Card>
          )
        })}
      </div>

      <Card bodyClass="tight" title="Branch-wise financials">
        <Table
          rowKey="branchId"
          columns={[
            { key: 'branch', label: 'Branch', render: (r) => <b>{r.branch}</b> },
            { key: 'billed', label: 'Billed', align: 'right', render: (r) => <span className="mono">{inr(r.billed)}</span> },
            { key: 'collected', label: 'Collected', align: 'right', render: (r) => <span className="mono">{inr(r.collected)}</span> },
            { key: 'pending', label: 'Pending', align: 'right', render: (r) => <span className="mono">{inr(r.pending)}</span> },
            { key: 'overdue', label: 'Overdue', align: 'right', render: (r) => <span className="mono" style={{ color: 'var(--red)' }}>{inr(r.overdue)}</span> },
            { key: 'defaulters', label: 'Defaulters', align: 'right', render: (r) => <Badge tone="amber">{r.defaulters}</Badge> },
            { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={r.branch} /> },
          ]}
          rows={branchFinance}
        />
      </Card>
    </div>
  )
}
