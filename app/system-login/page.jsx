'use client'

// Hidden platform console login — reachable only by direct URL (/system-login).
// Not linked from the school login. OTP-based, same MSG91 flow.
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/components/AppContext'
import { Glyph, Button, Field, Input } from '@/components/ui'

const DEMO_OTP = '4321'

export default function SystemLoginPage() {
  const router = useRouter()
  const { setRole } = useApp()

  const [phone, setPhone] = useState('+91 90000 00001')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [err, setErr] = useState('')

  const sendOtp = (e) => { e.preventDefault(); setErr(''); setOtp(DEMO_OTP); setOtpSent(true) }
  const verify = (e) => {
    e.preventDefault()
    if (!/^\d{4,6}$/.test(otp)) { setErr('Enter the OTP sent to your phone'); return }
    setRole('system')
    router.push('/dashboard')
  }

  return (
    <div className="sys-wrap">
      <div className="sys-card">
        <div className="sys-badge"><Glyph name="settings" size={26} color="#fff" /></div>
        <h1>Platform Console</h1>
        <p className="sys-sub">Scholr System Administration · restricted access</p>

        <div className="sys-panel">
          <form onSubmit={otpSent ? verify : sendOtp}>
            <Field label="Admin mobile number">
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={otpSent} />
            </Field>
            {otpSent && (
              <Field label="Enter OTP">
                <Input type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)}
                  placeholder="4-digit code" style={{ letterSpacing: 6, fontWeight: 700 }} />
              </Field>
            )}
            {err && <p style={{ color: '#fca5a5', fontSize: 12, marginBottom: 8 }}>{err}</p>}
            {otpSent && (
              <div className="sys-note">
                <Glyph name="sms" size={14} /> OTP sent via <b>MSG91</b>. <span style={{ opacity: 0.7 }}>Demo code: {DEMO_OTP}</span>
                <button type="button" className="sys-link" onClick={() => setOtpSent(false)}>Change number</button>
              </div>
            )}
            <Button variant="primary" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
              {otpSent ? 'Verify & enter Console' : 'Send OTP'}
            </Button>
          </form>
        </div>
        <p className="sys-foot">Authorised platform administrators only · all access is logged.</p>
      </div>

      <style jsx>{`
        .sys-wrap { min-height: 100vh; display: grid; place-items: center; padding: 24px;
          background: radial-gradient(900px 500px at 50% -10%, #2b2f52, #121426 60%); }
        .sys-card { width: 100%; max-width: 400px; text-align: center; color: #e7e9f5; }
        .sys-badge { width: 60px; height: 60px; border-radius: 16px; margin: 0 auto 16px;
          display: grid; place-items: center; background: linear-gradient(135deg, #4F46E5, #7C3AED);
          box-shadow: 0 10px 30px rgba(79,70,229,0.45); }
        .sys-card h1 { font-size: 22px; font-weight: 800; letter-spacing: -0.4px; }
        .sys-sub { color: #9aa0c0; font-size: 12.5px; margin-top: 4px; margin-bottom: 20px; }
        .sys-panel { background: #1b1e33; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 22px; text-align: left; }
        .sys-panel :global(label) { color: #b6bad4; }
        .sys-panel :global(.ui-input) { background: #12142a; border-color: rgba(255,255,255,0.12); color: #fff; }
        .sys-note { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; font-size: 11.5px; color: #b6bad4;
          background: #12142a; border: 1px solid rgba(255,255,255,0.1); border-radius: 9px; padding: 8px 10px; margin-bottom: 10px; }
        .sys-link { border: none; background: none; color: #a5b4fc; font-weight: 600; font-size: 11.5px; margin-left: auto; }
        .sys-foot { color: #6f7592; font-size: 11px; margin-top: 16px; }
      `}</style>
    </div>
  )
}
