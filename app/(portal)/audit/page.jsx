'use client'

import { useState } from 'react'
import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Avatar, SearchInput, Pill, Glyph } from '@/components/ui'
import { auditLogs } from '@/lib/mockData'
import { ROLE_LABELS } from '@/lib/nav'

const ROLE_TONE = { admin: 'accent', teacher: 'teal', student: 'amber', parent: 'pink', finance: 'green', system: 'violet' }
const MODULES = ['All', 'Fees', 'Attendance', 'Gradebook', 'Admissions', 'Branches', 'Assignments', 'Platform', 'Users']

export default function AuditPage() {
  const { role, currentUser } = useApp()
  const isManager = ['admin', 'finance', 'system'].includes(role)
  const [q, setQ] = useState('')
  const [mod, setMod] = useState('All')

  // Managers see everything; everyone else sees only their own activity.
  let rows = isManager ? auditLogs : auditLogs.filter((l) => l.actor === currentUser.name)
  rows = rows.filter((l) =>
    (mod === 'All' || l.module === mod) &&
    (l.actor.toLowerCase().includes(q.toLowerCase()) || l.action.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div className="page">
      <PageHeader
        title={isManager ? 'System Log' : 'My Activity'}
        subtitle={isManager ? 'Every profile and their work — a full audit trail (immutable, DPDP-compliant).' : 'A record of your recent activity in Scholr.'}
      />

      {isManager && (
        <div className="grid kpis" style={{ marginBottom: 16 }}>
          <Kpi label="Events (24h)" value={auditLogs.length} icon="view" tone="accent" />
          <Kpi label="Fee actions" value={auditLogs.filter(l => l.module === 'Fees').length} icon="wallet" tone="green" />
          <Kpi label="Platform events" value={auditLogs.filter(l => l.module === 'Platform').length} icon="settings" tone="violet" />
          <Kpi label="Active profiles" value={new Set(auditLogs.map(l => l.actor)).size} icon="people" tone="blue" />
        </div>
      )}

      <div className="between" style={{ marginBottom: 14, gap: 12, flexWrap: 'wrap' }}>
        <div className="pillrow">
          {MODULES.map((m) => <Pill key={m} active={mod === m} onClick={() => setMod(m)}>{m}</Pill>)}
        </div>
        {isManager && <SearchInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search profile or action…" />}
      </div>

      <Card bodyClass="tight">
        <div className="timeline-log">
          {rows.map((l) => (
            <div key={l.id} className="log-row">
              <Avatar name={l.actor} size="sm" tone={ROLE_TONE[l.role]} />
              <div className="log-body">
                <div className="log-line">
                  <b>{l.actor}</b>
                  <Badge tone="gray">{ROLE_LABELS[l.role] || l.role}</Badge>
                  <span className="muted">{l.action}</span>
                </div>
                <div className="log-meta faint">
                  <span><Glyph name="building" size={12} /> {l.branch}</span>
                  <span><Glyph name="features" size={12} /> {l.module}</span>
                  <span className="mono">{l.ip}</span>
                  <span>{l.at}</span>
                </div>
              </div>
            </div>
          ))}
          {rows.length === 0 && <div className="muted" style={{ padding: 28, textAlign: 'center' }}>No log entries.</div>}
        </div>
      </Card>

      <style jsx>{`
        .log-row { display: flex; gap: 12px; padding: 13px 16px; border-bottom: 1px solid var(--border); }
        .log-row:last-child { border-bottom: none; }
        .log-body { flex: 1; min-width: 0; }
        .log-line { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 13.5px; }
        .log-meta { display: flex; gap: 14px; flex-wrap: wrap; font-size: 11.5px; margin-top: 4px; }
        .log-meta span { display: inline-flex; align-items: center; gap: 4px; }
      `}</style>
    </div>
  )
}
