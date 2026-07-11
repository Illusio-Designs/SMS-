'use client'

import Link from 'next/link'
import { useApp } from '@/components/AppContext'
import { Card, Kpi, Badge, Bar, BarChart, inr } from '@/components/ui'
import {
  adminKpis, enrollmentByGrade, attendanceTrend, feeSummary, invoices,
  announcements, admissions, leaveRequests, classRosterVIIIA, todayAttendance,
  gradebook, reportCard, findStudent, events, students,
} from '@/lib/mockData'

export default function DashboardPage() {
  const { role, currentUser } = useApp()
  return (
    <div className="page">
      <div className="page-head">
        <h2>Welcome back, {currentUser.name.split(' ')[0]} 👋</h2>
        <p className="muted">{greeting(role)}</p>
      </div>
      {role === 'admin' && <AdminDash />}
      {role === 'teacher' && <TeacherDash />}
      {role === 'student' && <StudentDash />}
      {role === 'parent' && <ParentDash />}
    </div>
  )
}

function greeting(role) {
  return {
    admin: "Here's how the school is doing today.",
    teacher: 'Your classes, attendance and gradebook at a glance.',
    student: 'Your timetable, grades, attendance and fees.',
    parent: "Your children's progress, attendance and fees.",
  }[role]
}

/* ---------------- Admin ---------------- */
function AdminDash() {
  const pinned = announcements.filter((a) => a.pinned)
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Total Students" value={adminKpis.students.toLocaleString('en-IN')} sub="+38 this term" icon="👥" tone="accent" />
        <Kpi label="Teachers" value={adminKpis.teachers} sub="6 departments" icon="🧑‍🏫" tone="blue" />
        <Kpi label="Attendance Today" value={`${adminKpis.attendanceToday}%`} sub="school-wide" icon="✔" tone="green" />
        <Kpi label="Fees Collected" value={`${feeSummary.collectionRate}%`} sub={`${inr(feeSummary.pending)} pending`} icon="₹" tone="amber" />
      </div>

      <div className="grid cols-2">
        <Card title="Enrollment by grade band">
          <BarChart data={enrollmentByGrade} valueKey="count" labelKey="band" />
        </Card>
        <Card title="Attendance — last 7 school days">
          <BarChart data={attendanceTrend} valueKey="pct" labelKey="label" format={(v) => `${v}%`} />
        </Card>
      </div>

      <div className="grid cols-2">
        <Card title="Fee collection" action={<Link className="btn sm" href="/fees">Open Fees</Link>}>
          <div className="stack">
            <FeeStat label="Collected" value={inr(feeSummary.collected)} tone="green" pct={feeSummary.collectionRate} />
            <FeeStat label="Pending" value={inr(feeSummary.pending)} tone="amber" pct={100 - feeSummary.collectionRate} />
            <FeeStat label="Overdue" value={inr(feeSummary.overdue)} tone="red" pct={30} />
            <div className="between" style={{ marginTop: 4 }}>
              <span className="muted">Defaulters</span>
              <Badge tone="red">{feeSummary.defaulters} students</Badge>
            </div>
          </div>
        </Card>
        <Card title="Needs attention" action={<Link className="btn sm" href="/admissions">Admissions</Link>}>
          <div className="stack">
            <AttnRow icon="📝" label="Open admission applications" value={admissions.filter(a => a.stage !== 'Enrolled').length} href="/admissions" />
            <AttnRow icon="🗓" label="Pending leave requests" value={leaveRequests.filter(l => l.status === 'Pending').length} href="/attendance" />
            <AttnRow icon="₹" label="Overdue fee invoices" value={invoices.filter(i => i.status === 'Overdue').length} href="/fees" />
            <AttnRow icon="🧪" label="Upcoming exams" value={events.filter(e => e.tag === 'Exam').length} href="/gradebook" />
          </div>
        </Card>
      </div>

      <Card title="Pinned announcements" action={<Link className="btn sm" href="/communication">Communication</Link>}>
        {pinned.map((a) => (
          <div key={a.id} className="between" style={{ padding: '6px 0' }}>
            <div>
              <b>{a.title}</b>
              <div className="muted" style={{ fontSize: 12.5 }}>{a.audience} · {a.channel}</div>
            </div>
            <span className="faint" style={{ fontSize: 12 }}>{a.at}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}

function FeeStat({ label, value, tone, pct }) {
  const color = { green: 'var(--green)', amber: 'var(--amber)', red: 'var(--red)' }[tone]
  return (
    <div>
      <div className="between" style={{ marginBottom: 6 }}>
        <span className="muted">{label}</span>
        <b className="mono">{value}</b>
      </div>
      <Bar pct={pct} color={color} />
    </div>
  )
}

function AttnRow({ icon, label, value, href }) {
  return (
    <Link href={href} className="between" style={{ padding: '4px 0' }}>
      <span className="row"><span style={{ fontSize: 17 }}>{icon}</span> {label}</span>
      <span className="badge blue"><span className="dot" />{value}</span>
    </Link>
  )
}

/* ---------------- Teacher ---------------- */
function TeacherDash() {
  const present = todayAttendance.filter((s) => s.status === 'Present').length
  const topper = [...gradebook].sort((a, b) => b.pct - a.pct)[0]
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="My Class" value="VIII-A" sub={`${classRosterVIIIA.length} students`} icon="🏫" tone="accent" />
        <Kpi label="Present Today" value={`${present}/${todayAttendance.length}`} sub="marked at 8:15 AM" icon="✔" tone="green" />
        <Kpi label="Class Average" value={`${Math.round(gradebook.reduce((a, g) => a + g.pct, 0) / gradebook.length)}%`} sub="Term 1" icon="📊" tone="blue" />
        <Kpi label="Pending Leaves" value={leaveRequests.filter(l => l.status === 'Pending').length} sub="to approve" icon="🗓" tone="amber" />
      </div>

      <div className="grid cols-2">
        <Card title="Today's attendance — VIII-A" action={<Link className="btn sm primary" href="/attendance">Take attendance</Link>}>
          <div className="stack">
            {todayAttendance.slice(0, 5).map((s) => (
              <div key={s.studentId} className="between">
                <span className="row"><span className="avatar-sm">{s.name.split(' ').map(w => w[0]).join('')}</span>{s.name}</span>
                <Badge>{s.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Class toppers — Term 1" action={<Link className="btn sm" href="/gradebook">Gradebook</Link>}>
          <div className="stack">
            {[...gradebook].sort((a, b) => b.pct - a.pct).slice(0, 5).map((g, i) => (
              <div key={g.studentId} className="between">
                <span className="row"><span className="pill">{i + 1}</span>{g.name}</span>
                <span className="row"><b className="mono">{g.pct}%</b><Badge>{g.grade}</Badge></span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Leave requests to review" action={<Link className="btn sm" href="/attendance">All requests</Link>}>
        <div className="stack">
          {leaveRequests.map((l) => (
            <div key={l.id} className="between">
              <div>
                <b>{l.student}</b> <span className="muted">· {l.reason}</span>
                <div className="faint" style={{ fontSize: 12 }}>{l.from} → {l.to}</div>
              </div>
              <Badge>{l.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

/* ---------------- Student ---------------- */
function StudentDash() {
  const me = findStudent(currentStudentId())
  return (
    <div className="stack">
      <div className="grid kpis">
        <Kpi label="Attendance" value={`${me.attendancePct}%`} sub="this term" icon="✔" tone="green" />
        <Kpi label="Overall Grade" value={reportCard.scholastic.cgpa} sub={`Rank ${reportCard.scholastic.rank} in class`} icon="📊" tone="accent" />
        <Kpi label="Class" value={`${me.grade}-${me.section}`} sub={`Roll ${me.roll} · ${me.house} House`} icon="🏫" tone="blue" />
        <Kpi label="Fee Status" value={me.feeStatus} sub="Term 1" icon="₹" tone={me.feeStatus === 'Paid' ? 'green' : 'amber'} />
      </div>

      <div className="grid cols-2">
        <Card title="Today's timetable">
          <div className="stack">
            {timetable.map((t) => (
              <div key={t.period} className="between">
                <span className="row"><span className="pill">{t.time}</span>{t.subject}</span>
                <span className="muted">{t.teacher}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="My grades — Term 1" action={<Link className="btn sm" href="/gradebook">Report card</Link>}>
          <div className="stack">
            {reportCard.subjects.map((s) => (
              <div key={s.subject}>
                <div className="between" style={{ marginBottom: 5 }}>
                  <span>{s.subject}</span>
                  <span className="row"><b className="mono">{s.marks}/{s.max}</b><Badge>{s.grade}</Badge></span>
                </div>
                <Bar pct={s.marks} color="var(--accent)" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Upcoming" action={<Link className="btn sm" href="/communication">Calendar</Link>}>
        <div className="stack">
          {events.map((e) => (
            <div key={e.id} className="between">
              <span className="row"><span className="pill">{fmtDate(e.date)}</span>{e.title}</span>
              <Badge tone={e.tag === 'Exam' ? 'red' : e.tag === 'Holiday' ? 'green' : 'blue'}>{e.tag}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

/* ---------------- Parent ---------------- */
function ParentDash() {
  const kids = students.filter((s) => ['STU-2401', 'STU-2402'].includes(s.id))
  return (
    <div className="stack">
      <div className="grid cols-2">
        {kids.map((k) => (
          <Card key={k.id} title={`${k.name} · ${k.grade}-${k.section}`}
            action={<Badge tone={k.feeStatus === 'Paid' ? 'green' : k.feeStatus === 'Overdue' ? 'red' : 'amber'}>{k.feeStatus}</Badge>}>
            <div className="grid kpis" style={{ gap: 12 }}>
              <MiniStat label="Attendance" value={`${k.attendancePct}%`} tone="green" />
              <MiniStat label="Avg Grade" value={k.avgGrade} tone="accent" />
              <MiniStat label="House" value={k.house} tone="blue" />
            </div>
            <div className="row" style={{ marginTop: 14 }}>
              <Link className="btn sm" href="/attendance">Attendance</Link>
              <Link className="btn sm" href="/gradebook">Grades</Link>
              {k.feeStatus !== 'Paid'
                ? <Link className="btn sm primary" href="/fees">Pay fees</Link>
                : <Link className="btn sm" href="/fees">Receipts</Link>}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid cols-2">
        <Card title="Recent announcements" action={<Link className="btn sm" href="/communication">All</Link>}>
          <div className="stack">
            {announcements.slice(0, 3).map((a) => (
              <div key={a.id}>
                <b>{a.title}</b>
                <div className="muted" style={{ fontSize: 12.5 }}>{a.audience} · {a.at}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Fee overview" action={<Link className="btn sm primary" href="/fees">Pay online</Link>}>
          <div className="stack">
            {invoices.filter(i => ['STU-2401', 'STU-2402'].includes(i.studentId)).map((i) => (
              <div key={i.id} className="between">
                <div>
                  <b>{i.student}</b>
                  <div className="faint" style={{ fontSize: 12 }}>{i.term} · due {fmtDate(i.dueDate)}</div>
                </div>
                <span className="row"><b className="mono">{inr(i.due || i.amount)}</b><Badge>{i.status}</Badge></span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function MiniStat({ label, value, tone }) {
  const fg = { green: 'var(--green)', accent: 'var(--accent)', blue: 'var(--blue)' }[tone]
  return (
    <div>
      <div className="faint" style={{ fontSize: 12 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 750, color: fg }}>{value}</div>
    </div>
  )
}

/* helpers */
function currentStudentId() { return 'STU-2401' }
const timetable = [
  { period: 1, time: '08:15', subject: 'Mathematics', teacher: 'R. Deshmukh' },
  { period: 2, time: '09:05', subject: 'Science', teacher: 'S. Iyer' },
  { period: 3, time: '10:10', subject: 'English', teacher: 'A. Fernandes' },
  { period: 4, time: '11:00', subject: 'Social Science', teacher: 'M. Bose' },
  { period: 5, time: '12:20', subject: 'Computer', teacher: 'K. Rao' },
]
function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
}
