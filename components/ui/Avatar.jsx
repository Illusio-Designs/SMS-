'use client'

import { initials } from './format'

// size: sm | md | lg
export function Avatar({ name, size = 'md', tone = 'accent' }) {
  const px = { sm: 30, md: 38, lg: 52 }[size] || 38
  const [bg, fg] = {
    accent: ['var(--accent-soft)', 'var(--accent)'],
    green: ['var(--green-soft)', 'var(--green)'],
    blue: ['var(--blue-soft)', 'var(--blue)'],
    pink: ['#fce7f1', '#db2777'],
    amber: ['var(--amber-soft)', 'var(--amber)'],
  }[tone] || ['var(--accent-soft)', 'var(--accent)']
  return (
    <span style={{
      width: px, height: px, borderRadius: '50%', background: bg, color: fg,
      display: 'inline-grid', placeItems: 'center', fontWeight: 700,
      fontSize: Math.round(px * 0.36), flex: '0 0 auto',
    }}>
      {initials(name)}
    </span>
  )
}

export default Avatar
