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
  const [mode, setMode] = useState('school')       // 'school' | 'system'
  const [picked, setPicked] = useState('admin')
  const [method, setMethod] = useState('password') // 'password' | 'otp'

  // OTP (MSG91) state
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
          {/* mode tabs */}
          <div className="login-tabs">
            <button className={mode === 'school' ? 'on' : ''} onClick={() => setMode('school')}>School Login</button>
            <button className={mode === 'system' ? 'on' : ''} onClick={() => setMode('system')}>
              <Glyph name="settings" size={14} /> System Admin
            </button>
          </div>

          {mode === 'system' ? (
            <SystemLogin onSubmit={() => go('system')} />
          ) : (
            <>
              <p className="muted" style={{ fontSize: 13, marginBottom: 14 }}>Choose a portal, then sign in.</p>
              <div className="role-grid five">
                {SCHOOL_ROLES.map((r) => (
                  <button key={r} type="button" className={`role-tile ${picked === r ? 'on' : ''}`}
                    onClick={() => { setPicked(r); setOtpSent(false) }}>
                    <Glyph name={ROLE_ICON[r]} size={20} />
                    <span>{shortRole(r)}</span>
                  </button>
                ))}
              </div>

              {/* method toggle */}
              <div className="method-toggle">
                <button className={method === 'password' ? 'on' : ''} onClick={() => setMethod('password')}>Password</button>
                <button className={method === 'otp' ? 'on' : ''} onClick={() => setMethod('otp')}>OTP</button>
              </div>

              {method === 'password' ? (
                <form onSubmit={(e) => { e.preventDefault(); go(picked) }}>
                  <Field label="Email or phone"><Input type="text" defaultValue={demoEmail(picked)} /></Field>
                  <Field label="Password"><Input type="password" defaultValue="demo1234" /></Field>
                  <Button variant="primary" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
                    Sign in as {ROLE_LABELS[picked]}
                  </Button>
                </form>
              ) : (
                <form onSubmit={otpSent ? verifyOtp : sendOtp}>
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
              )}

              <div className="or"><span>or</span></div>
              <Button style={{ width: '100%', justifyContent: 'center' }} onClick={() => go(picked)}>
                <Glyph name="badge" size={16} /> Continue with Google
              </Button>
            </>
          )}

          <p className="faint" style={{ fontSize: 11, textAlign: 'center', marginTop: 14 }}>
            Demo only · no real authentication. MFA + MSG91 OTP available for staff.
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; justify-content: center; }
        .login-brand b { font-size: 17px; }
        .login-logo { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); display: grid; place-items: center; overflow: hidden; }
        .login-logo :global(img) { width: 100%; height: 100%; object-fit: cover; }

        .login-tabs { display: flex; gap: 4px; background: var(--surface-2); border: 1px solid var(--border); padding: 4px; border-radius: 11px; margin-bottom: 16px; }
        .login-tabs button { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border: none; background: none; padding: 8px; border-radius: 8px; font-weight: 600; font-size: 13px; color: var(--text-soft); }
        .login-tabs button.on { background: var(--surface); color: var(--text); box-shadow: var(--shadow); }

        .role-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .role-grid.five { grid-template-columns: repeat(3, 1fr); }
        .role-tile { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 6px; border: 1px solid var(--border); border-radius: 11px; background: var(--surface); font-weight: 600; font-size: 12px; color: var(--text-soft); }
        .role-tile.on { border-color: var(--accent); background: var(--accent-soft); color: var(--accent); }

        .method-toggle { display: flex; gap: 4px; background: var(--surface-2); border: 1px solid var(--border); padding: 3px; border-radius: 9px; margin: 14px 0; }
        .method-toggle button { flex: 1; border: none; background: none; padding: 7px; border-radius: 7px; font-weight: 600; font-size: 12.5px; color: var(--text-soft); }
        .method-toggle button.on { background: var(--accent); color: #fff; }

        .otp-note { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; font-size: 11.5px; color: var(--text-soft); background: var(--surface-2); border: 1px solid var(--border); border-radius: 9px; padding: 8px 10px; margin-bottom: 10px; }
        .linkish { border: none; background: none; color: var(--accent); font-weight: 600; font-size: 11.5px; margin-left: auto; }

        .or { display: flex; align-items: center; gap: 12px; margin: 16px 0; color: var(--text-faint); font-size: 12px; }
        .or::before, .or::after { content: ''; flex: 1; height: 1px; background: var(--border); }
      `}</style>
    </div>
  )
}

function SystemLogin({ onSubmit }) {
  return (
    <>
      <div className="sys-hero">
        <Glyph name="settings" size={22} color="var(--accent)" />
        <div>
          <b style={{ fontSize: 14 }}>Platform Console</b>
          <div className="muted" style={{ fontSize: 12 }}>Manage all schools, branches & system logs.</div>
        </div>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit() }} style={{ marginTop: 14 }}>
        <Field label="System admin email"><Input type="email" defaultValue="superadmin@scholr.app" /></Field>
        <Field label="Password"><Input type="password" defaultValue="admin1234" /></Field>
        <Button variant="primary" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
          <Glyph name="settings" size={16} /> Sign in to Console
        </Button>
      </form>
      <style jsx>{`
        .sys-hero { display: flex; align-items: center; gap: 12px; padding: 12px 14px; background: var(--accent-soft); border-radius: 11px; }
      `}</style>
    </>
  )
}

function shortRole(r) {
  return { admin: 'Admin', teacher: 'Teacher', student: 'Student', parent: 'Parent', finance: 'Finance' }[r]
}
function demoEmail(role) {
  return {
    admin: 'priya.nair@greenwood.edu.in',
    teacher: 'rahul.d@greenwood.edu.in',
    student: 'aarav.m@greenwood.edu.in',
    parent: 'sunita.mehta@gmail.com',
    finance: 'anil.finance@greenwood.edu.in',
  }[role]
}
