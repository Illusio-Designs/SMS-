// ---------------------------------------------------------------------------
// Illusio School Management System — Mock Data
// Single-school, India context. All data here is fabricated for the demo UI.
// ---------------------------------------------------------------------------

export const school = {
  name: 'Illusio Public School',
  board: 'CBSE',
  city: 'Pune, Maharashtra',
  session: '2026–27',
  logo: '🎓',
}

// --- Users / roles for the portal switcher ---------------------------------
export const users = [
  {
    id: 'u-admin',
    role: 'admin',
    name: 'Priya Nair',
    title: 'Principal',
    email: 'priya.nair@illusio.edu.in',
    avatar: 'PN',
  },
  {
    id: 'u-teacher',
    role: 'teacher',
    name: 'Rahul Deshmukh',
    title: 'Class Teacher — VIII-A · Mathematics',
    email: 'rahul.d@illusio.edu.in',
    avatar: 'RD',
    classTeacherOf: 'VIII-A',
  },
  {
    id: 'u-student',
    role: 'student',
    name: 'Aarav Mehta',
    title: 'Class VIII-A · Roll 12',
    email: 'aarav.m@illusio.edu.in',
    avatar: 'AM',
    studentId: 'STU-2401',
  },
  {
    id: 'u-parent',
    role: 'parent',
    name: 'Sunita Mehta',
    title: 'Parent of Aarav & Diya Mehta',
    email: 'sunita.mehta@gmail.com',
    avatar: 'SM',
    childrenIds: ['STU-2401', 'STU-2402'],
  },
]

// --- Students (SIS) --------------------------------------------------------
export const students = [
  {
    id: 'STU-2401', roll: 12, name: 'Aarav Mehta', grade: 'VIII', section: 'A',
    gender: 'Male', dob: '2012-04-18', bloodGroup: 'B+', house: 'Emerald',
    guardian: 'Sunita Mehta', guardianPhone: '+91 98765 43210',
    email: 'aarav.m@illusio.edu.in', address: '14 Rose Villa, Kothrud, Pune',
    admissionDate: '2018-06-12', status: 'Active', attendancePct: 94, avgGrade: 'A2',
    feeStatus: 'Paid',
  },
  {
    id: 'STU-2402', roll: 4, name: 'Diya Mehta', grade: 'V', section: 'B',
    gender: 'Female', dob: '2015-09-02', bloodGroup: 'B+', house: 'Ruby',
    guardian: 'Sunita Mehta', guardianPhone: '+91 98765 43210',
    email: 'diya.m@illusio.edu.in', address: '14 Rose Villa, Kothrud, Pune',
    admissionDate: '2021-06-10', status: 'Active', attendancePct: 97, avgGrade: 'A1',
    feeStatus: 'Due',
  },
  {
    id: 'STU-2403', roll: 8, name: 'Kabir Singh', grade: 'VIII', section: 'A',
    gender: 'Male', dob: '2012-01-25', bloodGroup: 'O+', house: 'Sapphire',
    guardian: 'Harpreet Singh', guardianPhone: '+91 99887 76655',
    email: 'kabir.s@illusio.edu.in', address: '22 Green Park, Baner, Pune',
    admissionDate: '2018-06-12', status: 'Active', attendancePct: 88, avgGrade: 'B1',
    feeStatus: 'Overdue',
  },
  {
    id: 'STU-2404', roll: 15, name: 'Ananya Rao', grade: 'VIII', section: 'A',
    gender: 'Female', dob: '2012-07-11', bloodGroup: 'A+', house: 'Emerald',
    guardian: 'Lakshmi Rao', guardianPhone: '+91 98111 22233',
    email: 'ananya.r@illusio.edu.in', address: '5 Lake View, Aundh, Pune',
    admissionDate: '2018-06-12', status: 'Active', attendancePct: 99, avgGrade: 'A1',
    feeStatus: 'Paid',
  },
  {
    id: 'STU-2405', roll: 3, name: 'Ishaan Verma', grade: 'VIII', section: 'A',
    gender: 'Male', dob: '2012-11-30', bloodGroup: 'AB+', house: 'Ruby',
    guardian: 'Nikhil Verma', guardianPhone: '+91 97000 11122',
    email: 'ishaan.v@illusio.edu.in', address: '8 Hill Road, Viman Nagar, Pune',
    admissionDate: '2019-06-15', status: 'Active', attendancePct: 76, avgGrade: 'C1',
    feeStatus: 'Due',
  },
  {
    id: 'STU-2406', roll: 21, name: 'Zara Khan', grade: 'X', section: 'C',
    gender: 'Female', dob: '2010-03-14', bloodGroup: 'O-', house: 'Sapphire',
    guardian: 'Imran Khan', guardianPhone: '+91 98220 33445',
    email: 'zara.k@illusio.edu.in', address: '31 Palm Grove, Wakad, Pune',
    admissionDate: '2016-06-14', status: 'Active', attendancePct: 91, avgGrade: 'A2',
    feeStatus: 'Paid',
  },
  {
    id: 'STU-2407', roll: 9, name: 'Vivaan Joshi', grade: 'X', section: 'C',
    gender: 'Male', dob: '2010-08-22', bloodGroup: 'B-', house: 'Emerald',
    guardian: 'Meera Joshi', guardianPhone: '+91 90011 55667',
    email: 'vivaan.j@illusio.edu.in', address: '2 Sunrise Apts, Hinjewadi, Pune',
    admissionDate: '2016-06-14', status: 'Active', attendancePct: 84, avgGrade: 'B2',
    feeStatus: 'Overdue',
  },
  {
    id: 'STU-2408', roll: 6, name: 'Myra Patel', grade: 'V', section: 'B',
    gender: 'Female', dob: '2015-12-05', bloodGroup: 'A-', house: 'Ruby',
    guardian: 'Rakesh Patel', guardianPhone: '+91 98334 66778',
    email: 'myra.p@illusio.edu.in', address: '19 Orchid Lane, Kharadi, Pune',
    admissionDate: '2021-06-10', status: 'Active', attendancePct: 96, avgGrade: 'A1',
    feeStatus: 'Paid',
  },
]

