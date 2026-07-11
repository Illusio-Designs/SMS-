'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from './AppContext'
import { navForRole, ROLE_LABELS } from '@/lib/nav'
import { school } from '@/lib/mockData'

export default function Sidebar({ open, onNavigate }) {
  const pathname = usePathname()
  const { role } = useApp()
  const items = navForRole(role)

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar__brand">
        <span className="logo">{school.logo}</span>
        <span>
          Illusio SMS
          <small>{school.name}</small>
        </span>
      </div>
      <div className="sidebar__scope">{ROLE_LABELS[role]} Portal</div>
      <nav className="nav">
        {items.map((n) => {
          const active = pathname === n.href || pathname.startsWith(n.href + '/')
          return (
            <Link key={n.href} href={n.href} className={active ? 'active' : ''} onClick={onNavigate}>
              <span className="ico">{n.icon}</span>
              {n.label}
            </Link>
          )
        })}
      </nav>
      <div className="sidebar__foot">
        {school.board} · {school.session}
        <br />
        Demo build · mock data
      </div>
    </aside>
  )
}
