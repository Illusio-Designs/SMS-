# Product Requirements Document (PRD)
## School Management System (SMS)

| | |
|---|---|
| **Product name** | Illusio School Management System (working title) |
| **Document owner** | IllusioCreative (illusiodesigns@gmail.com) |
| **Version** | 1.1 (Draft) |
| **Last updated** | 2026-07-11 |
| **Status** | Draft for review |

### Scope decisions (confirmed with stakeholder)
| Decision | Choice | Impact |
|---|---|---|
| **Deployment** | **Single school** (not multi-school SaaS) | Single-tenant; simpler role-based access; one database — no multi-tenant complexity |
| **Region** | **India** | Governed by **DPDP Act 2023**; CBSE/ICSE/State-board grading & report cards; INR / UPI payments (Razorpay); WhatsApp + SMS notifications |
| **Platform** | **Web-first** | Responsive web app for all roles now; native mobile apps deferred to a later phase |

---

## 1. Executive Summary

The School Management System (SMS) is a cloud-based, **web-first** platform that
centralizes the academic and administrative operations of **a single school in
India** into one source of truth. It replaces fragmented spreadsheets, paper
registers, and disconnected tools with one integrated system covering admissions,
student records, attendance, grading, fees, timetabling, and communication.

The core of the product is a **Student Information System (SIS)** — a centralized
database of every student's demographic, academic, health, and disciplinary
record — surrounded by role-specific modules and portals for administrators,
teachers, students, and parents.

This document defines the problem, the users, the scope, the feature set, and the
non-functional requirements needed to build a competitive product in the 2026
market, benchmarked against established platforms such as PowerSchool, Infinite
Campus, Fedena, Gradelink, and Classter.

---

## 2. Problem Statement & Motivation

Schools today juggle a growing volume of data and communication across
disconnected tools. This creates recurring pain:

- **Data silos** — student info in one place, grades in another, fees in a third.
  No single source of truth.
- **Manual, error-prone workflows** — paper attendance registers, hand-calculated
  report cards, and manual fee reconciliation waste staff time and introduce errors.
- **Poor parent visibility** — parents rely on phone calls and office visits to
  learn about grades, attendance, or fees.
- **Compliance risk** — in India, student data must be handled under the
  **Digital Personal Data Protection (DPDP) Act 2023**. A "child" is anyone under
  **18**, requiring **verifiable parental consent** and prohibiting profiling and
  targeted advertising of children. Schools act as **Data Fiduciaries**; penalties
  for mishandling children's data reach **₹200 crore**, with full compliance
  expected by **13 May 2027**. Ad-hoc tools (spreadsheets, generic apps) do not
  meet these standards.
- **No actionable insight** — without analytics, at-risk students are identified
  too late. AI-assisted analytics can surface learning gaps 6–8 weeks earlier than
  traditional methods.

**Opportunity:** A modern, integrated, privacy-first SMS reduces administrative
overhead, improves academic outcomes through early intervention, and strengthens
the school–parent relationship.

---

## 3. Goals & Success Metrics

### 3.1 Product Goals
1. Provide a single source of truth for all student and school data.
2. Automate high-volume administrative workflows (attendance, grading, fees).
3. Give every stakeholder self-service access via web and mobile.
4. Meet data-privacy and security regulations from day one.
5. Surface actionable analytics for early intervention.

### 3.2 Success Metrics (KPIs)

| Goal | Metric | Target (first 12 months post-launch) |
|---|---|---|
| Reduce admin workload | Time to record daily attendance | < 2 min per class |
| Reduce admin workload | Time to generate report cards | < 1 day for whole school (from ~1 week) |
| Parent engagement | Monthly active parents on portal/app | ≥ 60% of families |
| Fee efficiency | Fees collected on time | +20% vs. baseline; overdue reduced 30% |
| Data accuracy | Grade/attendance correction requests | < 1% of records |
| Reliability | System uptime | ≥ 99.9% |
| Adoption | Teachers actively using gradebook weekly | ≥ 90% |

