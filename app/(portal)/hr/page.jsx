'use client'

import { useState } from 'react'
import { PageHeader, Card, Badge, Kpi, Button, Table, Tabs, Avatar, inr, RowActions } from '@/components/ui'
import { hrSummary, staff, payrollRuns } from '@/lib/mockData'

export default function HrPage() {
  const [tab, setTab] = useState('staff')
  return (
    <div className="page">
      <PageHeader
        title="HR & Payroll"
        subtitle="Staff records, attendance and monthly payroll."
        actions={<Button variant="primary" icon="add">Add staff</Button>}
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Total staff" value={hrSummary.staff} icon="hr" tone="accent" />
        <Kpi label="Teaching" value={hrSummary.teaching} icon="teacher" tone="blue" />
        <Kpi label="Monthly payroll" value={inr(hrSummary.payrollMonthly)} icon="wallet" tone="teal" />
        <Kpi label="On leave" value={hrSummary.onLeave} icon="calendar" tone="amber" />
      </div>

      <Tabs value={tab} onChange={setTab}
        tabs={[{ value: 'staff', label: 'Staff directory' }, { value: 'payroll', label: 'Payroll' }]} />

      {tab === 'staff' ? (
        <Card bodyClass="tight" title="Staff directory">
          <Table
            rowKey="id"
            columns={[
              { key: 'name', label: 'Name', render: (r) => (<span className="row"><Avatar name={r.name} size="sm" /><b>{r.name}</b></span>) },
              { key: 'id', label: 'Emp ID', render: (r) => <span className="mono muted">{r.id}</span> },
              { key: 'role', label: 'Designation' },
              { key: 'dept', label: 'Department', render: (r) => <Badge tone="gray">{r.dept}</Badge> },
              { key: 'attendance', label: 'Attendance', align: 'right', render: (r) => <span className="mono">{r.attendance}%</span> },
              { key: 'salary', label: 'Salary', align: 'right', render: (r) => <span className="mono">{inr(r.salary)}</span> },
              { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
              { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={r.name} /> },
            ]}
            rows={staff}
          />
        </Card>
      ) : (
        <Card bodyClass="tight" title="Payroll runs">
          <Table
            rowKey="id"
            columns={[
              { key: 'month', label: 'Month', render: (r) => <b>{r.month}</b> },
              { key: 'id', label: 'Run', render: (r) => <span className="mono muted">{r.id}</span> },
              { key: 'staff', label: 'Staff', align: 'right' },
              { key: 'gross', label: 'Gross', align: 'right', render: (r) => <span className="mono">{inr(r.gross)}</span> },
              { key: 'deductions', label: 'Deductions', align: 'right', render: (r) => <span className="mono">{inr(r.deductions)}</span> },
              { key: 'net', label: 'Net payable', align: 'right', render: (r) => <span className="mono"><b>{inr(r.net)}</b></span> },
              { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
              { key: 'proc', label: '', align: 'right', render: (r) => r.status === 'Draft' ? <Button size="sm" variant="primary">Process</Button> : null },
              { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={`${r.month} payroll`} /> },
            ]}
            rows={payrollRuns}
          />
        </Card>
      )}
    </div>
  )
}
