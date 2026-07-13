'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BrandGlyph } from '@/components/BrandMark'
import { Glyph, Icon, toast, Toaster } from '@/components/ui'

const MODULES = [
  ['students', 'Student Records (SIS)'], ['admissions', 'Admissions'], ['attendance', 'Attendance'],
  ['gradebook', 'Gradebook & Exams'], ['assignments', 'Assignments (LMS)'], ['timetable', 'Timetable'],
  ['fees', 'Fees & Razorpay'], ['library', 'Library'], ['transport', 'Transport · Live GPS'],
  ['hostel', 'Hostel'], ['hr', 'HR & Payroll'], ['communication', 'Communication'],
  ['studyMaterial', 'Study Material'], ['analytics', 'Analytics & AI'], ['building', 'Multi-branch'],
]

const PAINS = [
  ['Scattered spreadsheets', 'One central Student Information System — a single source of truth.'],
  ['Manual attendance & marks', 'Digital roll-call, auto-calculated CBSE grades and one-click report cards.'],
  ['Chasing fees', 'Online Razorpay payments, auto WhatsApp/SMS reminders and defaulter reports.'],
  ['Parents in the dark', 'A parent portal + WhatsApp: grades, attendance, fees and live bus tracking.'],
  ['Compliance risk', 'DPDP-ready: verifiable consent, India data residency, audit logs, RBAC.'],
  ['At-risk students spotted late', 'Analytics & AI flag at-risk students 6–8 weeks earlier.'],
]