// --- Class roster for the class teacher (VIII-A) ---------------------------
export const classRosterVIIIA = students.filter(
  (s) => s.grade === 'VIII' && s.section === 'A'
)

// --- Admissions funnel -----------------------------------------------------
export const admissions = [
  { id: 'APP-501', name: 'Reyansh Gupta', gradeApplied: 'VI', appliedOn: '2026-06-28', stage: 'Application', fee: 'Pending', source: 'Website' },
  { id: 'APP-502', name: 'Saanvi Iyer', gradeApplied: 'IX', appliedOn: '2026-06-25', stage: 'Document Review', fee: 'Paid', source: 'Walk-in' },
  { id: 'APP-503', name: 'Arjun Nair', gradeApplied: 'I', appliedOn: '2026-06-22', stage: 'Entrance Test', fee: 'Paid', source: 'Referral' },
  { id: 'APP-504', name: 'Kiara Shah', gradeApplied: 'VI', appliedOn: '2026-06-20', stage: 'Interview', fee: 'Paid', source: 'Website' },
  { id: 'APP-505', name: 'Aditya Kulkarni', gradeApplied: 'XI', appliedOn: '2026-06-18', stage: 'Offer', fee: 'Paid', source: 'Referral' },
  { id: 'APP-506', name: 'Nisha Reddy', gradeApplied: 'IX', appliedOn: '2026-06-15', stage: 'Enrolled', fee: 'Paid', source: 'Website' },
  { id: 'APP-507', name: 'Dev Malhotra', gradeApplied: 'I', appliedOn: '2026-06-12', stage: 'Waitlist', fee: 'Paid', source: 'Walk-in' },
]

export const admissionStages = [
  'Application', 'Document Review', 'Entrance Test', 'Interview', 'Offer', 'Waitlist', 'Enrolled',
]

// --- Attendance ------------------------------------------------------------
// Today's roster status for VIII-A (teacher marks these).
export const todayAttendance = classRosterVIIIA.map((s) => ({
  studentId: s.id,
  name: s.name,
  roll: s.roll,
  status: s.attendancePct > 90 ? 'Present' : s.attendancePct > 80 ? 'Present' : 'Absent',
}))

// Attendance trend (school-wide %) for the admin dashboard.
export const attendanceTrend = [
  { label: 'Mon', pct: 96 },
  { label: 'Tue', pct: 94 },
  { label: 'Wed', pct: 97 },
  { label: 'Thu', pct: 92 },
  { label: 'Fri', pct: 89 },
  { label: 'Mon', pct: 95 },
  { label: 'Tue', pct: 93 },
]

