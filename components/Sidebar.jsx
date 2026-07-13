'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useApp } from './AppContext'
import { groupedNavForRole, ROLE_LABELS, SECTION_ICON } from '@/lib/nav'
import { school } from '@/lib/mockData'
import { Glyph } from '@/components/ui'
import { BrandGlyph } from '@/components/BrandMark'

export default function Sidebar({ open, onNavigate }) {
  const pathname = usePathname()
  const { role, logo } = useApp()
  const groups = groupedNavForRole(role)

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/')
  const activeSection = groups.find((g) => g.items.some((i) => isActive(i.href)))?.section

  // Which dropdown groups are expanded. Start with the active section open.
  const [expanded, setExpanded] = useState(() => ({ [activeSection || groups[0]?.section]: true }))

  // Keep the section containing the current route open as you navigate.
  useEffect(() => {
    if (activeSection) setExpanded((e) => ({ ...e, [activeSection]: true }))
  }, [activeSection])

  const toggle = (section) => setExpanded((e) => ({ ...e, [section]: !e[section] }))

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar__brand">
        <span className="logo">
          {logo
            ? <img src={logo} alt="School logo" />
            : <BrandGlyph size={22} />}
        </span>
        <span>
          Scholr
          <small>{school.name}</small>
        </span>
      </div>
      <div className="sidebar__scope">{ROLE_LABELS[role]} Portal</div>

      <nav className="nav">
        {groups.map((g) => {
          const isOpen = !!expanded[g.section]
          const hasActive = g.items.some((i) => isActive(i.href))
          return (
            <div className="nav-group" key={g.section}>
              <button
                className={`nav-group__toggle ${hasActive ? 'has-active' : ''}`}
                onClick={() => toggle(g.section)}
                aria-expanded={isOpen}
              >
                <span className="ico"><Glyph name={SECTION_ICON[g.section]} size={17} /></span>
                <span className="nav-group__title">{g.section}</span>
                <span className={`chevron ${isOpen ? 'up' : ''}`}><Glyph name="arrowDown" size={15} /></span>
              </button>

              <div className={`nav-group__items ${isOpen ? 'open' : ''}`}>
                <div className="nav-group__inner">
                  {g.items.map((n) => {
                    const active = isActive(n.href)
                    const label = (role === 'student' || role === 'parent') && n.myLabel ? n.myLabel : n.label
                    return (
                      <Link key={n.href} href={n.href} className={active ? 'active' : ''} onClick={onNavigate}>
                        <span className="ico"><Glyph name={n.icon} size={17} strokeWidth={active ? 2 : 1.8} /></span>
                        {label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </nav>

      <div className="sidebar__foot">
        <Link href={role === 'system' ? '/system-login' : '/login'} className="logout-link" onClick={onNavigate}>
          <Glyph name="logout" size={16} /> Sign out
        </Link>
        <div style={{ marginTop: 10 }}>{school.board} · {school.session} · demo</div>
      </div>
    </aside>
  )
}
