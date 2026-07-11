'use client'

import { useEffect, useRef, useState } from 'react'
import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Button, Table, Bar, Glyph, Icon, Stat } from '@/components/ui'
import { transportSummary, busRoutes, myTransport } from '@/lib/mockData'

export default function TransportPage() {
  const { role } = useApp()
  return (
    <div className="page">
      <PageHeader
        title="Transport"
        subtitle={role === 'parent' ? "Live tracking of your child's school bus." : 'Routes, vehicles and live tracking.'}
        actions={role === 'admin' ? <Button variant="primary" icon="add">Add route</Button> : null}
      />
      {role === 'parent' ? <ParentTracking /> : <AdminTransport />}
    </div>
  )
}

/* ================= Admin ================= */
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

/* ================= Parent — live tracking ================= */
function ParentTracking() {
  const t = myTransport
  const stops = t.stops
  const homeIndex = stops.findIndex((s) => s.home)

  // progress: 0 .. (stops.length - 1), fractional between stops. Animates live.
  const [progress, setProgress] = useState(0.4)
  const [live, setLive] = useState(true)
  const raf = useRef(null)

  useEffect(() => {
    if (!live) return
    let last = performance.now()
    const tick = (now) => {
      const dt = (now - last) / 1000
      last = now
      setProgress((p) => {
        const next = p + dt * 0.06 // ~one stop every ~16s
        return next >= stops.length - 1 ? stops.length - 1 : next
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [live, stops.length])

  const passedHome = progress >= homeIndex
  const nextStopIndex = Math.min(Math.ceil(progress), stops.length - 1)
  const nextStop = stops[nextStopIndex]
  // crude ETA to the child's stop, in minutes, from remaining "stop distance"
  const minsToHome = Math.max(0, Math.round((homeIndex - progress) * 11))
  const pctComplete = Math.round((progress / (stops.length - 1)) * 100)

  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Bus" value={t.bus} sub={t.route} icon="transport" tone="accent" />
        <Kpi label="Your stop ETA" value={passedHome ? 'Picked up' : `${minsToHome} min`} sub={t.stop} icon="location" tone={passedHome ? 'green' : 'blue'} />
        <Kpi label="Speed" value={`${t.speed} km/h`} sub="live" icon="route" tone="teal" />
        <Kpi label="Status" value={t.status} sub={`Next: ${nextStop.name}`} icon="badge" tone="green" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.35fr 1fr' }}>
        {/* Live map */}
        <Card title="Live bus location" action={
          <button className="btn sm" onClick={() => setLive((v) => !v)}>
            <Glyph name={live ? 'clock' : 'route'} size={15} /> {live ? 'Pause' : 'Resume'}
          </button>
        }>
          <LiveMap stops={stops} progress={progress} live={live} />
          <div className="between" style={{ marginTop: 14 }}>
            <Stat label="Driver" value={t.driver} />
            <Stat label="Contact" value={t.driverPhone} tone="blue" />
            <Button icon="chat">Call driver</Button>
          </div>
        </Card>

        {/* Route timeline */}
        <Card title="Route timeline" subtitle={`${pctComplete}% of route complete`}>
          <div className="timeline">
            {stops.map((s, i) => {
              const done = progress >= i
              const current = i === nextStopIndex && !done
              return (
                <div key={i} className={`tl-stop ${done ? 'done' : ''} ${s.home ? 'home' : ''}`}>
                  <div className="tl-marker">
                    {done
                      ? <Glyph name="check" size={13} color="#fff" />
                      : s.home ? <Glyph name="home" size={12} color="#fff" /> : <span className="tl-dot" />}
                  </div>
                  <div className="tl-body">
                    <div className="between">
                      <b style={{ fontSize: 13 }}>{s.name}{s.home && <span className="badge accent-badge">Your stop</span>}</b>
                      <span className="faint mono" style={{ fontSize: 12 }}>{s.time}</span>
                    </div>
                    {current && <span className="tl-eta"><Glyph name="transport" size={13} /> Bus arriving next</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <style jsx>{`
        .timeline { position: relative; padding-left: 4px; }
        .tl-stop { display: flex; gap: 12px; padding-bottom: 16px; position: relative; }
        .tl-stop:not(:last-child)::before {
          content: ''; position: absolute; left: 11px; top: 22px; bottom: -2px; width: 2px; background: var(--border);
        }
        .tl-stop.done:not(:last-child)::before { background: var(--green); }
        .tl-marker {
          width: 24px; height: 24px; border-radius: 50%; flex: 0 0 auto; z-index: 1;
          display: grid; place-items: center; background: var(--surface-2); border: 2px solid var(--border);
        }
        .tl-stop.done .tl-marker { background: var(--green); border-color: var(--green); }
        .tl-stop.home .tl-marker { background: var(--accent); border-color: var(--accent); }
        .tl-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--text-faint); }
        .tl-body { flex: 1; padding-top: 2px; }
        .accent-badge { background: var(--accent-soft); color: var(--accent); margin-left: 8px; padding: 1px 7px; font-size: 10.5px; }
        .tl-eta { display: inline-flex; align-items: center; gap: 5px; margin-top: 4px; font-size: 11.5px; font-weight: 600; color: var(--accent); }
      `}</style>
    </div>
  )
}

/* Animated SVG map: bus moves along a poly-line of stops. */
function LiveMap({ stops, progress, live }) {
  // Fixed pseudo-geographic points for the route (percent coords).
  const pts = [
    [10, 78], [26, 60], [44, 66], [58, 42], [76, 50], [90, 22],
  ].slice(0, stops.length)

  const seg = Math.min(Math.floor(progress), pts.length - 2)
  const frac = progress - seg
  const [x1, y1] = pts[seg]
  const [x2, y2] = pts[Math.min(seg + 1, pts.length - 1)]
  const bx = x1 + (x2 - x1) * frac
  const by = y1 + (y2 - y1) * frac

  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const donePath = (() => {
    const parts = [`M${pts[0][0]},${pts[0][1]}`]
    for (let i = 1; i <= seg; i++) parts.push(`L${pts[i][0]},${pts[i][1]}`)
    parts.push(`L${bx},${by}`)
    return parts.join(' ')
  })()

  return (
    <div className="map-live">
      <div className="map-grid" />
      <svg viewBox="0 0 100 90" preserveAspectRatio="none" className="map-svg">
        <path d={path} fill="none" stroke="var(--border)" strokeWidth="1.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path d={donePath} fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="1.4"
            fill={stops[i].home ? 'var(--accent)' : progress >= i ? 'var(--green)' : 'var(--surface)'}
            stroke={stops[i].home ? 'var(--accent)' : 'var(--text-faint)'} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {/* Bus marker positioned by percentage */}
      <div className="bus-marker" style={{ left: `${bx}%`, top: `${(by / 90) * 100}%` }}>
        <span className={`bus-pin ${live ? 'pulsing' : ''}`}><Glyph name="transport" size={18} color="#fff" /></span>
      </div>
      <div className="map-legend">
        <span className={`live-dot ${live ? 'on' : ''}`} /> {live ? 'Live' : 'Paused'} · updating every few seconds
      </div>

      <style jsx>{`
        .map-live { position: relative; height: 250px; border-radius: 12px; overflow: hidden;
          background: linear-gradient(135deg, #eef2ff, #e7f7ec); border: 1px solid var(--border); }
        .map-grid { position: absolute; inset: 0; opacity: 0.5;
          background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 30px 30px; }
        .map-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .bus-marker { position: absolute; transform: translate(-50%, -50%); transition: left 0.2s linear, top 0.2s linear; }
        .bus-pin { width: 36px; height: 36px; border-radius: 50%; background: var(--accent); display: grid; place-items: center;
          box-shadow: 0 6px 16px rgba(79,70,229,0.45); }
        .bus-pin.pulsing { animation: pulse 1.6s infinite; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(79,70,229,0.45); } 70% { box-shadow: 0 0 0 14px rgba(79,70,229,0); } 100% { box-shadow: 0 0 0 0 rgba(79,70,229,0); } }
        .map-legend { position: absolute; bottom: 10px; left: 10px; background: var(--surface); padding: 6px 11px; border-radius: 8px;
          font-size: 11.5px; font-weight: 600; box-shadow: var(--shadow); display: flex; align-items: center; gap: 7px; }
        .live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--text-faint); }
        .live-dot.on { background: var(--green); animation: blink 1.2s infinite; }
        @keyframes blink { 50% { opacity: 0.3; } }
      `}</style>
    </div>
  )
}