---

## 4. Target Users & Personas

| Persona | Role | Primary needs |
|---|---|---|
| **School Administrator / Principal** | Runs the school | Oversight dashboards, reports, staff & student management, configuration |
| **Office / Admin Staff** | Front office, accounts | Admissions, fee collection, records, communication |
| **Teacher** | Classroom instruction | Attendance, gradebook, assignments, class communication |
| **Student** | Learner | Timetable, assignments, grades, announcements |
| **Parent / Guardian** | Oversees child | Grades, attendance, fees, teacher communication |

*(No "Super Admin / SaaS operator" persona — this is a single-school deployment.)*

---

## 5. Competitive & Market Context (Research Summary)

Benchmarking the 2026 market shows a mature feature baseline plus a set of
differentiators:

- **Baseline (table stakes):** SIS, attendance, gradebook/report cards, fee
  collection, timetable, parent/student portal, communication.
- **Expanded modules:** admissions, library, transport tracking, HR & payroll,
  hostel/dormitory, LMS integration, reporting & analytics. (Fedena, for example,
  ships 50+ modules.)
- **2026 differentiators:**
  - **AI-driven insights & predictive analytics** — flag at-risk students,
    forecast pass likelihood, trigger timely interventions.
  - **Mobile-first accessibility** — native apps expected, not optional.
  - **Seamless third-party integrations** — LMS, payment gateways, SSO,
    Google/Microsoft.
  - **Privacy by design** — FERPA/GDPR/COPPA compliance built in.
  - **Cloud-first SaaS** — reliable, scalable, agile infrastructure.

**Positioning:** Deliver the reliable baseline with an exceptional, mobile-first
UX and privacy-first data handling, then differentiate with clean analytics and
easy integrations — rather than competing on raw module count.

---

## 6. Scope

### 6.1 In Scope — MVP (Phase 1)
Modules 1–6 below: SIS/student records, admissions, attendance, gradebook &
exams, fee management, communication, plus the four role-based portals and core
platform (auth, RBAC, dashboards).

### 6.2 In Scope — Later Phases
Timetable/scheduling, library, transport, HR & payroll, hostel, LMS integration,
advanced analytics & AI, **native mobile apps** (web-first for now).

### 6.3 Out of Scope (initial release)
- **Multi-school / multi-tenant SaaS** — this is a single-school deployment.
- **Native mobile apps** — web-first; the responsive web app must work well on phones.
- Full-blown LMS content authoring (integrate with existing LMS instead).
- Financial accounting / general ledger beyond fee management.
- Biometric hardware manufacturing (integrate with existing devices only).

---

## 7. Functional Requirements — Modules

Each module lists its purpose and key requirements. Priority: **P0** = MVP,
**P1** = fast-follow, **P2** = later.

### Module 1 — Student Information System (SIS) / Records `P0`
The centralized student database and the backbone of the whole product.
- Store demographics, contacts, guardians, enrollment history, documents.
- Store academic history, health records, and disciplinary records.
- Unique student ID; class/section/grade assignment; promotion between years.
- Bulk import/export (CSV/Excel); document uploads (birth certificate, ID, etc.).
- Search, filter, and audit trail on all record changes.

### Module 2 — Admissions & Enrollment `P0`
- Online application forms with configurable fields.
- Document collection and applicant tracking through the admissions funnel.
- Merit/waitlist list generation; enrollment confirmation; conversion to SIS record.
- Application fee payment; email/SMS status updates to applicants.

### Module 3 — Attendance `P0`
- Daily and period-wise attendance capture.
- Multiple methods: manual roll-call, QR code, RFID/biometric device integration.
- Automated absence notifications to parents (push/SMS/email).
- Attendance reports per student/class/date range; compliance reporting.
- Leave requests and approval workflow.