export const leaveRequests = [
  { id: 'LR-31', student: 'Kabir Singh', grade: 'VIII-A', from: '2026-07-14', to: '2026-07-15', reason: 'Medical — fever', status: 'Pending' },
  { id: 'LR-32', student: 'Ishaan Verma', grade: 'VIII-A', from: '2026-07-16', to: '2026-07-16', reason: 'Family function', status: 'Pending' },
  { id: 'LR-30', student: 'Ananya Rao', grade: 'VIII-A', from: '2026-07-08', to: '2026-07-09', reason: 'Dental appointment', status: 'Approved' },
]

// --- Gradebook (VIII-A, Term 1) --------------------------------------------
export const subjects = ['English', 'Mathematics', 'Science', 'Social Science', 'Hindi', 'Computer']

export const gradebook = classRosterVIIIA.map((s, i) => {
  // deterministic-ish marks per student
  const base = 92 - i * 6
  const marks = {
    English: Math.max(48, base + 2),
    Mathematics: Math.max(45, base - 3),
    Science: Math.max(50, base + 1),
    'Social Science': Math.max(47, base - 1),
    Hindi: Math.max(52, base + 4),
    Computer: Math.max(55, base + 6),
  }
  const total = Object.values(marks).reduce((a, b) => a + b, 0)
  const pct = Math.round(total / subjects.length)
  return { studentId: s.id, name: s.name, roll: s.roll, marks, total, pct, grade: gradeFor(pct) }
})

export function gradeFor(pct) {
  if (pct >= 91) return 'A1'
  if (pct >= 81) return 'A2'
  if (pct >= 71) return 'B1'
  if (pct >= 61) return 'B2'
  if (pct >= 51) return 'C1'
  if (pct >= 41) return 'C2'
  return 'D'
}

export const exams = [
  { id: 'EX-1', name: 'Unit Test 1', term: 'Term 1', date: '2026-07-21', status: 'Scheduled', classes: 'All' },
  { id: 'EX-2', name: 'Mid-Term Exam', term: 'Term 1', date: '2026-09-08', status: 'Draft', classes: 'All' },
  { id: 'EX-3', name: 'Periodic Test', term: 'Term 1', date: '2026-06-16', status: 'Marks Published', classes: 'All' },
]

// Report card for the student portal (Aarav)
export const reportCard = {
  studentId: 'STU-2401',
  term: 'Term 1 · 2026–27',
  subjects: subjects.map((sub, i) => {
    const marks = [88, 84, 90, 86, 92, 94][i]
    return { subject: sub, marks, max: 100, grade: gradeFor(marks) }
  }),
  scholastic: { percentage: 89, cgpa: 8.9, rank: 3, result: 'PASS' },
  coScholastic: [
    { area: 'Work Education', grade: 'A' },
    { area: 'Art Education', grade: 'A' },
    { area: 'Health & Physical Education', grade: 'B' },
    { area: 'Discipline', grade: 'A' },
  ],
}

// --- Fees ------------------------------------------------------------------
export const feeStructure = [
  { head: 'Tuition Fee', term1: 24000, term2: 24000, annual: 48000 },
  { head: 'Transport', term1: 9000, term2: 9000, annual: 18000 },
  { head: 'Activities & Labs', term1: 4000, term2: 4000, annual: 8000 },
  { head: 'Exam Fee', term1: 1500, term2: 1500, annual: 3000 },
]

export const invoices = [
  { id: 'INV-9001', student: 'Aarav Mehta', studentId: 'STU-2401', grade: 'VIII-A', term: 'Term 1', amount: 38500, paid: 38500, due: 0, dueDate: '2026-06-30', status: 'Paid', method: 'UPI · Google Pay' },
  { id: 'INV-9002', student: 'Diya Mehta', studentId: 'STU-2402', grade: 'V-B', term: 'Term 1', amount: 34500, paid: 0, due: 34500, dueDate: '2026-07-15', status: 'Due', method: '—' },
  { id: 'INV-9003', student: 'Kabir Singh', studentId: 'STU-2403', grade: 'VIII-A', term: 'Term 1', amount: 38500, paid: 0, due: 38500, dueDate: '2026-06-15', status: 'Overdue', method: '—' },
  { id: 'INV-9004', student: 'Ananya Rao', studentId: 'STU-2404', grade: 'VIII-A', term: 'Term 1', amount: 38500, paid: 38500, due: 0, dueDate: '2026-06-28', status: 'Paid', method: 'Net Banking' },
  { id: 'INV-9005', student: 'Ishaan Verma', studentId: 'STU-2405', grade: 'VIII-A', term: 'Term 1', amount: 38500, paid: 20000, due: 18500, dueDate: '2026-07-20', status: 'Partial', method: 'UPI · PhonePe' },
  { id: 'INV-9006', student: 'Zara Khan', studentId: 'STU-2406', grade: 'X-C', term: 'Term 1', amount: 41000, paid: 41000, due: 0, dueDate: '2026-06-30', status: 'Paid', method: 'Card' },
  { id: 'INV-9007', student: 'Vivaan Joshi', studentId: 'STU-2407', grade: 'X-C', term: 'Term 1', amount: 41000, paid: 0, due: 41000, dueDate: '2026-06-10', status: 'Overdue', method: '—' },
]

