'use client'

import { PageHeader, Card, Badge, Kpi } from '@/components/ui'
import { calendarEvents } from '@/lib/mockData'

const TAG_TONE = { Exam: 'red', Event: 'blue', Meeting: 'amber', Holiday: 'green', Fees: 'amber' }

export default function CalendarPage() {
  // Group events by month.
  const byMonth = {}
  for (const e of [...calendarEvents].sort((a, b) => a.date.localeCompare(b.date))) {
    const key = new Date(e.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    ;(byMonth[key] ||= []).push(e)
  }

  return (
    <div className="page">
      <PageHeader title="Calendar" subtitle="School events, exams, holidays and meetings." />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Upcoming events" value={calendarEvents.length} icon="calendar" tone="accent" />
        <Kpi label="Exams" value={calendarEvents.filter(e => e.tag === 'Exam').length} icon="exam" tone="red" />
        <Kpi label="Holidays" value={calendarEvents.filter(e => e.tag === 'Holiday').length} icon="sun" tone="green" />
        <Kpi label="Meetings" value={calendarEvents.filter(e => e.tag === 'Meeting').length} icon="people" tone="amber" />
      </div>

      <div className="stack">
        {Object.entries(byMonth).map(([month, items]) => (
          <Card key={month} title={month}>
            <div className="stack">
              {items.map((e) => {
                const d = new Date(e.date)
                return (
                  <div key={e.id} className="between">
                    <div className="row" style={{ gap: 12 }}>
                      <span className="cal-date">
                        <b>{d.getDate()}</b>
                        <span>{d.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
                      </span>
                      <span>{e.title}</span>
                    </div>
                    <Badge tone={TAG_TONE[e.tag]}>{e.tag}</Badge>
                  </div>
                )
              })}
            </div>
          </Card>
        ))}
      </div>

      <style jsx>{`
        .cal-date { display: inline-flex; flex-direction: column; align-items: center; justify-content: center;
          width: 46px; height: 46px; border-radius: 11px; background: var(--accent-soft); color: var(--accent); line-height: 1.1; }
        .cal-date b { font-size: 16px; }
        .cal-date span { font-size: 10px; text-transform: uppercase; }
      `}</style>
    </div>
  )
}
