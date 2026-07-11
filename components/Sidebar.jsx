'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from './AppContext'
import { groupedNavForRole, ROLE_LABELS } from '@/lib/nav'
import { school } from '@/lib/mockData'
import { Glyph } from '@/components/ui'

export default function Sidebar({ open, onNavigate }) {
  const pathname = usePathname()
  const { role, logo } = useApp()
  const groups = groupedNavForRole(role)

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar__brand">
        <span className="logo">
          {logo
            ? <img src={logo} alt="School logo" />
            : <Glyph name="school" size={20} color="#fff" strokeWidth={2} />}
        </span>
        <span>
          Illusio SMS
          <small>{school.name}</small>
        </span>
      </div>
      <div className="sidebar__scope">{ROLE_LABELS[role]} Portal</div>
      <nav className="nav">
        {groups.map((g) => (
          <div className="nav-group" key={g.section}>
            <div className="nav-group__label">{g.section}</div>
            {g.items.map((n) => {
              const active = pathname === n.href || pathname.startsWith(n.href + '/')
              return (
                <Link key={n.href} href={n.href} className={active ? 'active' : ''} onClick={onNavigate}>
                  <span className="ico"><Glyph name={n.icon} size={18} strokeWidth={active ? 2 : 1.8} /></span>
                  {n.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
      <div className="sidebar__foot">
        <Link href="/login" className="logout-link" onClick={onNavigate}>
          <Glyph name="logout" size={16} /> Sign out
        </Link>
        <div style={{ marginTop: 10 }}>{school.board} · {school.session} · demo</div>
      </div>
    </aside>
  )
}
