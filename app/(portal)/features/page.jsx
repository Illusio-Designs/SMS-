'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useApp } from '@/components/AppContext'
import { PageHeader, Card, Badge, Icon, Glyph, Tabs, Kpi } from '@/components/ui'
import { ALL_NAV, SECTIONS, ROLE_LABELS, ROLE_ICON, navForRole } from '@/lib/nav'

const ROLES = ['admin', 'teacher', 'student', 'parent']

// One-line description of what each module delivers.
const FEATURE_DESC = {
  '/dashboard': 'Role-specific overview with KPIs, charts and action items.',
  '/features': 'This page — every module, mapped to the roles that can use it.',
  '/students': 'Central student records (SIS): demographics, guardians, history, documents.',
  '/attendance': 'Daily/period attendance, absence alerts, reports and leave workflow.',
  '/gradebook': 'CBSE gradebook, exams, CCE report cards and marksheets.',
  '/assignments': 'Assignments, submissions and grading — synced with Google Classroom.',
  '/timetable': 'Class & teacher schedules with clash detection.',
  '/admissions': 'Online applications and the admissions funnel to enrollment.',
  '/fees': 'Fee structure, invoices, online payment (Razorpay) and reports.',
  '/library': 'Book catalog, issue/return circulation and member history.',
  '/transport': 'Routes, vehicles and live bus tracking with ETAs.',
  '/hostel': 'Room allocation, occupancy and mess management.',
  '/hr': 'Staff records, attendance and monthly payroll.',
  '/analytics': 'Dashboards, trends and AI-assisted early intervention.',
  '/communication': 'Announcements, messaging and calendar over WhatsApp/SMS/email.',
  '/settings': 'School config, RBAC, users, branding and integrations.',
  '/calendar': 'School events, exams, holidays and meetings.',
  '/study-material': 'Notes, slides, worksheets and video lessons by subject.',
  '/infractions': 'Discipline records and conduct notes.',
  '/food-menu': 'Weekly canteen / mess menu.',
  '/lost-found': 'Items found around campus and their claim status.',
  '/gallery': 'Photo albums from events and activities.',
  '/account': 'Profile, preferences and account security.',
}

const ROLE_TONE = { admin: 'accent', teacher: 'teal', student: 'amber', parent: 'pink' }
const SHORT_ROLE = { admin: 'Admin', teacher: 'Teacher', student: 'Student', parent: 'Parent' }

export default function FeaturesPage() {
  const { role } = useApp()
  const [view, setView] = useState('matrix')

  const features = ALL_NAV.filter((f) => f.href !== '/features')

  return (
    <div className="page">
      <PageHeader
        title="Features"
        subtitle="Everything in the system, and which role each feature is available to."
      />

      <div className="grid kpis" style={{ marginBottom: 16 }}>
        <Kpi label="Total modules" value={features.length} icon="features" tone="accent" />
        <Kpi label="Your role" value={SHORT_ROLE[role]} sub={`${navForRole(role).length - 1} modules available`} icon={ROLE_ICON[role]} tone={ROLE_TONE[role]} />
        <Kpi label="Portals" value="4" sub="Admin · Teacher · Student · Parent" icon="people" tone="blue" />
        <Kpi label="Shared to all" value={features.filter(f => f.roles.length === 4).length} icon="badge" tone="green" />
      </div>

      <Tabs
        value={view}
        onChange={setView}
        tabs={[{ value: 'matrix', label: 'Access matrix' }, ...ROLES.map((r) => ({ value: r, label: ROLE_LABELS[r] }))]}
      />

      {view === 'matrix' ? <Matrix features={features} /> : <RoleView role={view} features={features} />}
    </div>
  )
}

/* ---- Access matrix: modules × roles ---- */
function Matrix({ features }) {
  return (
    <div className="stack">
      {SECTIONS.map((section) => {
        const rows = features.filter((f) => f.section === section)
        if (!rows.length) return null
        return (
          <Card key={section} bodyClass="tight" title={section}>
            <div className="table-wrap">
              <table className="tbl">
                <thead>
                  <tr>
                    <th style={{ width: '38%' }}>Feature</th>
                    {ROLES.map((r) => (
                      <th key={r} className="num">
                        <span className="row" style={{ justifyContent: 'flex-end', gap: 6 }}>
                          <Glyph name={ROLE_ICON[r]} size={15} /> {ROLE_LABELS[r]}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((f) => (
                    <tr key={f.href}>
                      <td>
                        <Link href={f.href} className="row" style={{ gap: 10 }}>
                          <Icon name={f.icon} tone="gray" size="sm" />
                          <span>
                            <b>{f.label}</b>
                            <div className="faint" style={{ fontSize: 12, fontWeight: 400 }}>{FEATURE_DESC[f.href]}</div>
                          </span>
                        </Link>
                      </td>
                      {ROLES.map((r) => (
                        <td key={r} className="num">
                          {f.roles.includes(r)
                            ? <Glyph name="check" size={19} color="var(--green)" />
                            : <Glyph name="cross" size={17} color="var(--text-faint)" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

/* ---- Per-role view: cards of available features ---- */
function RoleView({ role, features }) {
  const mine = features.filter((f) => f.roles.includes(role))
  return (
    <div className="stack">
      <div className="card row" style={{ padding: 16, gap: 14, alignItems: 'center' }}>
        <Icon name={ROLE_ICON[role]} tone={ROLE_TONE[role]} size="lg" />
        <div>
          <b style={{ fontSize: 16 }}>{ROLE_LABELS[role]} portal</b>
          <div className="muted" style={{ fontSize: 13 }}>{mine.length} features available to this role.</div>
        </div>
      </div>

      {SECTIONS.map((section) => {
        const rows = mine.filter((f) => f.section === section)
        if (!rows.length) return null
        return (
          <div key={section}>
            <div className="nav-group__label" style={{ color: 'var(--text-soft)', paddingLeft: 2 }}>{section}</div>
            <div className="grid cols-3">
              {rows.map((f) => (
                <Link key={f.href} href={f.href}>
                  <div className="feat-card">
                    <Icon name={f.icon} tone={ROLE_TONE[role]} size="md" />
                    <b>{f.label}</b>
                    <span className="muted" style={{ fontSize: 12.5 }}>{FEATURE_DESC[f.href]}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      })}

      <style jsx>{`
        .feat-card {
          height: 100%; display: flex; flex-direction: column; gap: 7px; padding: 16px;
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius);
          box-shadow: var(--shadow); transition: transform 0.12s, box-shadow 0.12s;
        }
        .feat-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
      `}</style>
    </div>
  )
}
