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

let html = fs.readFileSync(`${ROOT}/brand/brochure.html`, 'utf8')
html = html.split('__MARK__').join(mark).split('__MODULES__').join(modHtml)
fs.writeFileSync(`${ROOT}/brand/brochure.rendered.html`, html)

;(async () => {
  const b = await chromium.launch({ executablePath: CHROME })

  // Brochure PDF
  const p = await b.newPage()
  await p.setContent(html, { waitUntil: 'networkidle' })
  await p.pdf({ path: `${ROOT}/brand/Illusio-SMS-Brochure.pdf`, format: 'A4', printBackground: true, preferCSSPageSize: true })
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

  await b.close()
})().catch((e) => { console.error(e); process.exit(1) })
