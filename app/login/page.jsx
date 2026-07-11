'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '@/components/AppContext'
import { Glyph, Button, Field, Input } from '@/components/ui'
import { ROLE_LABELS, ROLE_ICON } from '@/lib/nav'
import { school } from '@/lib/mockData'

const ROLES = ['admin', 'teacher', 'student', 'parent']

export default function LoginPage() {
  const router = useRouter()
  const { setRole } = useApp()
  const [picked, setPicked] = useState('admin')

  const signIn = (e) => {
    e.preventDefault()
    setRole(picked)
    router.push('/dashboard')
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-brand">
          <span className="login-logo"><Glyph name="school" size={26} color="#fff" strokeWidth={2} /></span>
          <div>
            <b>Illusio SMS</b>
            <div className="muted" style={{ fontSize: 12.5 }}>{school.name} · {school.board}</div>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 19, marginBottom: 2 }}>Sign in</h2>
          <p className="muted" style={{ fontSize: 13, marginBottom: 18 }}>Choose a portal to explore the demo.</p>

          <div className="role-grid">
            {ROLES.map((r) => (
              <button key={r} type="button" className={`role-tile ${picked === r ? 'on' : ''}`} onClick={() => setPicked(r)}>
                <Glyph name={ROLE_ICON[r]} size={22} />
                <span>{ROLE_LABELS[r]}</span>
              </button>
            ))}
          </div>

          <form onSubmit={signIn} style={{ marginTop: 18 }}>
            <Field label="Email or phone">
              <Input type="text" defaultValue={demoEmail(picked)} />
            </Field>
            <Field label="Password">
              <Input type="password" defaultValue="demo1234" />
            </Field>
            <Button variant="primary" type="submit" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
              Sign in as {ROLE_LABELS[picked]}
            </Button>
          </form>

          <div className="or"><span>or</span></div>
          <Button style={{ width: '100%', justifyContent: 'center' }} onClick={signIn}>
            <Glyph name="badge" size={16} /> Continue with Google
          </Button>
          <p className="faint" style={{ fontSize: 11, textAlign: 'center', marginTop: 14 }}>
            Demo only · no real authentication. MFA available for staff.
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; justify-content: center; }
        .login-brand b { font-size: 17px; }
        .login-logo { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, var(--accent), #7c74f0); display: grid; place-items: center; }
        .role-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .role-tile { display: flex; flex-direction: column; align-items: center; gap: 7px; padding: 14px 8px; border: 1px solid var(--border); border-radius: 11px; background: var(--surface); font-weight: 600; font-size: 13px; color: var(--text-soft); }
        .role-tile.on { border-color: var(--accent); background: var(--accent-soft); color: var(--accent); }
        .or { display: flex; align-items: center; gap: 12px; margin: 16px 0; color: var(--text-faint); font-size: 12px; }
        .or::before, .or::after { content: ''; flex: 1; height: 1px; background: var(--border); }
      `}</style>
    </div>
  )
}

function demoEmail(role) {
  return {
    admin: 'priya.nair@illusio.edu.in',
    teacher: 'rahul.d@illusio.edu.in',
    student: 'aarav.m@illusio.edu.in',
    parent: 'sunita.mehta@gmail.com',
  }[role]
}
