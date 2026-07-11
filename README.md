# Illusio School Management System — Frontend (Mock Data)

Web-first frontend for a **single-school SMS in India**, built to the
[PRD](./PRD-School-Management-System.md). Built with **Next.js (App Router)** and
**React**. All data is **mock/fabricated** — there is no backend; the UI is
wired to static data in [`lib/mockData.js`](./lib/mockData.js).

## Highlights

- **Four role-based portals** — Admin, Teacher, Student, Parent. Switch between
  them live using the role picker in the top bar (persists across refresh).
- **Role-aware navigation & dashboards** — each portal shows only the modules and
  widgets relevant to that role (PRD §8).
- **MVP modules (PRD §7, P0):**
  - **Dashboard** — KPIs, enrollment & attendance charts, fee collection, action items.
  - **Students (SIS)** — searchable/filterable roster + full student record pages.
  - **Admissions** — applicant funnel (Application → Enrolled) as a Kanban board.
  - **Attendance** — interactive teacher roll-call, admin reports, leave approvals,
    student/parent history.
  - **Gradebook & Exams** — CBSE-pattern gradebook, class analytics, and a
    scholastic + co-scholastic (CCE) report card with PDF/publish actions.
  - **Fees** — fee structure, invoices, collection reports, and a parent
    pay-online flow with a mock **Razorpay** checkout (UPI/cards/net banking).
  - **Communication** — announcements (WhatsApp/SMS/email channels), messages,
    and school calendar.
- **Responsive** — works on phones (collapsible sidebar), matching the web-first,
  mobile-friendly requirement (PRD §9.5).
- India context throughout — CBSE grading, INR/₹, DPDP consent notes, WhatsApp.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## Try the demo

1. Open the app — it lands on the **Admin** dashboard.
2. Use the **role picker** in the top-right (Administrator / Teacher / Student /
   Parent) to switch portals. The sidebar, dashboard and pages change per role.
3. As **Teacher**, open *Attendance* and mark roll-call; open *Gradebook*.
4. As **Parent**, open *Fees* and click **Pay now** to see the mock Razorpay flow.

## Project structure

```
app/
  (portal)/            role-gated portal routes (share the sidebar/topbar shell)
    dashboard/         role-aware dashboards
    students/          SIS list + [id] record page
    admissions/        applicant funnel
    attendance/        roll-call, reports, leave requests
    gradebook/         gradebook + report card
    fees/              fee reports + parent pay-online
    communication/     announcements, messages, calendar
  layout.jsx           root layout + AppProvider
  globals.css          design system
components/            Sidebar, Topbar, PortalShell, UI primitives, context
lib/
  mockData.js          all fabricated demo data
  nav.js               per-role navigation config
```

> Note: this is a **frontend prototype with mock data** for review and demos.
> No real authentication, payments, or persistence are implemented.
