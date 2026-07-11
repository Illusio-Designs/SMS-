'use client'

import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Button } from '@/components/ui'
import { timetableGrid, periods, weekdays } from '@/lib/mockData'

const SUBJECT_TONE = {
  Mathematics: '#eef0fe', Science: '#e7f7ec', English: '#e8f0fe', Hindi: '#fdf3e3',
  'Social Science': '#fce7f1', Computer: '#efe9fe', Art: '#fdeaea', 'P.E.': '#dcf5f1',
  Music: '#fef0e3', Library: '#eef0f4', 'Class Activity': '#eef0f4', Assembly: '#eef0f4',
}

export default function TimetablePage() {
  const { role } = useApp()
  const title = role === 'teacher' ? 'My Teaching Timetable' : 'Class Timetable — VIII-A'
  return (
    <div className="page">
      <PageHeader
        title="Timetable"
        subtitle={`${title} · Week of 07–12 July · ${role === 'teacher' ? 'R. Deshmukh' : 'Room 201'}`}
        actions={<Button icon="download">Export PDF</Button>}
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Periods / day" value="6" icon="clock" tone="accent" />
        <Kpi label="Subjects" value="9" icon="book" tone="blue" />
        <Kpi label="Teachers" value="9" icon="teacher" tone="teal" />
        <Kpi label="Clashes" value="0" sub="auto-checked" icon="badge" tone="green" />
      </div>

      <Card bodyClass="tight" title="Weekly schedule">
        <div className="table-wrap">
          <table className="tbl tt">
            <thead>
              <tr>
                <th style={{ width: 70 }}>Day</th>
                {periods.map((p, i) => <th key={i} className="tt-period">{p}</th>)}
              </tr>
            </thead>
            <tbody>
              {weekdays.map((day) => (
                <tr key={day}>
                  <td><b>{day}</b></td>
                  {timetableGrid[day].map((cell, i) => (
                    cell.isBreak ? (
                      <td key={i} className="tt-break">Break</td>
                    ) : (
                      <td key={i}>
                        <div className="tt-cell" style={{ background: SUBJECT_TONE[cell.subject] || 'var(--surface-2)' }}>
                          <b>{cell.subject}</b>
                          <span>{cell.teacher}</span>
                          {cell.room && <span className="faint">Room {cell.room}</span>}
                        </div>
                      </td>
                    )
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <style jsx>{`
        .tt td { vertical-align: top; }
        .tt-period { font-size: 10.5px !important; }
        .tt-cell { border-radius: 9px; padding: 8px 10px; display: flex; flex-direction: column; gap: 1px; min-width: 118px; }
        .tt-cell b { font-size: 12.5px; }
        .tt-cell span { font-size: 11px; color: var(--text-soft); }
        .tt-break { color: var(--text-faint); font-size: 11px; text-align: center; background: repeating-linear-gradient(45deg, var(--surface-2), var(--surface-2) 6px, var(--surface) 6px, var(--surface) 12px); }
      `}</style>
    </div>
  )
}
