'use client'

import { PageHeader, Card, Badge, Kpi, Button, Table, Bar } from '@/components/ui'
import { hostelSummary, hostelRooms, messMenu } from '@/lib/mockData'

export default function HostelPage() {
  const occPct = Math.round((hostelSummary.occupied / hostelSummary.capacity) * 100)
  return (
    <div className="page">
      <PageHeader
        title="Hostel"
        subtitle="Room allocation, occupancy and mess management."
        actions={<Button variant="primary" icon="add">Allocate room</Button>}
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Blocks" value={hostelSummary.blocks} icon="building" tone="accent" />
        <Kpi label="Capacity" value={hostelSummary.capacity} icon="bed" tone="blue" />
        <Kpi label="Occupied" value={hostelSummary.occupied} sub={`${occPct}% full`} icon="people" tone="amber" />
        <Kpi label="Vacant" value={hostelSummary.vacant} icon="badge" tone="green" />
      </div>

      <div className="grid cols-2">
        <Card bodyClass="tight" title="Rooms">
          <Table
            rowKey="id"
            columns={[
              { key: 'block', label: 'Block' },
              { key: 'room', label: 'Room', render: (r) => <span className="mono">{r.room}</span> },
              { key: 'occ', label: 'Occupancy', render: (r) => (
                <div style={{ minWidth: 90 }}>
                  <div className="mono" style={{ fontSize: 12, marginBottom: 4 }}>{r.occupied}/{r.capacity}</div>
                  <Bar pct={(r.occupied / r.capacity) * 100} color={r.occupied === r.capacity ? 'var(--amber)' : 'var(--green)'} />
                </div>
              ) },
              { key: 'warden', label: 'Warden' },
              { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
            ]}
            rows={hostelRooms}
          />
        </Card>

        <Card title="Mess menu — this week">
          <div className="stack">
            {messMenu.map((m) => (
              <div key={m.day} className="menu-day">
                <b>{m.day}</b>
                <div className="muted" style={{ fontSize: 12.5 }}>🍳 {m.breakfast}</div>
                <div className="muted" style={{ fontSize: 12.5 }}>🍛 {m.lunch}</div>
                <div className="muted" style={{ fontSize: 12.5 }}>🍽 {m.dinner}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <style jsx>{`
        .menu-day { padding: 10px 12px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; display: flex; flex-direction: column; gap: 2px; }
      `}</style>
    </div>
  )
}
