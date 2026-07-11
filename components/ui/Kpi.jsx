'use client'

import Icon, { Glyph } from './Icon'

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
            {trend != null && (
              <span className={`trend ${trend > 0 ? 'up' : 'down'} row`} style={{ gap: 2 }}>
                <Glyph name={trend > 0 ? 'arrowUp' : 'arrowDown'} size={12} /> {Math.abs(trend)}%
              </span>
            )}
            {sub}
          </div>
        )}
      </div>
    </div>
  )
}

export default Kpi
