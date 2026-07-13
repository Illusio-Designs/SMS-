'use client'

import { useEffect, useState } from 'react'
import { Glyph } from './Icon'

// Minimal pub/sub toast. Call toast(message, tone) from anywhere; mount
// <Toaster /> once near the app root.
let listeners = []
let seq = 0

export function toast(message, tone = 'accent') {
  const t = { id: ++seq, message, tone }
  listeners.forEach((l) => l(t))
}

export function Toaster() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const on = (t) => {
      setItems((x) => [...x, t])
      setTimeout(() => setItems((x) => x.filter((i) => i.id !== t.id)), 2600)
    }
    listeners.push(on)
    return () => { listeners = listeners.filter((l) => l !== on) }
  }, [])

  const icon = (tone) => (tone === 'green' ? 'check' : tone === 'red' ? 'alert' : tone === 'amber' ? 'edit' : tone === 'blue' ? 'view' : 'badge')

  return (
    <div className="toaster">
      {items.map((t) => (
        <div key={t.id} className={`toast toast--${t.tone}`}>
          <Glyph name={icon(t.tone)} size={16} />
          {t.message}
        </div>
      ))}
    </div>
  )
}
