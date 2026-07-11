'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { users } from '@/lib/mockData'
import { lighten } from '@/lib/colorExtract'

const AppContext = createContext(null)

export const DEFAULT_ACCENT = '#4f46e5'
export const DEFAULT_ACCENT_2 = '#7c74f0'

// Lighten a hex toward white by `amt` (0..1) — used for the soft tint.
function tint(hex, amt = 0.9) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const mix = (c) => Math.round(c + (255 - c) * amt)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

export function AppProvider({ children }) {
  const [role, setRole] = useState('admin')
  const [accent, setAccentState] = useState(DEFAULT_ACCENT)
  const [accent2, setAccent2State] = useState(DEFAULT_ACCENT_2)
  const [logo, setLogoState] = useState(null) // data URL or null
  const [ready, setReady] = useState(false)

  // Restore persisted demo state.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedRole = localStorage.getItem('sms-role')
    const savedAccent = localStorage.getItem('sms-accent')
    const savedAccent2 = localStorage.getItem('sms-accent2')
    const savedLogo = localStorage.getItem('sms-logo')
    if (savedRole) setRole(savedRole)
    if (savedAccent) setAccentState(savedAccent)
    if (savedAccent2) setAccent2State(savedAccent2)
    if (savedLogo) setLogoState(savedLogo)
    setReady(true)
  }, [])

  useEffect(() => {
    if (ready && typeof window !== 'undefined') localStorage.setItem('sms-role', role)
  }, [role, ready])

  // Apply brand colours to CSS variables globally.
  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    root.style.setProperty('--accent', accent)
    root.style.setProperty('--accent-2', accent2)
    root.style.setProperty('--accent-soft', tint(accent, 0.9))
    if (ready) {
      localStorage.setItem('sms-accent', accent)
      localStorage.setItem('sms-accent2', accent2)
    }
  }, [accent, accent2, ready])

  useEffect(() => {
    if (!ready || typeof window === 'undefined') return
    if (logo) localStorage.setItem('sms-logo', logo)
    else localStorage.removeItem('sms-logo')
  }, [logo, ready])

  // Set the primary accent; secondary auto-derives (lighter) unless given.
  const setAccent = (hex, secondary) => {
    setAccentState(hex)
    setAccent2State(secondary || lighten(hex, 0.22))
  }
  // Set both brand colours explicitly (e.g. from an extracted logo palette).
  const setBrand = (primary, secondary) => {
    setAccentState(primary)
    setAccent2State(secondary || lighten(primary, 0.22))
  }
  const setLogo = (dataUrl) => setLogoState(dataUrl)
  const resetTheme = () => {
    setAccentState(DEFAULT_ACCENT)
    setAccent2State(DEFAULT_ACCENT_2)
    setLogoState(null)
  }

  const currentUser = users.find((u) => u.role === role) || users[0]

  return (
    <AppContext.Provider
      value={{ role, setRole, currentUser, ready, accent, accent2, setAccent, setBrand, logo, setLogo, resetTheme }}
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
