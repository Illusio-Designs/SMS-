// Navigation entries per role. Each portal exposes only the modules relevant
// to that role — matching the role-based portals in the PRD (§8).

export const ALL_NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: '▦', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/students', label: 'Students (SIS)', icon: '👤', roles: ['admin', 'teacher'] },
  { href: '/admissions', label: 'Admissions', icon: '📝', roles: ['admin'] },
  { href: '/attendance', label: 'Attendance', icon: '✔', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/gradebook', label: 'Gradebook & Exams', icon: '📊', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/fees', label: 'Fees', icon: '₹', roles: ['admin', 'parent'] },
  { href: '/communication', label: 'Communication', icon: '💬', roles: ['admin', 'teacher', 'student', 'parent'] },
]

export function navForRole(role) {
  return ALL_NAV.filter((n) => n.roles.includes(role))
}

export const ROLE_LABELS = {
  admin: 'Administrator',
  teacher: 'Teacher',
  student: 'Student',
  parent: 'Parent',
}

export const ROLE_ACCENT = {
  admin: '#4f46e5',
  teacher: '#0d9488',
  student: '#d97706',
  parent: '#db2777',
}
