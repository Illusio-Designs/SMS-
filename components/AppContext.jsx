'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { users } from '@/lib/mockData'

const AppContext = createContext(null)

export const DEFAULT_ACCENT = '#4f46e5'

// Lighten a hex colour toward white by `amt` (0..1) — used to derive the soft tint.
function tint(hex, amt = 0.9) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const mix = (c) => Math.round(c + (255 - c) * amt)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

export function AppProvider({ children }) {
  const [role, setRole] = useState('admin')
  const [accent, setAccentState] = useState(DEFAULT_ACCENT)
  const [logo, setLogoState] = useState(null) // data URL or null
  const [ready, setReady] = useState(false)

  // Restore persisted demo state.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedRole = localStorage.getItem('sms-role')
    const savedAccent = localStorage.getItem('sms-accent')
    const savedLogo = localStorage.getItem('sms-logo')
    if (savedRole) setRole(savedRole)
    if (savedAccent) setAccentState(savedAccent)
    if (savedLogo) setLogoState(savedLogo)
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready && typeof window !== 'undefined') localStorage.setItem('sms-role', role)
  }, [role, ready])

  // Apply the accent colour to CSS variables globally.
  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.style.setProperty('--accent', accent)
    root.style.setProperty('--accent-soft', tint(accent, 0.9))
    if (ready) localStorage.setItem('sms-accent', accent)
  }, [accent, ready])

  useEffect(() => {
    if (!ready || typeof window === 'undefined') return
    if (logo) localStorage.setItem('sms-logo', logo)
    else localStorage.removeItem('sms-logo')
  }, [logo, ready])

  const setAccent = (hex) => setAccentState(hex)
  const setLogo = (dataUrl) => setLogoState(dataUrl)
  const resetTheme = () => { setAccentState(DEFAULT_ACCENT); setLogoState(null) }

  const currentUser = users.find((u) => u.role === role) || users[0]

  return (
    <AppContext.Provider
      value={{ role, setRole, currentUser, ready, accent, setAccent, logo, setLogo, resetTheme }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
