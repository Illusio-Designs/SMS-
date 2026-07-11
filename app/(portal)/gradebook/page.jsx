'use client'

import { useApp } from '@/components/AppContext'
import { Card, Badge, Kpi, Bar } from '@/components/ui'
import { gradebook, subjects, exams, reportCard, gradeDistribution } from '@/lib/mockData'

export default function GradebookPage() {
  const { role } = useApp()
  return (
    <div className="page">
      <div className="page-head">
        <h2>Gradebook & Exams</h2>
        <p className="muted">CBSE pattern · Term 1 · scholastic + co-scholastic (CCE).</p>
      </div>
      {(role === 'teacher' || role === 'admin') ? <TeacherGradebook /> : <StudentReport />}
    </div>
  )
}

/* -------- Teacher / Admin gradebook -------- */
function TeacherGradebook() {
  const classAvg = Math.round(gradebook.reduce((a, g) => a + g.pct, 0) / gradebook.length)
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Class average" value={`${classAvg}%`} tone="accent" icon="chart" />
        <Kpi label="Highest" value={`${Math.max(...gradebook.map(g => g.pct))}%`} tone="green" icon="award" />
        <Kpi label="Pass rate" value="100%" tone="green" icon="badge" />
        <Kpi label="Subjects" value={subjects.length} tone="blue" icon="book" />
      </div>

      <Card title="Gradebook — VIII-A · Term 1"
        action={<div className="row"><button className="btn sm">Export marksheet</button><button className="btn sm primary">Publish to portal</button></div>}
        bodyClass="tight">
        <div className="table-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Roll</th><th>Student</th>
                {subjects.map((s) => <th key={s} className="num">{s.slice(0, 4)}</th>)}
                <th className="num">Total</th><th className="num">%</th><th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {gradebook.map((g) => (
                <tr key={g.studentId}>
                  <td className="mono">{g.roll}</td>
                  <td><b>{g.name}</b></td>
                  {subjects.map((s) => (
                    <td key={s} className="num mono" style={{ color: g.marks[s] < 50 ? 'var(--red)' : 'inherit' }}>{g.marks[s]}</td>
                  ))}
                  <td className="num mono">{g.total}</td>
                  <td className="num mono"><b>{g.pct}%</b></td>
                  <td><Badge tone="gray">{g.grade}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid cols-2">
        <Card title="Grade distribution">
          <div className="stack">
            {gradeDistribution.map((g) => (
              <div key={g.grade}>
                <div className="between" style={{ marginBottom: 5 }}><span>Grade {g.grade}</span><b className="mono">{g.count}</b></div>
                <Bar pct={(g.count / 3) * 100} color="var(--accent)" />
              </div>
            ))}
          </div>
        </Card>
        <ExamsCard />
      </div>
    </div>
  )
}

/* -------- Student / Parent report card -------- */
function StudentReport() {
  const r = reportCard
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Percentage" value={`${r.scholastic.percentage}%`} tone="accent" icon="chart" />
        <Kpi label="CGPA" value={r.scholastic.cgpa} tone="blue" icon="badge" />
        <Kpi label="Class rank" value={`#${r.scholastic.rank}`} tone="green" icon="award" />
        <Kpi label="Result" value={r.scholastic.result} tone="green" icon="badge" />
      </div>

      <Card title={`Report card — ${r.term}`}
        action={<button className="btn sm primary">Download PDF</button>}
        bodyClass="tight">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Subject</th><th className="num">Marks</th><th className="num">Max</th><th>Grade</th><th style={{ width: '35%' }}></th></tr></thead>
            <tbody>
              {r.subjects.map((s) => (
                <tr key={s.subject}>
                  <td>{s.subject}</td>
                  <td className="num mono">{s.marks}</td>
                  <td className="num mono muted">{s.max}</td>
                  <td><Badge tone="gray">{s.grade}</Badge></td>
                  <td><Bar pct={s.marks} color="var(--accent)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid cols-2">
        <Card title="Co-scholastic areas (CCE)">
          <div className="stack">
            {r.coScholastic.map((c) => (
              <div key={c.area} className="between">
                <span>{c.area}</span>
                <Badge tone="gray">{c.grade}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <ExamsCard />
      </div>
    </div>
  )
}

function ExamsCard() {
  return (
    <Card title="Exam schedule">
      <div className="stack">
        {exams.map((e) => (
          <div key={e.id} className="between">
            <div>
              <b>{e.name}</b>
              <div className="faint" style={{ fontSize: 12 }}>{e.term} · {e.date} · {e.classes}</div>
            </div>
            <Badge>{e.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}
