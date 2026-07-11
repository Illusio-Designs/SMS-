'use client'

// Small presentational building blocks shared across pages.

export function Card({ title, action, children, bodyClass = '', className = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || action) && (
        <div className="card__head">
          <h3>{title}</h3>
          {action}
        </div>
      )}
      <div className={`card__body ${bodyClass}`}>{children}</div>
    </div>
  )
}

export function Kpi({ label, value, sub, icon, tone = 'blue' }) {
  const bg = {
    blue: 'var(--blue-soft)', green: 'var(--green-soft)',
    amber: 'var(--amber-soft)', red: 'var(--red-soft)', accent: 'var(--accent-soft)',
  }[tone]
  const fg = {
    blue: 'var(--blue)', green: 'var(--green)',
    amber: 'var(--amber)', red: 'var(--red)', accent: 'var(--accent)',
  }[tone]
  return (
    <div className="card kpi">
      {icon && <div className="k-icon" style={{ background: bg, color: fg }}>{icon}</div>}
      <div className="k-label">{label}</div>
      <div className="k-value">{value}</div>
      {sub && <div className="k-sub muted">{sub}</div>}
    </div>
  )
}

const TONE = {
  Paid: 'green', Present: 'green', Approved: 'green', Enrolled: 'green', PASS: 'green',
  Active: 'green', Published: 'green', 'Marks Published': 'green',
  Due: 'amber', Partial: 'amber', Pending: 'amber', Draft: 'amber', Waitlist: 'amber',
  Scheduled: 'blue', Offer: 'blue',
  Overdue: 'red', Absent: 'red', Rejected: 'red',
}

export function Badge({ children, tone }) {
  const t = tone || TONE[children] || 'gray'
  return (
    <span className={`badge ${t}`}>
      <span className="dot" />
      {children}
    </span>
  )
}

export function Bar({ pct, color }) {
  return (
    <div className="bar">
      <span style={{ width: `${Math.min(100, pct)}%`, background: color }} />
    </div>
  )
}

export function BarChart({ data, valueKey = 'count', labelKey = 'band', format }) {
  const max = Math.max(...data.map((d) => d[valueKey])) || 1
  return (
    <div className="chart">
      {data.map((d, i) => (
        <div className="col" key={i}>
          <span className="val">{format ? format(d[valueKey]) : d[valueKey]}</span>
          <div className="fill" style={{ height: `${(d[valueKey] / max) * 100}%` }} />
          <span className="cap">{d[labelKey]}</span>
        </div>
      ))}
    </div>
  )
}

export function inr(n) {
  return '₹' + n.toLocaleString('en-IN')
}
