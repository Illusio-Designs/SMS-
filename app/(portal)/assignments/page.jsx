'use client'

import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Button, Table, Bar, RowActions } from '@/components/ui'
import { assignments, myAssignments } from '@/lib/mockData'

export default function AssignmentsPage() {
  const { role } = useApp()
  const teacherView = role === 'teacher' || role === 'admin'
  return (
    <div className="page">
      <PageHeader
        title="Assignments (LMS)"
        subtitle={teacherView ? 'Post assignments and track submissions · synced with Google Classroom.' : "Your assignments, due dates and grades."}
        actions={teacherView ? <Button variant="primary" icon="add">New assignment</Button> : null}
      />
      {teacherView ? <TeacherAssignments /> : <StudentAssignments />}
    </div>
  )
}

function TeacherAssignments() {
  const totalSub = assignments.reduce((a, x) => a + x.submitted, 0)
  const totalExp = assignments.reduce((a, x) => a + x.total, 0)
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Active assignments" value={assignments.length} icon="assignments" tone="accent" />
        <Kpi label="Submissions" value={`${totalSub}/${totalExp}`} icon="task" tone="blue" />
        <Kpi label="Due this week" value="3" icon="clock" tone="amber" />
        <Kpi label="Avg turnaround" value="2.1d" icon="badge" tone="green" />
      </div>

      <Card title="Assignments — VIII-A" bodyClass="tight">
        <Table
          rowKey="id"
          columns={[
            { key: 'title', label: 'Assignment', render: (r) => (<div><b>{r.title}</b><div className="faint" style={{ fontSize: 12 }}>{r.subject} · {r.points} pts · {r.source}</div></div>) },
            { key: 'due', label: 'Due', render: (r) => r.due },
            { key: 'prog', label: 'Submissions', width: '22%', render: (r) => (
              <div style={{ minWidth: 120 }}>
                <div className="between" style={{ marginBottom: 4 }}><span className="mono" style={{ fontSize: 12 }}>{r.submitted}/{r.total}</span></div>
                <Bar pct={(r.submitted / r.total) * 100} color="var(--accent)" />
              </div>
            ) },
            { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={r.title} /> },
          ]}
          rows={assignments}
        />
      </Card>
    </div>
  )
}

function StudentAssignments() {
  const pending = myAssignments.filter((a) => a.status === 'Pending').length
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Pending" value={pending} icon="assignments" tone="amber" />
        <Kpi label="Submitted" value={myAssignments.filter(a => a.status !== 'Pending').length} icon="task" tone="green" />
        <Kpi label="Avg score" value="92%" icon="award" tone="accent" />
        <Kpi label="Next due" value="14 Jul" icon="clock" tone="blue" />
      </div>

      <Card title="My assignments" bodyClass="tight">
        <Table
          rowKey="id"
          columns={[
            { key: 'title', label: 'Assignment', render: (r) => (<div><b>{r.title}</b><div className="faint" style={{ fontSize: 12 }}>{r.subject}</div></div>) },
            { key: 'due', label: 'Due date' },
            { key: 'grade', label: 'Grade', render: (r) => <span className="mono">{r.grade}</span> },
            { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            { key: 'submit', label: '', align: 'right', render: (r) => r.status === 'Pending' ? <Button size="sm" variant="primary">Submit</Button> : null },
            { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={r.title} /> },
          ]}
          rows={myAssignments}
        />
      </Card>
    </div>
  )
}
