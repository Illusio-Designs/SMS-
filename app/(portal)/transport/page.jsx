'use client'

import { useEffect, useRef, useState } from 'react'
import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Kpi, Button, Table, Bar, Glyph, Icon, Stat, RowActions } from '@/components/ui'
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
            { key: 'act', label: '', align: 'right', render: (r) => <RowActions label={r.name} /> },
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

  // progress: 0 .. (stops.length - 1), fractional between stops. Drives the
  // route-timeline card and the ETA estimate alongside the live GPS map.
  const [progress, setProgress] = useState(0.4)
  const raf = useRef(null)

  useEffect(() => {
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
  }, [stops.length])

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
        {/* Live GPS tracker (real device) */}
        <Card title="Live bus location" subtitle="Live GPS feed from the bus tracker" action={
          <a className="btn sm" href={t.trackingUrl} target="_blank" rel="noopener noreferrer">
            <Glyph name="location" size={15} /> Open full tracker
          </a>
        }>
          <LiveTracker url={t.trackingUrl} />
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

/* Live GPS tracker (real device feed). Defaults to a launch panel that opens
   the tracker; can attempt an inline embed for trackers that allow framing. */
function LiveTracker({ url }) {
  const [mode, setMode] = useState('launch') // 'launch' | 'embed'
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="tracker">
      {mode === 'launch' ? (
        <div className="tracker-launch">
          <div className="tl-map-bg" />
          <div className="tl-radar"><Glyph name="transport" size={26} color="#fff" /></div>
          <div className="tl-panel">
            <div className="row" style={{ gap: 8, justifyContent: 'center' }}>
              <span className="live-dot on" />
              <b style={{ fontSize: 14 }}>Live GPS · IOPGPS</b>
            </div>
            <span className="muted" style={{ fontSize: 12.5, maxWidth: 320, textAlign: 'center' }}>
              View your child’s bus live on the real-time map — position, speed and route updated from the on-board GPS device.
            </span>
            <a className="btn primary" href={url} target="_blank" rel="noopener noreferrer">
              <Glyph name="location" size={16} /> Open live map
            </a>
            <button className="linkish" onClick={() => setMode('embed')}>or show it here ↧</button>
          </div>
        </div>
      ) : (
        <>
          {!loaded && (
            <div className="tracker-state">
              <span className="spinner" />
              <span className="muted" style={{ fontSize: 13 }}>Connecting to live GPS feed…</span>
            </div>
          )}
          <iframe
            src={url}
            title="Live bus GPS tracker"
            className="tracker-frame"
            onLoad={() => setLoaded(true)}
            allow="geolocation"
            style={{ opacity: loaded ? 1 : 0 }}
          />
          <div className="tracker-bar">
            <span className="row" style={{ gap: 7 }}><span className="live-dot on" /> Live GPS · IOPGPS</span>
            <a className="tracker-link" href={url} target="_blank" rel="noopener noreferrer">
              Not loading? Open live map <Glyph name="location" size={13} />
            </a>
          </div>
        </>
      )}

      <style jsx>{`
        .tracker { position: relative; height: 320px; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); background: var(--surface-2); }
        .tracker-frame { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; transition: opacity 0.3s; }
        .tracker-state { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; z-index: 1; padding: 20px; }
        .spinner { width: 30px; height: 30px; border-radius: 50%; border: 3px solid var(--border); border-top-color: var(--accent); animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .tracker-launch { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .tl-map-bg { position: absolute; inset: 0; background:
          radial-gradient(circle at 30% 40%, rgba(79,70,229,0.12), transparent 45%),
          linear-gradient(135deg, #eef2ff, #e7f7ec);
          background-color: var(--surface-2); }
        .tl-map-bg::after { content: ''; position: absolute; inset: 0; opacity: 0.45;
          background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
          background-size: 30px 30px; }
        .tl-radar { position: absolute; width: 52px; height: 52px; border-radius: 50%; background: var(--accent);
          display: grid; place-items: center; box-shadow: 0 8px 22px rgba(79,70,229,0.4); animation: pulse 1.8s infinite; z-index: 1; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(79,70,229,0.4); } 70% { box-shadow: 0 0 0 22px rgba(79,70,229,0); } 100% { box-shadow: 0 0 0 0 rgba(79,70,229,0); } }
        .tl-panel { position: absolute; bottom: 16px; left: 16px; right: 16px; background: var(--surface);
          border-radius: 12px; padding: 16px; box-shadow: var(--shadow); display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .linkish { border: none; background: none; color: var(--accent); font-weight: 600; font-size: 12.5px; }

        .tracker-bar { position: absolute; bottom: 0; left: 0; right: 0; display: flex; align-items: center; justify-content: space-between;
          gap: 8px; padding: 8px 12px; background: var(--surface); border-top: 1px solid var(--border); font-size: 11.5px; font-weight: 600; z-index: 1; }
        .tracker-link { display: inline-flex; align-items: center; gap: 5px; color: var(--accent); }
        .live-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); animation: blink 1.2s infinite; }
        @keyframes blink { 50% { opacity: 0.3; } }
      `}</style>
    </div>
  )
}
