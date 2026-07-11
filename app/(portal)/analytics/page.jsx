'use client'

import { PageHeader, Card, Badge, Kpi, Icon, Bar, BarChart, LineChart } from '@/components/ui'
import { analyticsKpis, performanceTrend, atRiskStudents, aiInsights, subjectMastery } from '@/lib/mockData'

export default function AnalyticsPage() {
  return (
    <div className="page">
      <PageHeader
        title="Analytics & AI"
        subtitle="Operational insight and AI-assisted early intervention — privacy-first, no profiling (DPDP)."
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Avg attendance" value={`${analyticsKpis.avgAttendance}%`} icon="badge" tone="green" trend={2} sub="vs last term" />
        <Kpi label="Avg score" value={`${analyticsKpis.avgScore}%`} icon="chart" tone="accent" trend={4} sub="vs last term" />
        <Kpi label="Pass rate" value={`${analyticsKpis.passRate}%`} icon="award" tone="blue" />
        <Kpi label="At-risk students" value={analyticsKpis.atRisk} icon="alert" tone="amber" sub="flagged for support" />
      </div>

      <div className="grid cols-2">
        <Card title="Performance trend — school average">
          <LineChart points={performanceTrend} color="var(--accent)" />
        </Card>
        <Card title="Subject mastery (avg %)">
          <BarChart data={subjectMastery} valueKey="count" labelKey="band" format={(v) => `${v}`} />
        </Card>
      </div>

      <Card title="AI insights" subtitle="Suggestions surfaced from attendance & assessment data" className="ai-card">
        <div className="grid cols-3">
          {aiInsights.map((ins) => (
            <div key={ins.title} className="insight">
              <Icon name={ins.icon} tone={ins.tone} size="md" />
              <b>{ins.title}</b>
              <span className="muted" style={{ fontSize: 12.5 }}>{ins.body}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card bodyClass="tight" title="At-risk students — early intervention"
        action={<Badge tone="blue">AI-assisted</Badge>} style={{ marginTop: 16 }}>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Student</th><th>Class</th><th className="num">Attendance</th><th className="num">Avg</th><th>Pass likelihood</th><th>Risk</th><th>Signal</th></tr></thead>
            <tbody>
              {atRiskStudents.map((s) => (
                <tr key={s.name}>
                  <td><b>{s.name}</b></td>
                  <td>{s.class}</td>
                  <td className="num mono">{s.attendance}%</td>
                  <td className="num mono">{s.avg}%</td>
                  <td>
                    <div style={{ minWidth: 110 }}>
                      <div className="mono" style={{ fontSize: 12, marginBottom: 4 }}>{s.likelihood}%</div>
                      <Bar pct={s.likelihood} color={s.likelihood < 70 ? 'var(--red)' : 'var(--amber)'} />
                    </div>
                  </td>
                  <td><Badge tone={s.risk === 'High' ? 'red' : 'amber'}>{s.risk}</Badge></td>
                  <td className="muted" style={{ fontSize: 12.5 }}>{s.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <style jsx>{`
        .insight { display: flex; flex-direction: column; gap: 6px; padding: 14px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 12px; }
      `}</style>
    </div>
  )
}
