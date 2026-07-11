'use client'

import Icon from './Icon'

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-head between">
      <div>
        <h2>{title}</h2>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
      {actions && <div className="row">{actions}</div>}
    </div>
  )
}

export function Pill({ children, active, onClick }) {
  return (
    <span className={`pill ${active ? 'pill--on' : ''}`} onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
      {children}
    </span>
  )
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button key={t.value} className={`tab ${value === t.value ? 'on' : ''}`} onClick={() => onChange(t.value)}>
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function EmptyState({ icon = 'search', title, hint }) {
  return (
    <div className="empty">
      <Icon name={icon} tone="gray" size="lg" />
      <b>{title}</b>
      {hint && <span className="muted">{hint}</span>}
    </div>
  )
}

export function Stat({ label, value, tone = 'accent' }) {
  const fg = {
    accent: 'var(--accent)', green: 'var(--green)', blue: 'var(--blue)',
    amber: 'var(--amber)', red: 'var(--red)',
  }[tone]
  return (
    <div>
      <div className="faint" style={{ fontSize: 12 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 750, color: fg }}>{value}</div>
    </div>
  )
}
