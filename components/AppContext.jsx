'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { users } from '@/lib/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [role, setRole] = useState('admin')
  const [ready, setReady] = useState(false)

  // Restore the last-selected demo role so a refresh keeps the portal.
  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('sms-role')
    if (saved) setRole(saved)
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready && typeof window !== 'undefined') localStorage.setItem('sms-role', role)
  }, [role, ready])

  const currentUser = users.find((u) => u.role === role) || users[0]

  return (
    <AppContext.Provider value={{ role, setRole, currentUser, ready }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