### Module 4 — Gradebook, Exams & Report Cards `P0`
- Digital gradebook: teachers enter marks/grades per assessment.
- **India board support:** configurable for **CBSE / ICSE / State board** patterns —
  percentage, CGPA, grade points, and CCE / scholastic + co-scholastic areas.
- Weighted categories, automatic calculation of averages, CGPA and final grades;
  rank calculation.
- Exam/term scheduling (unit tests, mid-terms, finals), mark entry, and moderation.
- **Board-compliant report cards** and marksheets; configurable templates;
  automated PDF export; publish to parent/student portals.

### Module 5 — Fee Management `P0`
- Fee structure setup (tuition, transport, activities), term/installment plans.
- Invoice generation; **online payment in INR via Razorpay** — UPI (PhonePe,
  Google Pay, Paytm, BHIM), net banking, cards, wallets.
- Late-fee calculation, discounts, scholarships, concessions, fines.
- Automated reminders and digital receipts via **WhatsApp / SMS / email**; fee
  status visible alongside academics.
- Financial reports: collected, pending, defaulters, projections.

### Module 6 — Communication & Notifications `P0`
- Announcements (school-wide, class, individual).
- Direct messaging between teachers and parents.
- Multi-channel delivery: in-app, **WhatsApp**, SMS, email (WhatsApp is the primary
  parent channel in India).
- Event calendar and reminders; emergency broadcast.

### Module 7 — Timetable & Scheduling `P1`
- Class/period scheduling; teacher and room allocation.
- Clash detection; substitute-teacher management.
- Personalized timetables per student/teacher.

### Module 8 — Library Management `P1`
- Catalog, check-in/check-out, due dates, fines.
- Student/teacher borrowing history; reservations.

### Module 9 — Transport Management `P1`
- Route and vehicle management; student-to-route assignment.
- GPS tracking / live bus location; pickup-drop notifications.

### Module 10 — HR & Payroll `P2`
- Staff records, leave, attendance, payroll processing.

### Module 11 — Hostel / Dormitory `P2`
- Room allocation, occupancy, mess/meal management.

### Module 12 — LMS Integration & Assignments `P1`
- Assignments, submissions, online resources.
- Integration with existing LMS (Google Classroom, Moodle, etc.).

### Module 13 — Reporting, Analytics & AI `P1 → P2`
- Standard operational reports across all modules.
- Customizable dashboards per role.
- **P2 – AI/predictive:** at-risk student identification, pass-likelihood
  prediction, early learning-gap detection, automated intervention triggers.

---

## 8. Role-Based Portals (Functional Requirements)

### 8.1 Admin Portal `P0`
Full configuration, user & role management, all modules, school-wide dashboards
and reports.

### 8.2 Teacher Portal `P0`
Take attendance, manage gradebook, post assignments/announcements, view class
rosters, message parents.

### 8.3 Student Portal `P0`
View timetable, assignments, grades, attendance, announcements, fee status.

### 8.4 Parent Portal `P0`
View child's grades, attendance, fees (and pay online), announcements; message
teachers; multi-child support under one login.

---

## 9. Non-Functional Requirements (NFRs)

### 9.1 Security & Privacy `P0`
- **DPDP Act 2023 compliance (India):** the school is a **Data Fiduciary**.
  - **Verifiable parental consent** for every student (all under 18), e.g. via
    OTP to the parent's registered mobile.
  - **No behavioural tracking, profiling, or targeted advertising of children;**
    avoid analytics that unfairly label students (e.g. "low potential").
  - Purpose limitation, data minimization, transparency on any third-party sharing.
  - Breach-reporting process; data-principal rights (access, correction, erasure).
  - **Data localization:** host student data in India.
- Encryption in transit (TLS) and at rest.
- Full audit logging of sensitive-data access and changes.
- Regular security audits and vulnerability scanning.

### 9.2 Access Control `P0`
- **Role-Based Access Control (RBAC)** — roles: admin, office staff, teacher,
  student, parent (single-school, so no cross-tenant scoping needed).
