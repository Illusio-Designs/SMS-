'use client'

export function BarChart({ data, valueKey = 'count', labelKey = 'band', format, color }) {
  const max = Math.max(...data.map((d) => d[valueKey])) || 1
  return (
    <div className="chart">
      {data.map((d, i) => (
        <div className="col" key={i}>
          <span className="val">{format ? format(d[valueKey]) : d[valueKey]}</span>
          <div className="fill" style={{ height: `${(d[valueKey] / max) * 100}%`, background: color }} />
          <span className="cap">{d[labelKey]}</span>
        </div>
      ))}
    </div>
  )
}

// Simple sparkline-ish line area chart from an array of numbers.
export function LineChart({ points, color = 'var(--accent)', height = 150, format }) {
  const max = Math.max(...points.map((p) => p.v))
  const min = Math.min(...points.map((p) => p.v))
  const range = max - min || 1
  const w = 100
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w
    const y = height - 20 - ((p.v - min) / range) * (height - 40)
    return [x, y]
  })
  const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c[0]},${c[1]}`).join(' ')
  const area = `${path} L${w},${height} L0,${height} Z`
  return (
    <div>
      <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height }}>
        <path d={area} fill={color} opacity="0.1" />
        <path d={path} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        {coords.map((c, i) => <circle key={i} cx={c[0]} cy={c[1]} r="1.6" fill={color} vectorEffect="non-scaling-stroke" />)}
      </svg>
      <div className="between" style={{ marginTop: 6 }}>
        {points.map((p, i) => <span key={i} className="cap" style={{ fontSize: 11, color: 'var(--text-soft)' }}>{p.label}</span>)}
      </div>
    </div>
  )
}

export default BarChart
