'use client'

import { usePathname } from 'next/navigation'
import { useApp } from './AppContext'
import { ALL_NAV, ROLE_LABELS, ROLE_SHORT, ROLE_ICON } from '@/lib/nav'
import { Glyph, Avatar } from '@/components/ui'
import { branches } from '@/lib/mockData'

const ROLES = ['admin', 'teacher', 'student', 'parent', 'finance', 'system']
const BRANCH_ROLES = ['admin', 'finance']

export default function Topbar({ onMenu }) {
  const pathname = usePathname()
  const { role, setRole, branchId, setBranchId, currentUser } = useApp()

  const active = ALL_NAV.find((n) => pathname === n.href || pathname.startsWith(n.href + '/'))
  const title = active ? active.label : 'Dashboard'
  const showBranch = BRANCH_ROLES.includes(role)

  return (
    <header className="topbar">
      <button className="hamburger" onClick={onMenu} aria-label="Menu"><Glyph name="menu" size={22} /></button>
      <h1>{title}</h1>
      <div className="topbar__spacer" />

      {showBranch && (
        <div className="branchpick" title="Switch branch">
          <Glyph name="building" size={15} color="var(--text-soft)" />
          <select value={branchId} onChange={(e) => setBranchId(e.target.value)}>
            <option value="all">All branches</option>
            {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
      )}

      <div className="rolepick" title="Switch demo portal">
        {ROLES.map((r) => (
          <button key={r} className={role === r ? 'on' : ''} onClick={() => setRole(r)}>
            <Glyph name={ROLE_ICON[r]} size={15} strokeWidth={role === r ? 2.2 : 1.8} />
            <span className="rolepick__label">{ROLE_SHORT[r]}</span>
          </button>
        ))}
      </div>

      <button className="icon-btn" aria-label="Notifications"><Glyph name="bell" size={20} /><span className="dot-badge" /></button>

      <div className="user-chip">
        <div className="meta right">
          <b>{currentUser.name}</b>
          <br />
          <span>{currentUser.title}</span>
        </div>
        <Avatar name={currentUser.name} size="md" />
      </div>
    </header>
  )
}