- Enforcement at service (business-logic) and data layers; least-privilege by default.
- Login via email/phone + password; **Google sign-in** and optional MFA for staff.

### 9.3 Performance & Scalability `P0`
- Support concurrent load (e.g., whole school taking attendance simultaneously).
- Page/interaction response < 2s under normal load.
- Horizontally scalable, cloud-first architecture.

### 9.4 Reliability & Availability `P0`
- ≥ 99.9% uptime; automated backups; disaster-recovery plan; RPO/RTO defined.

### 9.5 Usability & Accessibility `P0`
- **Web-first, fully responsive** — must work well on parents' phones in the browser;
  native apps are a later phase.
- WCAG 2.1 AA accessibility; **English + regional-language** localization support.

### 9.6 Interoperability `P1`
- Open REST/GraphQL API; webhooks; standard import/export.
- Integrations: **Razorpay** (payments), **WhatsApp Business API** + SMS/email,
  Google sign-in, LMS, biometric/RFID (attendance).

---

## 10. Proposed Architecture (High-Level)

> Directional guidance for the engineering team, not a final design.

- **Pattern:** Single-tenant, cloud-hosted web application (one school → no
  multi-tenant machinery needed).
- **Frontend:** Responsive SPA (e.g., React / Next.js) that works well on mobile
  browsers; native mobile apps in a later phase.
- **Backend:** API-driven service (REST/GraphQL); role-based authorization.
- **Database:** Relational (PostgreSQL) for core records; caching layer for
  performance.
- **Auth:** Email/phone + password, Google sign-in, optional MFA for staff; RBAC.
- **Hosting:** Cloud provider with an **India region** (data localization for DPDP);
  containerized, CI/CD, monitoring, automated daily backups.
- **Integrations:** **Razorpay** (payments), **WhatsApp Business API** + SMS/email
  provider, object storage for documents, optional biometric/RFID for attendance.

*Final stack selection should be made by engineering based on team expertise and
budget.*

---

## 11. Release Plan / Roadmap

| Phase | Timeline (indicative) | Scope |
|---|---|---|
| **Phase 0 — Foundation** | Weeks 1–4 | Architecture, auth, RBAC, tenant model, base schema, CI/CD |
| **Phase 1 — MVP** | Months 2–5 | SIS, Admissions, Attendance, Gradebook/Exams, Fees, Communication + 4 portals |
| **Phase 2 — Expansion** | Months 6–9 | Timetable, Library, Transport, LMS integration, basic analytics |
| **Phase 3 — Advanced** | Months 10–14 | HR/Payroll, Hostel, native mobile apps, AI/predictive analytics, multi-tenant hardening |

---

## 12. Assumptions, Dependencies & Risks

### Assumptions
- **Single-school deployment** (confirmed) — no multi-tenant requirement.
- **India, web-first** (confirmed) — DPDP-governed; responsive web before native apps.
- School has reliable internet; offline mode is not an MVP requirement.
- Parents primarily reachable via **WhatsApp / SMS** and mobile browser.

### Dependencies
- **Razorpay** account (payments), **WhatsApp Business API** + SMS/email provider,
  India-region cloud hosting, optional biometric/RFID hardware.

### Risks & Mitigations
| Risk | Impact | Mitigation |
|---|---|---|
| Data-privacy non-compliance | Legal/financial | Privacy-by-design, legal review, audits |
| Low teacher adoption | Product fails to deliver value | Simple UX, training, phased rollout |
| Scope creep (50+ modules) | Delayed launch | Strict MVP scope; phased roadmap |
| Data migration errors | Trust loss | Robust import tooling, validation, dry runs |
| Peak-load failures (attendance rush) | Downtime | Load testing, autoscaling |

---

## 13. Open Questions (for stakeholder decision)

**Resolved:** Single school ✓ · India ✓ · Web-first ✓ · Razorpay for payments ✓ ·
WhatsApp/SMS for communication ✓

