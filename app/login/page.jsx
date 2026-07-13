'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/components/AppContext'
import { Glyph, Button, Field, Input } from '@/components/ui'
import { BrandGlyph } from '@/components/BrandMark'
import { ROLE_LABELS, ROLE_ICON } from '@/lib/nav'
import { school } from '@/lib/mockData'

const SCHOOL_ROLES = ['admin', 'teacher', 'student', 'parent', 'finance']
const DEMO_OTP = '4321'

export default function LoginPage() {
  const router = useRouter()
  const { setRole, logo } = useApp()
  const [picked, setPicked] = useState('admin')

  const [phone, setPhone] = useState('+91 98765 43210')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [otpErr, setOtpErr] = useState('')

  const go = (role) => { setRole(role); router.push('/dashboard') }
  const sendOtp = (e) => { e.preventDefault(); setOtpErr(''); setOtp(DEMO_OTP); setOtpSent(true) }
  const verifyOtp = (e) => {
    e.preventDefault()
    if (!/^\d{4,6}$/.test(otp)) { setOtpErr('Enter the OTP sent to your phone'); return }
    go(picked)
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-logo">
            {logo ? <img src={logo} alt="School logo" /> : <BrandGlyph size={28} />}
          </span>
          <div>
            <b>Scholr <span style={{ fontWeight: 500, color: 'var(--text-faint)', fontSize: 12 }}>by Finvera</span></b>
            <div className="muted" style={{ fontSize: 12.5 }}>{school.name} · {school.board}</div>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 19, marginBottom: 2 }}>Sign in</h2>
          <p className="muted" style={{ fontSize: 13, marginBottom: 14 }}>Choose a portal, then sign in with a one-time password.</p>

          <div className="role-grid five">
            {SCHOOL_ROLES.map((r) => (
              <button key={r} type="button" className={`role-tile ${picked === r ? 'on' : ''}`}
                onClick={() => { setPicked(r); setOtpSent(false) }}>
                <Glyph name={ROLE_ICON[r]} size={20} />
                <span>{shortRole(r)}</span>
              </button>
            ))}
          </div>

          <form onSubmit={otpSent ? verifyOtp : sendOtp} style={{ marginTop: 16 }}>
            <Field label="Mobile number">
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={otpSent} />
            </Field>
            {otpSent && (
              <Field label="Enter OTP">
                <Input type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="4-digit code" style={{ letterSpacing: 6, fontWeight: 700 }} />
              </Field>
            )}
            {otpErr && <p style={{ color: 'var(--red)', fontSize: 12, marginBottom: 8 }}>{otpErr}</p>}
            {otpSent && (
              <div className="otp-note">
                <Glyph name="sms" size={14} /> OTP sent via <b>MSG91</b> to {phone}. <span className="muted">Demo code: {DEMO_OTP}</span>
                <button type="button" className="linkish" onClick={() => setOtpSent(false)}>Change number</button>
              </div>
            )}
            <Button variant="primary" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
              {otpSent ? `Verify & sign in as ${ROLE_LABELS[picked]}` : 'Send OTP'}
            </Button>
          </form>

          <p className="faint" style={{ fontSize: 11, textAlign: 'center', marginTop: 14 }}>
            Demo only · secure OTP via MSG91. MFA available for staff.
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; justify-content: center; }
        .login-brand b { font-size: 17px; }
        .login-logo { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); display: grid; place-items: center; overflow: hidden; }
        .login-logo :global(img) { width: 100%; height: 100%; object-fit: cover; }
        .role-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .role-tile { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 6px; border: 1px solid var(--border); border-radius: 11px; background: var(--surface); font-weight: 600; font-size: 12px; color: var(--text-soft); }
        .role-tile.on { border-color: var(--accent); background: var(--accent-soft); color: var(--accent); }
        .otp-note { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; font-size: 11.5px; color: var(--text-soft); background: var(--surface-2); border: 1px solid var(--border); border-radius: 9px; padding: 8px 10px; margin-bottom: 10px; }
        .linkish { border: none; background: none; color: var(--accent); font-weight: 600; font-size: 11.5px; margin-left: auto; }
      `}</style>
    </div>
  )
}

function shortRole(r) {
  return { admin: 'Admin', teacher: 'Teacher', student: 'Student', parent: 'Parent', finance: 'Finance' }[r]
}