export default function Landing() {
  const [menu, setMenu] = useState(false)
  const submit = (e) => { e.preventDefault(); toast('Thanks! Our team will reach out shortly.', 'green'); e.target.reset() }

  return (
    <div className="lp">
      {/* nav */}
      <header className="lp-nav">
        <Link href="/" className="lp-brand">
          <span className="lp-mark"><BrandGlyph size={22} /></span>
          <span>Scholr <small>by Finvera</small></span>
        </Link>
        <nav className={`lp-links ${menu ? 'open' : ''}`}>
          <a href="#modules" onClick={() => setMenu(false)}>Modules</a>
          <a href="#why" onClick={() => setMenu(false)}>Why Scholr</a>
          <a href="#domains" onClick={() => setMenu(false)}>For schools</a>
          <a href="#contact" onClick={() => setMenu(false)}>Contact</a>
          <Link href="/login" className="lp-btn ghost">Sign in</Link>
          <a href="#contact" className="lp-btn primary">Book a demo</a>
        </nav>
        <button className="lp-burger" onClick={() => setMenu((v) => !v)} aria-label="Menu"><Glyph name="menu" size={22} /></button>
      </header>

      {/* hero */}
      <section className="lp-hero">
        <div className="lp-hero-in">
          <span className="lp-chip">School Management System · India</span>
          <h1>One platform to run<br />your entire school.</h1>
          <p>Admissions to analytics — web-first, privacy-first and DPDP-compliant. Built for administrators, teachers, students and parents, across every branch.</p>
          <div className="lp-cta">
            <a href="#contact" className="lp-btn primary lg">Book a demo <Glyph name="arrowUp" size={15} style={{ transform: 'rotate(90deg)' }} /></a>
            <Link href="/login" className="lp-btn light lg">Sign in</Link>
          </div>
          <div className="lp-stats">
            <div><b>15+</b><span>Integrated modules</span></div>
            <div><b>4</b><span>Role-based portals</span></div>
            <div><b>99.9%</b><span>Target uptime</span></div>
            <div><b>DPDP</b><span>2023 compliant</span></div>
          </div>
        </div>
      </section>

      {/* pains */}
      <section className="lp-sec" id="why">
        <div className="lp-eyebrow">Why Scholr</div>
        <h2>Every school feels these. Scholr fixes them.</h2>
        <div className="lp-pains">
          {PAINS.map(([p, s], i) => (
            <div className="lp-pain" key={i}>
              <div className="lp-pain-h"><span className="lp-x"><Glyph name="cross" size={14} color="#fff" /></span>{p}</div>
              <div className="lp-pain-s"><Glyph name="check" size={15} color="var(--green)" /> {s}</div>
            </div>
          ))}
        </div>
      </section>

      {/* modules */}
      <section className="lp-sec alt" id="modules">
        <div className="lp-eyebrow">The platform</div>
        <h2>15+ modules, one login.</h2>
        <div className="lp-mods">
          {MODULES.map(([icon, name]) => (
            <div className="lp-mod" key={name}>
              <Icon name={icon} tone="accent" size="sm" />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* highlights */}
      <section className="lp-sec">
        <div className="lp-eyebrow">Highlights</div>
        <h2>Built for Indian schools.</h2>
        <div className="lp-hi">
          {[
            ['fees', 'Online fees with Razorpay', 'UPI, cards, net-banking. Auto WhatsApp/SMS reminders and digital receipts.'],
            ['transport', 'Live bus tracking', 'Parents follow the bus in real time with ETA and driver contact.'],
            ['analytics', 'Analytics & AI', 'Trends and early-warning insight to help at-risk students in time.'],
            ['admin', 'DPDP by design', 'Verifiable consent, India data residency, audit logs and least-privilege access.'],
            ['building', 'Multi-branch', 'Run every campus from one place, with branch-wise fees and finance.'],
            ['sms', 'OTP login (MSG91)', 'Passwordless one-time-password sign-in for staff, students and parents.'],
          ].map(([icon, t, d]) => (
            <div className="lp-hicard" key={t}>
              <Icon name={icon} tone="accent" size="md" />
              <b>{t}</b>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* domains */}
      <section className="lp-sec alt" id="domains">
        <div className="lp-eyebrow">For schools</div>
        <h2>Your school, your own domain.</h2>
        <p className="lp-lead">Every school runs on its own web address and its own isolated database — one platform, many schools.</p>
        <div className="lp-domains">
          <div className="lp-dcard">
            <span className="lp-num">1</span><b>Pick your address</b>
            <span>Get a Scholr subdomain like <code>greenwood.scholr.app</code>, or connect your own domain such as <code>portal.greenwood.edu.in</code>.</span>
          </div>
          <div className="lp-dcard">
            <span className="lp-num">2</span><b>Point DNS</b>
            <span>Add a simple CNAME from your subdomain to Scholr. We issue the SSL certificate automatically.</span>
          </div>
          <div className="lp-dcard">
            <span className="lp-num">3</span><b>Isolated & branded</b>
            <span>Visiting your domain loads <em>your</em> school — your logo, colours and data, in your own database. No one else’s data is ever reachable.</span>
          </div>
        </div>
      </section>

      {/* contact / CTA */}
      <section className="lp-cta-band" id="contact">
        <div className="lp-cta-in">
          <div>
            <h2>Ready to modernise your school?</h2>
            <p>Tell us about your school and we’ll set up a personalised demo — across all your branches.</p>
            <div className="lp-cta-meta"><Glyph name="mail" size={15} /> hello@finvera.example · <Glyph name="sms" size={15} /> +91 90000 00000</div>
          </div>
          <form className="lp-form" onSubmit={submit}>
            <input required placeholder="School name" />
            <input required type="text" placeholder="Your name" />
            <input required type="tel" placeholder="Mobile number" />
            <button className="lp-btn primary" type="submit">Request a demo</button>
          </form>
        </div>
      </section>

      {/* footer */}
      <footer className="lp-foot">
        <div className="lp-brand"><span className="lp-mark sm"><BrandGlyph size={18} /></span> Scholr <small>by Finvera</small></div>
        <span>© 2026 Finvera · School Management System · Made in India</span>
        <div className="lp-foot-links"><Link href="/login">School login</Link><a href="#modules">Modules</a><a href="#domains">For schools</a></div>
      </footer>

      <Toaster />
      <LandingStyles />
    </div>
  )
}

function LandingStyles() {
  return (
    <style jsx global>{`
      .lp { background: var(--surface); }
      .lp-btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 16px; border-radius: 10px; font-weight: 700; font-size: 13.5px; border: 1px solid transparent; }
      .lp-btn.primary { background: var(--accent); color: #fff; }
      .lp-btn.ghost { color: var(--text); }
      .lp-btn.light { background: #fff; color: var(--accent); }
      .lp-btn.lg { padding: 12px 22px; font-size: 15px; }

      .lp-nav { position: sticky; top: 0; z-index: 30; display: flex; align-items: center; justify-content: space-between;
        padding: 14px 40px; background: rgba(255,255,255,0.85); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
      .lp-brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 17px; color: var(--ink, #141726); }
      .lp-brand small { font-weight: 500; font-size: 11px; color: var(--text-faint); }
      .lp-mark { width: 34px; height: 34px; border-radius: 9px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); display: grid; place-items: center; }
      .lp-mark.sm { width: 28px; height: 28px; border-radius: 8px; }
      .lp-links { display: flex; align-items: center; gap: 22px; }
      .lp-links a { font-weight: 600; font-size: 14px; color: var(--text-soft); }
      .lp-links a:hover { color: var(--text); }
      .lp-links a.lp-btn { color: inherit; }
      .lp-burger { display: none; background: none; border: none; }

      .lp-hero { background:
        radial-gradient(1000px 520px at 82% -10%, rgba(124,58,237,.55), transparent 60%),
        radial-gradient(760px 520px at -5% 120%, rgba(16,185,129,.28), transparent 55%),
        linear-gradient(150deg, #4F46E5, #4338CA 55%, #312E81); color: #fff; }
      .lp-hero-in { max-width: 1080px; margin: 0 auto; padding: 96px 40px 104px; }
      .lp-chip { display: inline-block; padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 700; letter-spacing: .5px; background: rgba(255,255,255,.16); }
      .lp-hero h1 { font-size: 58px; font-weight: 800; letter-spacing: -2px; line-height: 1.03; margin: 20px 0 16px; }
      .lp-hero p { font-size: 18px; max-width: 640px; opacity: .92; line-height: 1.55; }
      .lp-cta { display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
      .lp-stats { display: flex; gap: 44px; margin-top: 48px; flex-wrap: wrap; }
      .lp-stats b { font-size: 30px; font-weight: 800; display: block; }
      .lp-stats span { font-size: 12.5px; opacity: .85; }

      .lp-sec { max-width: 1080px; margin: 0 auto; padding: 80px 40px; }
      .lp-sec.alt { max-width: none; background: var(--surface-2); border-block: 1px solid var(--border); }
      .lp-sec.alt > * { max-width: 1080px; margin-inline: auto; }
      .lp-eyebrow { font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--accent); }
      .lp-sec h2 { font-size: 32px; font-weight: 800; letter-spacing: -.6px; margin: 8px 0 6px; }
      .lp-lead { color: var(--text-soft); max-width: 640px; margin-bottom: 8px; }

      .lp-pains { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 30px; }
      .lp-pain { border: 1px solid var(--border); border-radius: 14px; padding: 18px; background: var(--surface); }
      .lp-pain-h { display: flex; align-items: center; gap: 9px; font-weight: 700; font-size: 15px; margin-bottom: 8px; }
      .lp-x { width: 22px; height: 22px; border-radius: 50%; background: var(--red); display: grid; place-items: center; flex: 0 0 auto; }
      .lp-pain-s { display: flex; gap: 8px; font-size: 13.5px; color: var(--text-soft); }

      .lp-mods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 30px; }
      .lp-mod { display: flex; align-items: center; gap: 11px; padding: 13px 16px; border: 1px solid var(--border); border-radius: 12px; background: var(--surface); font-weight: 650; font-size: 14px; }

      .lp-hi { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 30px; }
      .lp-hicard { display: flex; flex-direction: column; gap: 8px; padding: 20px; border: 1px solid var(--border); border-radius: 14px; background: var(--surface); }
      .lp-hicard b { font-size: 15.5px; }
      .lp-hicard span { font-size: 13.5px; color: var(--text-soft); }

      .lp-domains { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 30px; }
      .lp-dcard { border: 1px solid var(--border); border-radius: 14px; padding: 20px; background: var(--surface); display: flex; flex-direction: column; gap: 8px; }
      .lp-num { width: 30px; height: 30px; border-radius: 9px; background: var(--accent-soft); color: var(--accent); font-weight: 800; display: grid; place-items: center; }
      .lp-dcard b { font-size: 15.5px; }
      .lp-dcard span { font-size: 13.5px; color: var(--text-soft); line-height: 1.5; }
      .lp-dcard code { background: var(--surface-2); border: 1px solid var(--border); border-radius: 6px; padding: 1px 6px; font-size: 12.5px; color: var(--accent); }

      .lp-cta-band { background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #fff; }
      .lp-cta-in { max-width: 1080px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: center; }
      .lp-cta-in h2 { font-size: 30px; font-weight: 800; letter-spacing: -.5px; }
      .lp-cta-in p { opacity: .92; margin-top: 8px; max-width: 440px; }
      .lp-cta-meta { display: flex; align-items: center; gap: 8px; font-size: 13px; margin-top: 16px; opacity: .9; }
      .lp-form { background: #fff; border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 10px; box-shadow: var(--shadow-lg); }
      .lp-form input { padding: 12px 14px; border: 1px solid var(--border); border-radius: 10px; font-size: 14px; font-family: inherit; }
      .lp-form .lp-btn { justify-content: center; padding: 12px; }

      .lp-foot { display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
        max-width: 1080px; margin: 0 auto; padding: 30px 40px; color: var(--text-soft); font-size: 13px; }
      .lp-foot-links { display: flex; gap: 18px; }
      .lp-foot-links a:hover { color: var(--text); }

      @media (max-width: 860px) {
        .lp-nav { padding: 12px 18px; }
        .lp-burger { display: block; }
        .lp-links { display: none; position: absolute; top: 60px; right: 18px; left: 18px; flex-direction: column; align-items: stretch; gap: 10px;
          background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 16px; box-shadow: var(--shadow-lg); }
        .lp-links.open { display: flex; }
        .lp-hero-in { padding: 60px 20px 68px; }
        .lp-hero h1 { font-size: 38px; }
        .lp-sec { padding: 52px 20px; }
        .lp-pains, .lp-mods, .lp-hi, .lp-domains { grid-template-columns: 1fr; }
        .lp-cta-in { grid-template-columns: 1fr; padding: 44px 20px; }
        .lp-stats { gap: 26px; }
      }
    `}</style>
  )
}