**Still open:**
1. **Which board?** CBSE, ICSE, or a specific State board — this fixes the exact
   report-card / grading template to build first.
2. **School level & size?** Pre-primary / primary / secondary / senior-secondary,
   and approximate student count (drives scale and which modules matter, e.g. hostel).
3. **Budget & timeline?** Determines team size, phasing, and build-vs-integrate calls.
4. **When to add native mobile apps?** (Web-first now — after MVP, or after Phase 2?)
5. **Existing data to migrate?** (Current student/fee records in Excel/another ERP?)

---

## 14. Appendix — Research Sources

- Classter — [Guide to School Management Systems 2026](https://www.classter.com/blog/edtech/a-guide-to-school-management-systems-in-2026/), [10 Essential Features for K-12](https://www.classter.com/blog/general/10-essential-features-of-school-management-software-for-k-12-administrators/), [What is a School ERP System](https://www.classter.com/blog/edtech/what-is-a-school-erp-system-and-why-do-institutions-need-it/)
- Gradelink — [15 Best School Management Software for 2026](https://gradelink.com/15-best-school-management-software-for-2026/)
- OpenEduCat — [School Management Software Buyer's Guide 2026](https://openeducat.org/articles/school-management-software-buyers-guide/)
- SchoolCues — [Top 10 School Management Systems 2026](https://www.schoolcues.com/blog/top-school-management-systems-2026/)
- Fedena — [Feature Tour](https://fedena.com/feature-tour), [Pricing & Plans](https://fedena.com/pricing-and-plans)
- Software Advice — [15 Best PowerSchool Alternatives 2026](https://www.softwareadvice.com/hr/powerschool-profile/alternatives/)
- TCS — [EdTech in 2026: Trends](https://www.tcs.com/what-we-do/industries/education/article/edtech-trends-2026-intelligence-redefining-learning-systems)
- X-Pilot — [AI in Education 2026: 7 Trends](https://www.x-pilot.ai/blog/future-ai-education-2026-trends-report)
- Medium (Casey Miller) — [Privacy by Design: FERPA and GDPR in 2026 Education Analytics](https://medium.com/@caseymillermarketer/privacy-by-design-navigating-ferpa-and-gdpr-in-2026-education-analytics-06f27fcded97)
- EdTech Magazine — [AI in Education: Protecting Student Data Privacy](https://edtechmagazine.com/higher/article/2026/01/ai-higher-education-protecting-student-data-privacy-perfcon)
- WorkOS — [How to design RBAC for multi-tenant SaaS](https://workos.com/blog/how-to-design-multi-tenant-rbac-saas)
- Auth0 — [Choosing an Authorization Model for Multi-Tenant SaaS](https://auth0.com/blog/how-to-choose-the-right-authorization-model-for-your-multi-tenant-saas-application/)

**India-specific:**
- K&K — [DPDP Compliance for Schools and EdTech in India](https://ksandk.com/data-protection-and-data-privacy/dpdp-compliance-for-schools-and-edtech/), [Child Data Protection & Parental Consent Rules](https://ksandk.com/data-protection-and-data-privacy/child-data-protection-under-dpdp-act-parental-consent-rules/)
- EY India — [Decoding the DPDP Act 2023 & DPDP Rules 2025](https://www.ey.com/en_in/insights/cybersecurity/decoding-the-digital-personal-data-protection-act-2023)
- ORF — [DPDP Rules and the Future of Child Data Safety](https://www.orfonline.org/expert-speak/dpdp-rules-and-the-future-of-child-data-safety)
- Razorpay — [Education Payment Platform (school fees)](https://razorpay.com/solutions/education/)
- OpenEduCat — [Razorpay School Fee Payment Integration](https://openeducat.org/integrations/razorpay/)
- eduTinker — [Why Every Indian School Needs a Digital Fee Management System in 2026](https://edutinker.com/why-every-indian-school-needs-a-digital-fee-management-system-in-2026/)
