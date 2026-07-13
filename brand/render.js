// Renders the brand brochure to PDF and exports PNG logos.
// Run: NODE_PATH=$(npm root -g) node brand/render.js
const fs = require('fs')
const { chromium } = require('playwright')

const ROOT = process.cwd()
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'

// White mortarboard glyph (sits on the gradient .mark container).
const mark = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M196 250 L316 250 L316 300 Q316 334 256 334 Q196 334 196 300 Z" fill="#ffffff" opacity="0.72"/><path d="M256 150 L406 214 L256 278 L106 214 Z" fill="#ffffff"/><circle cx="256" cy="214" r="14" fill="rgba(15,18,40,0.25)"/><path d="M406 214 L406 308" stroke="#ffffff" stroke-width="9" stroke-linecap="round"/><circle cx="406" cy="322" r="16" fill="#10B981"/></svg>`

const modules = [
  { k: 'S', c: '#4F46E5', n: 'Student Records (SIS)', d: 'Central database of every student — the backbone of the platform.' },
  { k: 'A', c: '#7C3AED', n: 'Admissions', d: 'Online applications and the funnel through to enrollment.' },
  { k: '✓', c: '#0D9488', n: 'Attendance', d: 'Roll-call, absence alerts, reports and a leave workflow.' },
  { k: 'G', c: '#D97706', n: 'Gradebook & Exams', d: 'CBSE grades, CCE report cards and marksheets.' },
  { k: 'H', c: '#DB2777', n: 'Assignments (LMS)', d: 'Homework and submissions, synced with Google Classroom.' },
  { k: 'T', c: '#2563EB', n: 'Timetable', d: 'Class & teacher schedules with clash detection.' },
  { k: '₹', c: '#16A34A', n: 'Fees', d: 'Online payment via Razorpay — UPI, cards, net banking.' },
  { k: 'L', c: '#0891B2', n: 'Library', d: 'Catalog, issue / return and member history.' },
  { k: '◉', c: '#4F46E5', n: 'Transport', d: 'Routes, occupancy and live GPS bus tracking.' },
  { k: 'D', c: '#7C3AED', n: 'Hostel', d: 'Room allocation, occupancy and mess management.' },
  { k: 'P', c: '#D97706', n: 'HR & Payroll', d: 'Staff records, attendance and monthly payroll.' },
  { k: 'C', c: '#DB2777', n: 'Communication', d: 'Announcements & chat over WhatsApp, SMS and email.' },
  { k: 'M', c: '#0D9488', n: 'Study Material', d: 'Notes, slides, worksheets and video lessons.' },
  { k: '◆', c: '#4F46E5', n: 'Analytics & AI', d: 'Trends and AI-assisted early intervention.' },
  { k: '⚙', c: '#5B6178', n: 'Settings & RBAC', d: 'School config, users, branding and integrations.' },
]
const modHtml = modules.map((m) =>
  `<div class="mod"><span class="mi" style="background:${m.c}">${m.k}</span><div><b>${m.n}</b><p class="muted">${m.d}</p></div></div>`
).join('')

// Pain point → what Scholr does (sales talking-points)
const pains = [
  { pain: 'Data scattered across spreadsheets', pd: 'Students, grades and fees sit in separate files — no single, trusted record.', mod: 'Student Records (SIS)', fix: 'One source of truth', fd: 'Every student’s profile, academics, health and history in one secure database.' },
  { pain: 'Hours lost on attendance & marks', pd: 'Paper registers and hand-calculated report cards eat staff time and add errors.', mod: 'Attendance + Gradebook', fix: 'Automated in minutes', fd: 'Digital roll-call, auto-calculated CBSE grades and one-click board report cards.' },
  { pain: 'Fees are hard to collect & track', pd: 'Manual reconciliation, cash handling and endless follow-up for dues.', mod: 'Fees · Razorpay', fix: 'Pay online, chase automatically', fd: 'UPI / cards / net-banking, digital receipts, auto WhatsApp–SMS reminders and defaulter reports.' },
  { pain: 'Parents are kept in the dark', pd: 'They call or visit the office to learn about grades, attendance and fees.', mod: 'Parent Portal · WhatsApp', fix: '24×7 self-service', fd: 'Grades, attendance, fees and announcements on their phone — WhatsApp-first.' },
  { pain: 'Bus-safety worry every morning', pd: 'Parents don’t know where the bus is or when it will reach their stop.', mod: 'Transport · Live GPS', fix: 'Live tracking + ETA', fd: 'Real-time bus location, ETA to their stop and one-tap driver contact.' },
  { pain: 'Compliance & data-privacy exposure', pd: 'DPDP Act 2023 penalties reach ₹200 crore for mishandling children’s data.', mod: 'Security · DPDP', fix: 'Compliant by design', fd: 'Verifiable parental consent, India data residency, audit logs and role-based access.' },
  { pain: 'At-risk students spotted too late', pd: 'Weak performance and dropout risk only surface at exam time.', mod: 'Analytics & AI', fix: 'Early-warning insight', fd: 'Flags at-risk students 6–8 weeks earlier for timely, targeted intervention.' },
]
const painHtml = pains.map((p) =>
  `<div class="pain"><div class="p-pain"><span class="lbl">Pain</span><b>${p.pain}</b><p>${p.pd}</p></div><div class="p-arrow">→</div><div class="p-fix"><span class="lbl">${p.mod}</span><b>${p.fix}</b><p>${p.fd}</p></div></div>`
).join('')

