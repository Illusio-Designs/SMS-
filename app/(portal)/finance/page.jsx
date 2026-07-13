'use client'

import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Button, Table, Bar, BarChart, inr, RowActions } from '@/components/ui'
import { financeKpis, branchFinance, transactions, branches } from '@/lib/mockData'

const TXN_TONE = { Success: 'green', Pending: 'amber', Refunded: 'red' }

export default function FinancePage() {
  const { branchId } = useApp()
  const branch = branches.find((b) => b.id === branchId)
  const scope = branch ? branch.name : 'All branches'

  // Branch-filter the figures.
  const rows = branchId === 'all' ? branchFinance : branchFinance.filter((f) => f.branchId === branchId)
  const txns = branchId === 'all' ? transactions : transactions.filter((t) => t.branch === branch?.name)
  const sum = rows.reduce((a, r) => ({
    billed: a.billed + r.billed, collected: a.collected + r.collected,
    pending: a.pending + r.pending, overdue: a.overdue + r.overdue, defaulters: a.defaulters + r.defaulters,
  }), { billed: 0, collected: 0, pending: 0, overdue: 0, defaulters: 0 })
  const rate = Math.round((sum.collected / sum.billed) * 100) || 0

  return (
    <div className="page">
      <PageHeader
        title="Finance"
        subtitle={`Financial Manager · ${scope} · fee collections, dues and transactions.`}
        actions={<div className="row"><Button icon="download">Export</Button><Button variant="primary" icon="add">Record payment</Button></div>}
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Collected" value={inr(sum.collected)} sub={`${rate}% of billed`} icon="wallet" tone="green" />
        <Kpi label="Pending" value={inr(sum.pending)} icon="clock" tone="amber" />
        <Kpi label="Overdue" value={inr(sum.overdue)} sub={`${sum.defaulters} defaulters`} icon="alert" tone="red" />
        <Kpi label="Collection rate" value={`${rate}%`} icon="chart" tone="accent" />
      </div>

      <div className="grid cols-2">
        <Card title="Collection by branch">
          <BarChart
            data={branchFinance.map((f) => ({ band: f.branch.replace(' Branch', '').replace(' Campus', ''), count: Math.round((f.collected / f.billed) * 100) }))}
            valueKey="count" labelKey="band" format={(v) => `${v}%`}
          />
        </Card>
        <Card title="Dues summary">
          <div className="stack">
            {rows.map((r) => (
              <div key={r.branchId}>
                <div className="between" style={{ marginBottom: 5 }}>
                  <span>{r.branch}</span>
                  <span className="muted mono" style={{ fontSize: 12.5 }}>{inr(r.pending)} pending</span>
                </div>
                <Bar pct={Math.round((r.collected / r.billed) * 100)} color="var(--green)" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card bodyClass="tight" title="Recent transactions" style={{ marginTop: 16 }}
        action={<Button size="sm" icon="filter">Filter</Button>}>
        <Table
          rowKey="id"
          columns={[
            { key: 'id', label: 'Txn', render: (r) => <span className="mono muted">{r.id}</span> },
            { key: 'student', label: 'Student', render: (r) => (<div><b>{r.student}</b><div className="faint" style={{ fontSize: 12 }}>{r.branch} · {r.head}</div></div>) },
            { key: 'amount', label: 'Amount', align: 'right', render: (r) => <span className="mono">{inr(r.amount)}</span> },
            { key: 'method', label: 'Method', render: (r) => <span className="muted" style={{ fontSize: 12.5 }}>{r.method}</span> },
            { key: 'at', label: 'When', render: (r) => <span className="muted" style={{ fontSize: 12.5 }}>{r.at}</span> },
            { key: 'status', label: 'Status', render: (r) => <Badge tone={TXN_TONE[r.status]}>{r.status}</Badge> },
            { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={`txn ${r.id}`} /> },
          ]}
          rows={txns}
          empty="No transactions for this branch."
        />
      </Card>
    </div>
  )
}
