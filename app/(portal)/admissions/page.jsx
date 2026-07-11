'use client'

import { Card, Badge } from '@/components/ui'
import { admissions, admissionStages } from '@/lib/mockData'

export default function AdmissionsPage() {
  const byStage = admissionStages.map((stage) => ({
    stage,
    apps: admissions.filter((a) => a.stage === stage),
  }))

  return (
    <div className="page">
      <div className="page-head between">
        <div>
          <h2>Admissions & Enrollment</h2>
          <p className="muted">Applicant funnel for {new Date().getFullYear()}–{(new Date().getFullYear() + 1) % 100} · {admissions.length} applications</p>
        </div>
        <button className="btn primary">+ New application</button>
      </div>

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        {byStage.slice(0, 4).map((s) => (
          <Card key={s.stage} className="kpi">
            <div className="k-label">{s.stage}</div>
            <div className="k-value">{s.apps.length}</div>
          </Card>
        ))}
      </div>

      <div className="funnel">
        {byStage.map((col) => (
          <div className="funnel-col" key={col.stage}>
            <div className="funnel-head">
              <span>{col.stage}</span>
              <span className="pill">{col.apps.length}</span>
            </div>
            <div className="funnel-body">
              {col.apps.map((a) => (
                <div className="app-card" key={a.id}>
                  <div className="between">
                    <b>{a.name}</b>
                    <Badge tone={a.fee === 'Paid' ? 'green' : 'amber'}>{a.fee}</Badge>
                  </div>
                  <div className="muted" style={{ fontSize: 12.5, marginTop: 4 }}>
                    Grade {a.gradeApplied} · {a.source}
                  </div>
                  <div className="faint" style={{ fontSize: 11.5, marginTop: 6 }}>{a.id} · {a.appliedOn}</div>
                </div>
              ))}
              {col.apps.length === 0 && <div className="faint" style={{ fontSize: 12, padding: 8 }}>—</div>}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .funnel { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; }
        .funnel-col {
          min-width: 210px; flex: 1; background: var(--surface-2);
          border: 1px solid var(--border); border-radius: var(--radius);
        }
        .funnel-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px; font-weight: 650; font-size: 13px;
          border-bottom: 1px solid var(--border);
        }
        .funnel-body { padding: 10px; display: flex; flex-direction: column; gap: 10px; min-height: 60px; }
        .app-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 10px; padding: 12px; box-shadow: var(--shadow);
        }
      `}</style>
    </div>
  )
}
