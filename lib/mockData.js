// ---------------------------------------------------------------------------
// Scholr — Mock Data
// Single-school, India context. All data here is fabricated for the demo UI.
// ---------------------------------------------------------------------------

export const school = {
  name: 'Greenwood Public School',
  board: 'CBSE',
  city: 'Pune, Maharashtra',
  session: '2026–27',
}

// --- Users / roles for the portal switcher ---------------------------------
export const users = [
  {
    id: 'u-admin',
    role: 'admin',
    name: 'Priya Nair',
    title: 'Principal',
    email: 'priya.nair@greenwood.edu.in',
    avatar: 'PN',
  },
  {
    id: 'u-teacher',
    role: 'teacher',
    name: 'Rahul Deshmukh',
    title: 'Class Teacher — VIII-A · Mathematics',
    email: 'rahul.d@greenwood.edu.in',
    avatar: 'RD',
    classTeacherOf: 'VIII-A',
  },
  {
    id: 'u-student',
    role: 'student',
    name: 'Aarav Mehta',
    title: 'Class VIII-A · Roll 12',
    email: 'aarav.m@greenwood.edu.in',
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
    email: 'aarav.m@greenwood.edu.in', address: '14 Rose Villa, Kothrud, Pune',
    admissionDate: '2018-06-12', status: 'Active', attendancePct: 94, avgGrade: 'A2',
    feeStatus: 'Paid',
  },
  {
    id: 'STU-2402', roll: 4, name: 'Diya Mehta', grade: 'V', section: 'B',
    gender: 'Female', dob: '2015-09-02', bloodGroup: 'B+', house: 'Ruby',
    guardian: 'Sunita Mehta', guardianPhone: '+91 98765 43210',
    email: 'diya.m@greenwood.edu.in', address: '14 Rose Villa, Kothrud, Pune',
    admissionDate: '2021-06-10', status: 'Active', attendancePct: 97, avgGrade: 'A1',
    feeStatus: 'Due',
  },
  {
    id: 'STU-2403', roll: 8, name: 'Kabir Singh', grade: 'VIII', section: 'A',
    gender: 'Male', dob: '2012-01-25', bloodGroup: 'O+', house: 'Sapphire',
    guardian: 'Harpreet Singh', guardianPhone: '+91 99887 76655',
    email: 'kabir.s@greenwood.edu.in', address: '22 Green Park, Baner, Pune',
    admissionDate: '2018-06-12', status: 'Active', attendancePct: 88, avgGrade: 'B1',
    feeStatus: 'Overdue',
  },
  {
    id: 'STU-2404', roll: 15, name: 'Ananya Rao', grade: 'VIII', section: 'A',
    gender: 'Female', dob: '2012-07-11', bloodGroup: 'A+', house: 'Emerald',
    guardian: 'Lakshmi Rao', guardianPhone: '+91 98111 22233',
    email: 'ananya.r@greenwood.edu.in', address: '5 Lake View, Aundh, Pune',
    admissionDate: '2018-06-12', status: 'Active', attendancePct: 99, avgGrade: 'A1',
    feeStatus: 'Paid',
  },
  {
    id: 'STU-2405', roll: 3, name: 'Ishaan Verma', grade: 'VIII', section: 'A',
    gender: 'Male', dob: '2012-11-30', bloodGroup: 'AB+', house: 'Ruby',
    guardian: 'Nikhil Verma', guardianPhone: '+91 97000 11122',
    email: 'ishaan.v@greenwood.edu.in', address: '8 Hill Road, Viman Nagar, Pune',
    admissionDate: '2019-06-15', status: 'Active', attendancePct: 76, avgGrade: 'C1',
    feeStatus: 'Due',
  },
  {
    id: 'STU-2406', roll: 21, name: 'Zara Khan', grade: 'X', section: 'C',
    gender: 'Female', dob: '2010-03-14', bloodGroup: 'O-', house: 'Sapphire',
    guardian: 'Imran Khan', guardianPhone: '+91 98220 33445',
    email: 'zara.k@greenwood.edu.in', address: '31 Palm Grove, Wakad, Pune',
    admissionDate: '2016-06-14', status: 'Active', attendancePct: 91, avgGrade: 'A2',
    feeStatus: 'Paid',
  },
  {
    id: 'STU-2407', roll: 9, name: 'Vivaan Joshi', grade: 'X', section: 'C',
    gender: 'Male', dob: '2010-08-22', bloodGroup: 'B-', house: 'Emerald',
    guardian: 'Meera Joshi', guardianPhone: '+91 90011 55667',
    email: 'vivaan.j@greenwood.edu.in', address: '2 Sunrise Apts, Hinjewadi, Pune',
    admissionDate: '2016-06-14', status: 'Active', attendancePct: 84, avgGrade: 'B2',
    feeStatus: 'Overdue',
  },
  {
    id: 'STU-2408', roll: 6, name: 'Myra Patel', grade: 'V', section: 'B',
    gender: 'Female', dob: '2015-12-05', bloodGroup: 'A-', house: 'Ruby',
    guardian: 'Rakesh Patel', guardianPhone: '+91 98334 66778',
    email: 'myra.p@greenwood.edu.in', address: '19 Orchid Lane, Kharadi, Pune',
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

// ===========================================================================
// Extended modules (100% system) — Timetable, Assignments/LMS, Library,
// Transport, Hostel, HR & Payroll, Analytics/AI, Settings.
// ===========================================================================

// --- Timetable (VIII-A weekly grid) ----------------------------------------
export const periods = [
  '08:15–09:00', '09:00–09:45', '09:45–10:30', '10:30–10:45', '10:45–11:30', '11:30–12:15', '12:15–01:00',
]
export const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const S = (subject, teacher, room) => ({ subject, teacher, room })
const BREAK = { subject: 'Short Break', teacher: '', room: '', isBreak: true }

export const timetableGrid = {
  Mon: [S('Mathematics', 'R. Deshmukh', '201'), S('Science', 'S. Iyer', 'Lab-2'), S('English', 'A. Fernandes', '201'), BREAK, S('Hindi', 'P. Sharma', '201'), S('Social Science', 'M. Bose', '201'), S('Computer', 'K. Rao', 'Lab-1')],
  Tue: [S('English', 'A. Fernandes', '201'), S('Mathematics', 'R. Deshmukh', '201'), S('Science', 'S. Iyer', 'Lab-2'), BREAK, S('Art', 'N. Kulkarni', 'Art'), S('Hindi', 'P. Sharma', '201'), S('P.E.', 'V. Rathod', 'Ground')],
  Wed: [S('Science', 'S. Iyer', 'Lab-2'), S('Social Science', 'M. Bose', '201'), S('Mathematics', 'R. Deshmukh', '201'), BREAK, S('English', 'A. Fernandes', '201'), S('Computer', 'K. Rao', 'Lab-1'), S('Library', 'Librarian', 'Library')],
  Thu: [S('Mathematics', 'R. Deshmukh', '201'), S('Hindi', 'P. Sharma', '201'), S('Science', 'S. Iyer', 'Lab-2'), BREAK, S('Social Science', 'M. Bose', '201'), S('English', 'A. Fernandes', '201'), S('Music', 'D. Menon', 'Music')],
  Fri: [S('Social Science', 'M. Bose', '201'), S('English', 'A. Fernandes', '201'), S('Mathematics', 'R. Deshmukh', '201'), BREAK, S('Science', 'S. Iyer', 'Lab-2'), S('Hindi', 'P. Sharma', '201'), S('Computer', 'K. Rao', 'Lab-1')],
  Sat: [S('Art', 'N. Kulkarni', 'Art'), S('P.E.', 'V. Rathod', 'Ground'), S('Mathematics', 'R. Deshmukh', '201'), BREAK, S('English', 'A. Fernandes', '201'), S('Class Activity', 'R. Deshmukh', '201'), S('Assembly', '—', 'Hall')],
}

// --- Assignments (LMS) -----------------------------------------------------
export const assignments = [
  { id: 'AS-101', title: 'Algebra — Linear Equations Worksheet', subject: 'Mathematics', class: 'VIII-A', assigned: '2026-07-08', due: '2026-07-14', submitted: 4, total: 5, status: 'In Progress', source: 'Google Classroom', points: 20 },
  { id: 'AS-102', title: 'Science Project — Photosynthesis Model', subject: 'Science', class: 'VIII-A', assigned: '2026-07-05', due: '2026-07-19', submitted: 2, total: 5, status: 'In Progress', source: 'In-app', points: 50 },
  { id: 'AS-103', title: 'English Essay — My Role Model', subject: 'English', class: 'VIII-A', assigned: '2026-07-01', due: '2026-07-07', submitted: 5, total: 5, status: 'Cleared', source: 'In-app', points: 25 },
  { id: 'AS-104', title: 'Hindi — व्याकरण अभ्यास', subject: 'Hindi', class: 'VIII-A', assigned: '2026-07-09', due: '2026-07-15', submitted: 1, total: 5, status: 'New', source: 'In-app', points: 15 },
]

// Per-student assignment view (Aarav)
export const myAssignments = [
  { id: 'AS-101', title: 'Algebra — Linear Equations Worksheet', subject: 'Mathematics', due: '2026-07-14', status: 'Submitted', grade: '18/20' },
  { id: 'AS-102', title: 'Science Project — Photosynthesis Model', subject: 'Science', due: '2026-07-19', status: 'Pending', grade: '—' },
  { id: 'AS-103', title: 'English Essay — My Role Model', subject: 'English', due: '2026-07-07', status: 'Returned', grade: '23/25' },
  { id: 'AS-104', title: 'Hindi — व्याकरण अभ्यास', subject: 'Hindi', due: '2026-07-15', status: 'Pending', grade: '—' },
]

// --- Library ---------------------------------------------------------------
export const librarySummary = { titles: 8420, copies: 15200, issued: 1240, overdue: 38, members: 1362 }

export const libraryCatalog = [
  { id: 'BK-001', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Biography', copies: 6, available: 2, status: 'Available' },
  { id: 'BK-002', title: 'The Diary of a Young Girl', author: 'Anne Frank', category: 'Memoir', copies: 4, available: 0, status: 'Issued' },
  { id: 'BK-003', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', copies: 5, available: 3, status: 'Available' },
  { id: 'BK-004', title: 'Malgudi Days', author: 'R.K. Narayan', category: 'Fiction', copies: 8, available: 5, status: 'Available' },
  { id: 'BK-005', title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', copies: 6, available: 0, status: 'Issued' },
  { id: 'BK-006', title: 'NCERT Mathematics VIII', author: 'NCERT', category: 'Textbook', copies: 60, available: 12, status: 'Available' },
]

export const libraryIssued = [
  { id: 'LI-01', book: 'The Alchemist', member: 'Aarav Mehta', class: 'VIII-A', issued: '2026-06-28', due: '2026-07-12', status: 'Issued' },
  { id: 'LI-02', book: 'The Diary of a Young Girl', member: 'Ananya Rao', class: 'VIII-A', issued: '2026-06-20', due: '2026-07-04', status: 'Overdue' },
  { id: 'LI-03', book: 'Malgudi Days', member: 'Zara Khan', class: 'X-C', issued: '2026-07-01', due: '2026-07-15', status: 'Issued' },
  { id: 'LI-04', book: 'Wings of Fire', member: 'Kabir Singh', class: 'VIII-A', issued: '2026-06-15', due: '2026-06-29', status: 'Returned' },
]

// --- Transport -------------------------------------------------------------
export const transportSummary = { routes: 14, buses: 16, students: 640, onTime: 96 }

export const busRoutes = [
  { id: 'RT-01', name: 'Route 1 — Kothrud', bus: 'MH-12-AB-1101', driver: 'S. Pawar', stops: 8, students: 42, status: 'In Service', eta: '07:45 AM', occupancy: 88 },
  { id: 'RT-02', name: 'Route 2 — Baner', bus: 'MH-12-AB-1102', driver: 'R. Gaikwad', stops: 6, students: 36, status: 'In Service', eta: '07:52 AM', occupancy: 75 },
  { id: 'RT-03', name: 'Route 3 — Aundh', bus: 'MH-12-AB-1103', driver: 'A. Shinde', stops: 7, students: 40, status: 'Delayed', eta: '08:05 AM', occupancy: 83 },
  { id: 'RT-04', name: 'Route 4 — Wakad', bus: 'MH-12-AB-1104', driver: 'M. Jadhav', stops: 9, students: 45, status: 'In Service', eta: '07:48 AM', occupancy: 94 },
  { id: 'RT-05', name: 'Route 5 — Hinjewadi', bus: 'MH-12-AB-1105', driver: 'K. More', stops: 10, students: 48, status: 'Maintenance', eta: '—', occupancy: 0 },
]

// Parent's child transport assignment
export const myTransport = {
  student: 'Aarav Mehta', route: 'Route 1 — Kothrud', bus: 'MH-12-AB-1101', driver: 'S. Pawar',
  driverPhone: '+91 90000 12345', stop: 'Rose Villa, Kothrud', pickup: '07:20 AM', drop: '03:40 PM', eta: '07:22 AM', status: 'On Time',
  speed: 32, // km/h
  // Live GPS tracker share link (IOPGPS device on the bus).
  trackingUrl: 'https://www.iopgps.com/main.html#/tracking?token=ODYwODcxMDgwMDE2NDgxfDNiNDdkZjgyYWRmYTQ5YjI4MDAwOTVmNmVkYWFhOTI0fGVu&isLocationShare=1',
  // Ordered stops along the morning route; `home` marks the child's stop.
  stops: [
    { name: 'Depot / School', time: '07:00 AM', home: false },
    { name: 'Karve Nagar Circle', time: '07:10 AM', home: false },
    { name: 'Rose Villa, Kothrud', time: '07:22 AM', home: true },
    { name: 'Mayur Colony', time: '07:31 AM', home: false },
    { name: 'Deccan Corner', time: '07:44 AM', home: false },
    { name: 'Greenwood Public School', time: '08:00 AM', home: false },
  ],
}

// --- Hostel ----------------------------------------------------------------
export const hostelSummary = { blocks: 3, rooms: 120, capacity: 480, occupied: 356, vacant: 124 }

export const hostelRooms = [
  { id: 'H-A101', block: 'Boys A', room: '101', capacity: 4, occupied: 4, warden: 'Mr. Kale', status: 'Occupied' },
  { id: 'H-A102', block: 'Boys A', room: '102', capacity: 4, occupied: 3, warden: 'Mr. Kale', status: 'Occupied' },
  { id: 'H-B201', block: 'Girls B', room: '201', capacity: 4, occupied: 4, warden: 'Ms. Nair', status: 'Occupied' },
  { id: 'H-B202', block: 'Girls B', room: '202', capacity: 4, occupied: 0, warden: 'Ms. Nair', status: 'Vacant' },
  { id: 'H-C301', block: 'Senior C', room: '301', capacity: 2, occupied: 2, warden: 'Mr. Rao', status: 'Occupied' },
]

export const messMenu = [
  { day: 'Monday', breakfast: 'Poha, Banana, Milk', lunch: 'Dal, Rice, Chapati, Sabzi', dinner: 'Paneer, Chapati, Salad' },
  { day: 'Tuesday', breakfast: 'Idli, Sambar, Chutney', lunch: 'Rajma, Rice, Chapati', dinner: 'Veg Pulao, Raita' },
  { day: 'Wednesday', breakfast: 'Upma, Fruit, Milk', lunch: 'Chole, Rice, Chapati', dinner: 'Mixed Veg, Chapati, Kheer' },
]

// --- HR & Payroll ----------------------------------------------------------
export const hrSummary = { staff: 96, teaching: 78, nonTeaching: 18, payrollMonthly: 4820000, onLeave: 3 }

export const staff = [
  { id: 'EMP-001', name: 'Priya Nair', role: 'Principal', dept: 'Administration', salary: 145000, attendance: 100, status: 'Active' },
  { id: 'EMP-014', name: 'Rahul Deshmukh', role: 'TGT Mathematics', dept: 'Academics', salary: 62000, attendance: 96, status: 'Active' },
  { id: 'EMP-018', name: 'Sunita Iyer', role: 'PGT Science', dept: 'Academics', salary: 68000, attendance: 98, status: 'Active' },
  { id: 'EMP-022', name: 'Anthony Fernandes', role: 'TGT English', dept: 'Academics', salary: 60000, attendance: 92, status: 'On Leave' },
  { id: 'EMP-031', name: 'Kiran Rao', role: 'Computer Instructor', dept: 'Academics', salary: 54000, attendance: 97, status: 'Active' },
  { id: 'EMP-045', name: 'Sanjay Pawar', role: 'Bus Driver', dept: 'Transport', salary: 28000, attendance: 95, status: 'Active' },
  { id: 'EMP-052', name: 'Meena Kale', role: 'Accountant', dept: 'Accounts', salary: 48000, attendance: 99, status: 'Active' },
]

export const payrollRuns = [
  { id: 'PR-2607', month: 'July 2026', staff: 96, gross: 4820000, deductions: 620000, net: 4200000, status: 'Draft' },
  { id: 'PR-2606', month: 'June 2026', staff: 95, gross: 4760000, deductions: 610000, net: 4150000, status: 'Paid' },
  { id: 'PR-2605', month: 'May 2026', staff: 95, gross: 4760000, deductions: 610000, net: 4150000, status: 'Paid' },
]

// --- Analytics & AI --------------------------------------------------------
export const analyticsKpis = { avgAttendance: 94, avgScore: 78, passRate: 97, atRisk: 6, dropoutRisk: 2 }

export const performanceTrend = [
  { label: 'PT-1', v: 72 }, { label: 'UT-1', v: 75 }, { label: 'Mid', v: 74 },
  { label: 'PT-2', v: 79 }, { label: 'UT-2', v: 81 }, { label: 'Final', v: 83 },
]

export const atRiskStudents = [
  { name: 'Ishaan Verma', class: 'VIII-A', attendance: 76, avg: 58, risk: 'High', reason: 'Attendance + falling scores', likelihood: 62 },
  { name: 'Vivaan Joshi', class: 'X-C', attendance: 84, avg: 64, risk: 'Medium', reason: 'Declining Math/Science', likelihood: 74 },
  { name: 'Kabir Singh', class: 'VIII-A', attendance: 88, avg: 68, risk: 'Medium', reason: 'Missed 3 assignments', likelihood: 79 },
]

export const aiInsights = [
  { title: 'Early learning-gap detection', body: 'Grade VIII Mathematics shows a 9-point dip in "Algebra" vs. class average. Recommend a targeted revision session.', tone: 'amber', icon: 'chart' },
  { title: 'Attendance intervention', body: '6 students trending below 80% attendance this month — flagged for counselor follow-up (no profiling; DPDP-safe).', tone: 'red', icon: 'alert' },
  { title: 'Positive momentum', body: 'Class average is up 4% over the last two assessments across the middle school.', tone: 'green', icon: 'badge' },
]

export const subjectMastery = [
  { band: 'English', count: 84 }, { band: 'Maths', count: 74 }, { band: 'Science', count: 80 },
  { band: 'Social', count: 77 }, { band: 'Hindi', count: 88 }, { band: 'Computer', count: 91 },
]

// --- Settings / RBAC / config ----------------------------------------------
export const rolePermissions = [
  { module: 'Student Records (SIS)', admin: 'Full', teacher: 'Class only', student: 'Self', parent: 'Child only' },
  { module: 'Attendance', admin: 'Full', teacher: 'Mark & view', student: 'View', parent: 'View' },
  { module: 'Gradebook & Exams', admin: 'Full', teacher: 'Enter & publish', student: 'View', parent: 'View' },
  { module: 'Fees', admin: 'Full', teacher: 'None', student: 'None', parent: 'View & pay' },
  { module: 'Admissions', admin: 'Full', teacher: 'None', student: 'None', parent: 'None' },
  { module: 'HR & Payroll', admin: 'Full', teacher: 'Self', student: 'None', parent: 'None' },
  { module: 'Communication', admin: 'Broadcast', teacher: 'Class & parents', student: 'View', parent: 'Message teachers' },
]

export const staffUsers = [
  { id: 'u-001', name: 'Priya Nair', email: 'priya.nair@greenwood.edu.in', role: 'Administrator', mfa: true, lastActive: 'Just now' },
  { id: 'u-002', name: 'Rahul Deshmukh', email: 'rahul.d@greenwood.edu.in', role: 'Teacher', mfa: true, lastActive: '2h ago' },
  { id: 'u-003', name: 'Sunita Iyer', email: 'sunita.i@greenwood.edu.in', role: 'Teacher', mfa: false, lastActive: 'Yesterday' },
  { id: 'u-004', name: 'Meena Kale', email: 'meena.k@greenwood.edu.in', role: 'Office Staff', mfa: true, lastActive: '3d ago' },
]

export const integrations = [
  { name: 'Razorpay', purpose: 'Fee payments (UPI, cards, net banking)', status: 'Connected', tone: 'green' },
  { name: 'WhatsApp Business API', purpose: 'Parent notifications', status: 'Connected', tone: 'green' },
  { name: 'SMS Gateway', purpose: 'Alerts & OTP', status: 'Connected', tone: 'green' },
  { name: 'Google Sign-in', purpose: 'Staff & student SSO', status: 'Connected', tone: 'green' },
  { name: 'Google Classroom', purpose: 'LMS / assignments', status: 'Connected', tone: 'green' },
  { name: 'Biometric / RFID', purpose: 'Attendance devices', status: 'Not configured', tone: 'amber' },
]

export const schoolConfig = {
  name: 'Greenwood Public School',
  board: 'CBSE',
  academicYear: '2026–27',
  address: 'Survey 42, Kothrud, Pune, Maharashtra 411038',
  phone: '+91 20 2500 1234',
  email: 'office@greenwood.edu.in',
  gradingScale: 'CBSE (A1–E) · CGPA on 10-point scale',
  currency: 'INR (₹)',
  dataResidency: 'India (Mumbai region) — DPDP Act 2023 compliant',
  terms: ['Term 1 (Apr–Sep)', 'Term 2 (Oct–Mar)'],
}

// ===========================================================================
// Parent/Student portal additions — Study Material, Infractions, Gallery,
// Food Menu, Lost & Found, Calendar, My Account.
// ===========================================================================

// --- Study Material / Lessons ----------------------------------------------
export const studyMaterials = [
  { id: 'SM-01', title: 'Algebra — Chapter 3 Notes', subject: 'Mathematics', type: 'PDF', size: '1.2 MB', uploaded: '2026-07-09', by: 'R. Deshmukh' },
  { id: 'SM-02', title: 'Photosynthesis — Slides', subject: 'Science', type: 'PPT', size: '3.4 MB', uploaded: '2026-07-08', by: 'S. Iyer' },
  { id: 'SM-03', title: 'The French Revolution — Summary', subject: 'Social Science', type: 'PDF', size: '900 KB', uploaded: '2026-07-06', by: 'M. Bose' },
  { id: 'SM-04', title: 'Grammar — Tenses Worksheet', subject: 'English', type: 'DOC', size: '210 KB', uploaded: '2026-07-05', by: 'A. Fernandes' },
  { id: 'SM-05', title: 'Intro to Python — Video Lesson', subject: 'Computer', type: 'Video', size: '58 MB', uploaded: '2026-07-04', by: 'K. Rao' },
  { id: 'SM-06', title: 'व्याकरण — संधि', subject: 'Hindi', type: 'PDF', size: '640 KB', uploaded: '2026-07-02', by: 'P. Sharma' },
]

// --- Infractions / Discipline ----------------------------------------------
export const infractions = [
  { id: 'IF-11', student: 'Aarav Mehta', class: 'VIII-A', date: '2026-07-06', type: 'Late to class', points: 1, note: 'Arrived 10 min late to first period.', by: 'R. Deshmukh', status: 'Recorded' },
  { id: 'IF-12', student: 'Aarav Mehta', class: 'VIII-A', date: '2026-06-20', type: 'Homework not submitted', points: 2, note: 'Maths worksheet not submitted on time.', by: 'R. Deshmukh', status: 'Resolved' },
  { id: 'IF-09', student: 'Kabir Singh', class: 'VIII-A', date: '2026-07-03', type: 'Uniform', points: 1, note: 'Incomplete uniform — ID card missing.', by: 'Office', status: 'Recorded' },
]

export const infractionSummary = { total: 3, points: 3, thisMonth: 2, positive: 5 }

// --- Gallery ---------------------------------------------------------------
export const galleryAlbums = [
  { id: 'AL-1', title: 'Annual Sports Day 2026', date: '2026-01-25', count: 48, colors: ['#4f46e5', '#0d9488', '#d97706', '#db2777', '#2563eb', '#16a34a'] },
  { id: 'AL-2', title: 'Science Exhibition', date: '2026-02-14', count: 32, colors: ['#0d9488', '#7c3aed', '#dc2626', '#2563eb'] },
  { id: 'AL-3', title: 'Independence Day', date: '2025-08-15', count: 26, colors: ['#d97706', '#16a34a', '#2563eb', '#db2777'] },
  { id: 'AL-4', title: 'Annual Day Cultural', date: '2025-12-20', count: 61, colors: ['#db2777', '#4f46e5', '#0891b2', '#d97706'] },
  { id: 'AL-5', title: 'Field Trip — Science Park', date: '2026-03-10', count: 40, colors: ['#059669', '#2563eb', '#7c3aed'] },
  { id: 'AL-6', title: 'Republic Day Parade', date: '2026-01-26', count: 22, colors: ['#e11d48', '#0d9488', '#d97706', '#2563eb'] },
]

// --- Food Menu (canteen, weekly) -------------------------------------------
export const foodMenuWeek = [
  { day: 'Monday', breakfast: 'Poha, Banana, Milk', lunch: 'Dal, Jeera Rice, Chapati, Aloo-Gobi, Salad', snack: 'Fruit & Biscuits' },
  { day: 'Tuesday', breakfast: 'Idli, Sambar, Coconut Chutney', lunch: 'Rajma, Rice, Chapati, Curd', snack: 'Vegetable Sandwich' },
  { day: 'Wednesday', breakfast: 'Upma, Sprouts, Milk', lunch: 'Chole, Rice, Chapati, Green Salad', snack: 'Sheera & Milk' },
  { day: 'Thursday', breakfast: 'Paratha, Curd, Pickle', lunch: 'Mixed Veg, Dal, Rice, Chapati', snack: 'Poha & Tea' },
  { day: 'Friday', breakfast: 'Dosa, Sambar, Chutney', lunch: 'Veg Pulao, Raita, Papad', snack: 'Fruit Chaat' },
]

// --- Lost & Found ----------------------------------------------------------
export const lostFound = [
  { id: 'LF-21', item: 'Blue water bottle', category: 'Personal', foundAt: 'Playground', date: '2026-07-10', status: 'Unclaimed' },
  { id: 'LF-22', item: 'Mathematics textbook (Class VIII)', category: 'Books', foundAt: 'Room 201', date: '2026-07-09', status: 'Unclaimed' },
  { id: 'LF-20', item: 'Grey school sweater', category: 'Clothing', foundAt: 'Bus Route 1', date: '2026-07-07', status: 'Claimed' },
  { id: 'LF-19', item: 'Wristwatch', category: 'Valuables', foundAt: 'Library', date: '2026-07-05', status: 'Unclaimed' },
  { id: 'LF-18', item: 'Lunch box (steel)', category: 'Personal', foundAt: 'Canteen', date: '2026-07-03', status: 'Claimed' },
]

// --- Calendar (extended events for a standalone page) -----------------------
export const calendarEvents = [
  { id: 'CE-1', title: 'Unit Test 1 begins', date: '2026-07-21', tag: 'Exam' },
  { id: 'CE-2', title: 'Annual Sports Day', date: '2026-07-25', tag: 'Event' },
  { id: 'CE-3', title: 'Parent–Teacher Meeting', date: '2026-08-02', tag: 'Meeting' },
  { id: 'CE-4', title: 'Independence Day', date: '2026-08-15', tag: 'Holiday' },
  { id: 'CE-5', title: 'Library Week', date: '2026-07-14', tag: 'Event' },
  { id: 'CE-6', title: 'Term 1 Fees due', date: '2026-07-15', tag: 'Fees' },
  { id: 'CE-7', title: 'Science Exhibition', date: '2026-08-22', tag: 'Event' },
  { id: 'CE-8', title: 'Mid-Term Exam', date: '2026-09-08', tag: 'Exam' },
  { id: 'CE-9', title: 'Ganesh Chaturthi (Holiday)', date: '2026-08-27', tag: 'Holiday' },
]
