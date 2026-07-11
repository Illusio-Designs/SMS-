'use client'

import { HugeiconsIcon } from '@hugeicons/react'

// Two exports:
//  <Glyph name="fees" />              → a bare stroke icon (inherits colour/size)
//  <Icon name="fees" tone="green" />  → a large ROUND tinted badge containing the glyph

import { ICON } from './icons'

const TONES = {
  accent: ['var(--accent-soft)', 'var(--accent)'],
  blue: ['var(--blue-soft)', 'var(--blue)'],
  green: ['var(--green-soft)', 'var(--green)'],
  amber: ['var(--amber-soft)', 'var(--amber)'],
  red: ['var(--red-soft)', 'var(--red)'],
  teal: ['#dcf5f1', '#0d9488'],
  pink: ['#fce7f1', '#db2777'],
  violet: ['#efe9fe', '#7c3aed'],
  gray: ['#eef0f4', 'var(--text-soft)'],
}

const SIZES = { sm: 36, md: 46, lg: 60, xl: 78, xxl: 96 }

export function Glyph({ name, size = 20, strokeWidth = 1.8, color = 'currentColor', style }) {
  const icon = ICON[name] || ICON.dashboard
  return <HugeiconsIcon icon={icon} size={size} color={color} strokeWidth={strokeWidth} style={style} />
}

export default function Icon({ name, tone = 'accent', size = 'lg', ring = false, style }) {
  const [bg, fg] = TONES[tone] || TONES.accent
  const px = SIZES[size] || SIZES.lg
  return (
    <span
      className="ui-icon"
      style={{
        width: px, height: px, borderRadius: '50%', background: bg, color: fg,
        display: 'inline-grid', placeItems: 'center', flex: '0 0 auto',
        boxShadow: ring ? `0 0 0 8px ${bg}` : 'none', ...style,
      }}
    >
      <Glyph name={name} size={Math.round(px * 0.5)} strokeWidth={1.8} color={fg} />
    </span>
  )
}
