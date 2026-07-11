'use client'

export function Card({ title, subtitle, action, children, bodyClass = '', className = '', pad = true, style }) {
  return (
    <div className={`card ${className}`} style={style}>
      {(title || action) && (
        <div className="card__head">
          <div>
            {title && <h3>{title}</h3>}
            {subtitle && <div className="muted" style={{ fontSize: 12.5 }}>{subtitle}</div>}
          </div>
          {action}
        </div>
      )}
      <div className={`card__body ${pad ? '' : 'tight'} ${bodyClass}`}>{children}</div>
    </div>
  )
}

export default Card
