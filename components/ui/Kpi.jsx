'use client'

import Icon from './Icon'

// KPI / stat tile with a huge round icon.
export function Kpi({ label, value, sub, icon = 'chart', tone = 'accent', trend }) {
  return (
    <div className="card kpi kpi--round">
      <Icon name={icon} tone={tone} size="lg" />
      <div className="kpi__text">
        <div className="k-label">{label}</div>
        <div className="k-value">{value}</div>
        {sub && (
          <div className="k-sub muted">
            {trend && <span className={`trend ${trend > 0 ? 'up' : 'down'}`}>{trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%</span>}
            {sub}
          </div>
        )}
      </div>
    </div>
  )
}

export default Kpi
