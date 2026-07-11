'use client'

export function Bar({ pct, color = 'var(--accent)', height = 8 }) {
  return (
    <div className="bar" style={{ height }}>
      <span style={{ width: `${Math.max(0, Math.min(100, pct))}%`, background: color }} />
    </div>
  )
}

// Circular progress ring.
export function Ring({ pct, size = 92, stroke = 9, color = 'var(--accent)', label }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const off = c - (Math.max(0, Math.min(100, pct)) / 100) * c
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eceef4" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: size * 0.24, fontWeight: 750 }}>{pct}%</div>
          {label && <div className="faint" style={{ fontSize: 10 }}>{label}</div>}
        </div>
      </div>
    </div>
  )
}

export default Bar
