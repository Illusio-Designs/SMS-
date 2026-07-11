// Full module map for the 100% system. Each entry declares its icon (registry
// key), the roles that may see it, and a section for grouping in the sidebar.

export const ALL_NAV = [
  // Overview
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard', section: 'Overview', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/features', label: 'Features', icon: 'features', section: 'Overview', roles: ['admin', 'teacher', 'student', 'parent'] },

  // Academics
  { href: '/students', label: 'Students (SIS)', icon: 'students', section: 'Academics', roles: ['admin', 'teacher'] },
  { href: '/attendance', label: 'Attendance', icon: 'attendance', section: 'Academics', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/gradebook', label: 'Gradebook & Exams', icon: 'gradebook', section: 'Academics', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/assignments', label: 'Assignments (LMS)', icon: 'assignments', section: 'Academics', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/timetable', label: 'Timetable', icon: 'timetable', section: 'Academics', roles: ['admin', 'teacher', 'student', 'parent'] },

  // Operations
  { href: '/admissions', label: 'Admissions', icon: 'admissions', section: 'Operations', roles: ['admin'] },
  { href: '/fees', label: 'Fees', icon: 'fees', section: 'Operations', roles: ['admin', 'parent'] },
  { href: '/library', label: 'Library', icon: 'library', section: 'Operations', roles: ['admin', 'teacher', 'student'] },
  { href: '/transport', label: 'Transport', icon: 'transport', section: 'Operations', roles: ['admin', 'parent'] },
  { href: '/hostel', label: 'Hostel', icon: 'hostel', section: 'Operations', roles: ['admin'] },

  // People & insight
  { href: '/hr', label: 'HR & Payroll', icon: 'hr', section: 'People', roles: ['admin'] },
  { href: '/analytics', label: 'Analytics & AI', icon: 'analytics', section: 'People', roles: ['admin'] },
  { href: '/communication', label: 'Communication', icon: 'communication', section: 'People', roles: ['admin', 'teacher', 'student', 'parent'] },

  // System
  { href: '/settings', label: 'Settings', icon: 'settings', section: 'System', roles: ['admin'] },
]

export const SECTIONS = ['Overview', 'Academics', 'Operations', 'People', 'System']

export function navForRole(role) {
  return ALL_NAV.filter((n) => n.roles.includes(role))
}

export function groupedNavForRole(role) {
  const items = navForRole(role)
  return SECTIONS
    .map((section) => ({ section, items: items.filter((i) => i.section === section) }))
    .filter((g) => g.items.length > 0)
}

export const ROLE_LABELS = {
  admin: 'Administrator',
  teacher: 'Teacher',
  student: 'Student',
  parent: 'Parent',
}

export const ROLE_ICON = {
  admin: 'admin',
  teacher: 'teacher',
  student: 'student',
  parent: 'parent',
}
