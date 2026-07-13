# Illusio School Management System — Frontend

A **web-first, full-featured** School Management System frontend for a single
school in India, built to the [PRD](./PRD-School-Management-System.md) with
**Next.js (App Router)**, **React**, and the **HugeIcons** round icon set. All
data is **mock/static** ([`lib/mockData.js`](./lib/mockData.js)) — there is no
backend.

## What's included (100% of the PRD module map)

**Four role-based portals** — Admin, Teacher, Student, Parent — with a live role
switcher (top bar + login), per-role grouped navigation and per-role dashboards.

| Module | Roles | Highlights |
|---|---|---|
| **Dashboard** | all | Role-aware KPIs, charts, action items |
| **Features** | all | Role × feature **access matrix** + per-role feature views |
| **Students (SIS)** | admin, teacher | Searchable roster + full record pages |
| **Attendance** | all | Interactive roll-call, reports, leave approvals, history |
| **Gradebook & Exams** | all | CBSE gradebook + CCE report card |
| **Assignments (LMS)** | all | Submissions tracking, Google Classroom sync |
| **Timetable** | all | Colour-coded weekly grid, clash-checked |
| **Admissions** | admin | Applicant funnel (Kanban) |
| **Fees** | admin, parent | Reports + parent pay-online (mock Razorpay) |
| **Library** | admin, teacher, student | Catalog + circulation |
| **Transport** | admin, parent | Routes/occupancy + **animated live bus tracking** with route timeline & ETA (parent) |
| **Hostel** | admin | Room occupancy + mess menu |
| **HR & Payroll** | admin | Staff directory + payroll runs |
| **Analytics & AI** | admin | Trends, subject mastery, AI insights, at-risk detection |
| **Communication** | all | Announcements, messages, calendar |
| **Settings** | admin | **Branding (logo upload + accent-colour picker)**, school config, RBAC matrix, users, integrations |
| **Calendar** | all | Events, exams, holidays and meetings grouped by month |
| **Study Material** | all | Subject-wise notes, slides, worksheets, video lessons |
| **Infractions** | all | Discipline records (students/parents see their own) |
| **Food Menu** | all | Weekly canteen menu with today highlighted |
| **Lost & Found** | all | Found-items registry with claim status |
| **Gallery** | all | Event photo albums |
| **My Account** | all | Profile, security (MFA/SSO), notification preferences |
| **Login** | — | Portal picker, Google sign-in, MFA note |

The parent/student portals use friendly labels (My Attendance, My Homework,
My Time-Table, Issue/Return Book, Map View, Communicate) and the transport
**Map View** embeds a **live GPS tracker** (IOPGPS device share link) with an
open-in-new-tab fallback for trackers that block embedding.

Admins **upload a school logo** in *Settings → Branding & Theme* and the app
**automatically extracts the brand colours from the logo** (via canvas pixel
sampling) — the two most prominent colours become the theme's primary + gradient
partner and apply across the whole app instantly (sidebar, login, buttons, icons,
chart gradients). Tap any extracted swatch to switch the primary. Persisted in
localStorage.

Every icon in the app is a **HugeIcons** glyph (no emoji), routed through a
single semantic registry. India context throughout: CBSE grading, ₹/INR, DPDP
consent & data-residency, Razorpay, WhatsApp/SMS channels. Fully responsive
(collapsible mobile sidebar).

## Shared component library

Reusable primitives live in [`components/ui/`](./components/ui) and are consumed
across every page via a single barrel import:

```jsx
import { Card, Kpi, Badge, Table, Button, Icon, Glyph, Modal, inr } from '@/components/ui'
```

| File | Exports |
|---|---|
| `Icon.jsx` | `Icon` (huge **round** icon badge), `Glyph` (bare icon) |
| `icons.js` | semantic icon registry → HugeIcons glyphs |
| `Kpi.jsx` | stat tile with round icon + trend |
| `Card.jsx` · `Button.jsx` · `Badge.jsx` · `Avatar.jsx` | layout & status primitives |
| `Table.jsx` | declarative column/row table |
| `BarChart.jsx` | `BarChart`, `LineChart` |
| `Progress.jsx` | `Bar`, `Ring` |
| `Modal.jsx` · `Field.jsx` | dialog + form inputs (`Input`, `Select`, `SearchInput`…) |
| `misc.jsx` | `PageHeader`, `Tabs`, `Pill`, `EmptyState`, `Stat` |
| `format.js` | `inr`, `initials`, `fmtDate` |

Icons come from **HugeIcons** (`@hugeicons/react` + `@hugeicons/core-free-icons`),
mapped through `lib`/`components/ui/icons.js` so a glyph can be swapped in one place.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000  (lands on /login)
```

```bash
npm run build && npm start   # production
```

## Try the demo

1. On **/login**, pick a portal (Administrator / Teacher / Student / Parent) and sign in.
2. Use the **role switcher** in the top bar to jump between portals live — the
   sidebar, dashboard and available modules change per role.
3. As **Teacher** → *Attendance* mark roll-call; *Gradebook*; *Assignments*.
4. As **Parent** → *Fees* click **Pay now** (mock Razorpay); *Transport* live bus.
5. As **Admin** → *Analytics & AI*, *HR & Payroll*, *Settings → Roles & Access*.

## Project structure

```
app/
  login/               portal picker / sign-in
  (portal)/            role-gated portal routes (shared sidebar/topbar shell)
    dashboard/ students/ attendance/ gradebook/ assignments/ timetable/
    admissions/ fees/ library/ transport/ hostel/ hr/ analytics/
    communication/ settings/
  layout.jsx globals.css
components/
  ui/                  shared component library (barrel: @/components/ui)
  Sidebar.jsx Topbar.jsx PortalShell.jsx AppContext.jsx
lib/
  mockData.js          all fabricated demo data
  nav.js               grouped, per-role navigation config
```

> This is a **frontend prototype with mock data** for review and demos — no real
> authentication, payments, or persistence.
