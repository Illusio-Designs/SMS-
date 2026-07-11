'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function PortalShell({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="shell">
      <Sidebar open={open} onNavigate={() => setOpen(false)} />
      <div className={`scrim ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <div className="main">
        <Topbar onMenu={() => setOpen((v) => !v)} />
        {children}
      </div>
    </div>
  )
}
