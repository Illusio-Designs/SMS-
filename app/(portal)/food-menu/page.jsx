'use client'

import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Button, Glyph } from '@/components/ui'
import { foodMenuWeek } from '@/lib/mockData'

const today = new Date().toLocaleDateString('en-IN', { weekday: 'long' })

export default function FoodMenuPage() {
  const { role } = useApp()
  const staff = role === 'admin'
  return (
    <div className="page">
      <PageHeader
        title="Food Menu"
        subtitle="Weekly canteen / mess menu."
        actions={staff ? <Button variant="primary" icon="edit">Edit menu</Button> : null}
      />

      <div className="menu-grid">
        {foodMenuWeek.map((d) => (
          <Card key={d.day} className={d.day === today ? 'today' : ''}
            title={d.day} action={d.day === today ? <span className="badge green"><span className="dot" />Today</span> : null}>
            <div className="stack" style={{ gap: 14 }}>
              <Meal icon="breakfast" tone="var(--amber)" label="Breakfast" text={d.breakfast} />
              <Meal icon="lunch" tone="var(--green)" label="Lunch" text={d.lunch} />
              <Meal icon="dinner" tone="var(--blue)" label="Snack" text={d.snack} />
            </div>
          </Card>
        ))}
      </div>

      <style jsx>{`
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
        .menu-grid :global(.card.today) { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent), var(--shadow); }
      `}</style>
    </div>
  )
}

function Meal({ icon, tone, label, text }) {
  return (
    <div className="row" style={{ alignItems: 'flex-start', gap: 10 }}>
      <Glyph name={icon} size={18} color={tone} />
      <div>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
        <div style={{ fontSize: 13 }}>{text}</div>
      </div>
    </div>
  )
}