export const feeSummary = {
  collected: 118000,
  pending: 132500,
  overdue: 79500,
  collectionRate: 47,
  defaulters: 2,
}

// --- Communication ---------------------------------------------------------
export const announcements = [
  { id: 'AN-1', title: 'Annual Sports Day — 25 July', body: 'The Annual Sports Day will be held on 25 July at the main ground. Parents are cordially invited. Reporting time 8:00 AM.', audience: 'School-wide', channel: 'WhatsApp · App', by: 'Principal', at: '2026-07-10 09:15', pinned: true },
  { id: 'AN-2', title: 'VIII-A Maths — Extra Class', body: 'An extra Mathematics revision class is scheduled for Saturday 12 July, 10 AM, ahead of Unit Test 1.', audience: 'Class VIII-A', channel: 'App · SMS', by: 'Rahul Deshmukh', at: '2026-07-09 16:40', pinned: false },
  { id: 'AN-3', title: 'Fee Reminder — Term 1', body: 'Term 1 fees are due by 15 July. Please pay online via the Parent Portal to avoid a late fee. UPI, cards and net banking accepted.', audience: 'Parents (Dues)', channel: 'WhatsApp · SMS · Email', by: 'Accounts Office', at: '2026-07-08 11:00', pinned: false },
  { id: 'AN-4', title: 'Library Week', body: 'Library Week begins 14 July. Book fair, reading challenges and author interaction sessions all week.', audience: 'School-wide', channel: 'App', by: 'Librarian', at: '2026-07-07 13:20', pinned: false },
]

export const messages = [
  { id: 'M-1', with: 'Rahul Deshmukh (Class Teacher)', preview: 'Aarav has been doing very well in Science this term…', at: '10:24 AM', unread: true },
  { id: 'M-2', with: 'Accounts Office', preview: 'Your receipt for Term 1 fees is attached.', at: 'Yesterday', unread: false },
  { id: 'M-3', with: 'Priya Nair (Principal)', preview: 'Thank you for volunteering for the Sports Day.', at: '2 days ago', unread: false },
]

export const events = [
  { id: 'EV-1', title: 'Unit Test 1 begins', date: '2026-07-21', tag: 'Exam' },
  { id: 'EV-2', title: 'Annual Sports Day', date: '2026-07-25', tag: 'Event' },
  { id: 'EV-3', title: 'Parent–Teacher Meeting', date: '2026-08-02', tag: 'Meeting' },
  { id: 'EV-4', title: 'Independence Day', date: '2026-08-15', tag: 'Holiday' },
]

// --- Dashboard KPIs (admin) ------------------------------------------------
export const adminKpis = {
  students: 1284,
  teachers: 78,
  attendanceToday: 93,
  feesCollectedPct: 47,
  admissionsOpen: 7,
  pendingLeaves: 2,
}

export const gradeDistribution = [
  { grade: 'A1', count: 3 },
  { grade: 'A2', count: 2 },
  { grade: 'B1', count: 1 },
  { grade: 'B2', count: 1 },
  { grade: 'C1', count: 1 },
]

// Enrollment by grade band for the admin dashboard bar chart
export const enrollmentByGrade = [
  { band: 'Pre-Primary', count: 180 },
  { band: 'Primary (I–V)', count: 420 },
  { band: 'Middle (VI–VIII)', count: 356 },
  { band: 'Secondary (IX–X)', count: 228 },
  { band: 'Sr. Sec (XI–XII)', count: 100 },
]

export function findStudent(id) {
  return students.find((s) => s.id === id)
}
