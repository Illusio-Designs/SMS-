'use client'

import { usePathname } from 'next/navigation'
import { useApp } from './AppContext'
import { ALL_NAV, ROLE_LABELS } from '@/lib/nav'

const ROLES = ['admin', 'teacher', 'student', 'parent']

export default function Topbar({ onMenu }) {
  const pathname = usePathname()
  const { role, setRole, currentUser } = useApp()

  const active = ALL_NAV.find(
    (n) => pathname === n.href || pathname.startsWith(n.href + '/')
  )
  const title = active ? active.label : 'Dashboard'

  return (
    <header className="topbar">
      <button className="hamburger" onClick={onMenu} aria-label="Menu">☰</button>
      <h1>{title}</h1>
      <div className="topbar__spacer" />

      <div className="rolepick" title="Switch demo portal">
        {ROLES.map((r) => (
          <button key={r} className={role === r ? 'on' : ''} onClick={() => setRole(r)}>
            {ROLE_LABELS[r]}
          </button>
        ))}
      </div>

      <div className="user-chip">
        <div className="meta right">
          <b>{currentUser.name}</b>
          <br />
          <span>{currentUser.title}</span>
        </div>
        <div className="avatar">{currentUser.avatar}</div>
      </div>
    </header>
  )
}
