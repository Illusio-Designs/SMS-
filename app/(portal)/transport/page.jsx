'use client'

import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Button, Table, Bar, Glyph, Stat } from '@/components/ui'
import { transportSummary, busRoutes, myTransport } from '@/lib/mockData'

export default function TransportPage() {
  const { role } = useApp()
  return (
    <div className="page">
      <PageHeader
        title="Transport"
        subtitle={role === 'parent' ? "Your child's bus route and live status." : 'Routes, vehicles and live tracking.'}
        actions={role === 'admin' ? <Button variant="primary" icon="add">Add route</Button> : null}
      />
      {role === 'parent' ? <ParentTransport /> : <AdminTransport />}
    </div>
  )
}

function AdminTransport() {
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Routes" value={transportSummary.routes} icon="route" tone="accent" />
        <Kpi label="Buses" value={transportSummary.buses} icon="transport" tone="blue" />
        <Kpi label="Students" value={transportSummary.students} icon="people" tone="teal" />
        <Kpi label="On-time" value={`${transportSummary.onTime}%`} icon="badge" tone="green" />
      </div>

      <Card bodyClass="tight" title="Routes & live status">
        <Table
          rowKey="id"
          columns={[
            { key: 'name', label: 'Route', render: (r) => (<div><b>{r.name}</b><div className="faint" style={{ fontSize: 12 }}>{r.bus} · {r.driver}</div></div>) },
            { key: 'stops', label: 'Stops', align: 'right', render: (r) => r.stops },
            { key: 'students', label: 'Students', align: 'right', render: (r) => r.students },
            { key: 'occ', label: 'Occupancy', width: '18%', render: (r) => (
              <div style={{ minWidth: 100 }}>
                <div className="mono" style={{ fontSize: 12, marginBottom: 4 }}>{r.occupancy}%</div>
                <Bar pct={r.occupancy} color={r.occupancy > 90 ? 'var(--amber)' : 'var(--accent)'} />
              </div>
            ) },
            { key: 'eta', label: 'ETA', render: (r) => <span className="mono">{r.eta}</span> },
            { key: 'status', label: 'Status', render: (r) => <Badge>{r.status}</Badge> },
          ]}
          rows={busRoutes}
        />
      </Card>
    </div>
  )
}

function ParentTransport() {
  const t = myTransport
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Route" value="Route 1" sub={t.bus} icon="route" tone="accent" />
        <Kpi label="Pickup" value={t.pickup} sub={t.stop} icon="clock" tone="blue" />
        <Kpi label="Live ETA" value={t.eta} sub={t.status} icon="location" tone="green" />
        <Kpi label="Drop" value={t.drop} icon="school" tone="teal" />
      </div>

      <Card title="Live bus location">
        <div className="map-mock">
          <div className="map-grid" />
          <div className="bus-pin"><Glyph name="transport" size={22} color="#fff" /></div>
          <div className="map-label">🚌 {t.bus} · {t.status} · ETA {t.eta}</div>
        </div>
        <div className="between" style={{ marginTop: 14 }}>
          <Stat label="Driver" value={t.driver} />
          <Stat label="Contact" value={t.driverPhone} tone="blue" />
          <Button icon="chat">Message driver</Button>
        </div>
      </Card>

      <style jsx>{`
        .map-mock { position: relative; height: 240px; border-radius: 12px; overflow: hidden; background: linear-gradient(135deg,#eef2ff,#e7f7ec); border: 1px solid var(--border); }
        .map-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 32px 32px; opacity: 0.5; }
        .bus-pin { position: absolute; top: 42%; left: 44%; width: 44px; height: 44px; border-radius: 50%; background: var(--accent); display: grid; place-items: center; box-shadow: 0 6px 18px rgba(79,70,229,0.4); }
        .map-label { position: absolute; bottom: 12px; left: 12px; background: var(--surface); padding: 7px 12px; border-radius: 8px; font-size: 12.5px; font-weight: 600; box-shadow: var(--shadow); }
      `}</style>
    </div>
  )
}