let html = fs.readFileSync(`${ROOT}/brand/brochure.html`, 'utf8')
html = html.split('__MARK__').join(mark).split('__MODULES__').join(modHtml).split('__PAINS__').join(painHtml)
fs.writeFileSync(`${ROOT}/brand/brochure.rendered.html`, html)

;(async () => {
  const b = await chromium.launch({ executablePath: CHROME })

  // Brochure PDF
  const p = await b.newPage()
  await p.setContent(html, { waitUntil: 'networkidle' })
  await p.pdf({ path: `${ROOT}/brand/Scholr-Brochure.pdf`, format: 'A4', printBackground: true, preferCSSPageSize: true })
  console.log('✓ brochure PDF')

  // PNG exports of the logos
  const shot = async (svgPath, out, w, h) => {
    const pg = await b.newPage({ viewport: { width: w, height: h } })
    await pg.setContent(`<body style="margin:0">${fs.readFileSync(svgPath, 'utf8')}</body>`, { waitUntil: 'networkidle' })
    await pg.locator('svg').screenshot({ path: out, omitBackground: true })
    await pg.close()
  }
  await shot(`${ROOT}/public/brand/logo-mark.svg`, `${ROOT}/public/brand/logo-mark.png`, 512, 512)
  await shot(`${ROOT}/public/brand/logo-full.svg`, `${ROOT}/public/brand/logo-full.png`, 880, 240)
  console.log('✓ PNG logos')

  // Social / OG preview card (1200×630)
  const og = `<!doctype html><html><head><meta charset="utf-8"><style>
    *{margin:0;box-sizing:border-box;font-family:'Inter','Segoe UI',Arial,sans-serif}
    .og{width:1200px;height:630px;padding:80px;color:#fff;display:flex;flex-direction:column;justify-content:space-between;
      background:radial-gradient(900px 500px at 85% -10%,rgba(124,58,237,.6),transparent 60%),
      radial-gradient(700px 500px at 0% 120%,rgba(16,185,129,.35),transparent 55%),
      linear-gradient(150deg,#4F46E5,#4338CA 55%,#312E81)}
    .row{display:flex;align-items:center;gap:22px}
    .mk{width:96px;height:96px;border-radius:26px;background:linear-gradient(135deg,#4F46E5,#7C3AED);display:flex}
    .mk svg{width:100%;height:100%}
    .wm{font-size:44px;font-weight:800;letter-spacing:-1px}
    .tag{font-size:15px;letter-spacing:5px;opacity:.85;font-weight:600;margin-top:4px}
    h1{font-size:76px;font-weight:800;letter-spacing:-2px;line-height:1.02}
    p{font-size:26px;opacity:.92;margin-top:18px;max-width:900px}
    .pills{display:flex;gap:12px;margin-top:8px}
    .pill{background:rgba(255,255,255,.16);padding:9px 18px;border-radius:999px;font-size:18px;font-weight:700}
  </style></head><body><div class="og">
    <div class="row"><span class="mk">${mark}</span><div><div class="wm">Scholr</div><div class="tag">SCHOOL MANAGEMENT SYSTEM · BY FINVERA</div></div></div>
    <div><h1>One platform to run<br/>your entire school.</h1>
      <p>Admissions to analytics — web-first, privacy-first, DPDP-compliant. For admins, teachers, students &amp; parents.</p></div>
    <div class="pills"><span class="pill">15+ modules</span><span class="pill">4 portals</span><span class="pill">Live bus tracking</span><span class="pill">Razorpay fees</span><span class="pill">Analytics &amp; AI</span></div>
  </div></body></html>`
  const po = await b.newPage({ viewport: { width: 1200, height: 630 } })
  await po.setContent(og, { waitUntil: 'networkidle' })
  await po.screenshot({ path: `${ROOT}/public/brand/og-image.png` })
  await po.close()
  console.log('✓ OG image')

  await b.close()
})().catch((e) => { console.error(e); process.exit(1) })
