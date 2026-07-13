// Full module map for the 100% system. Each entry declares its icon (registry
// key), the roles that may see it, and a section for grouping in the sidebar.

export const ALL_NAV = [
  // Overview
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard', section: 'Overview', roles: ['admin', 'teacher', 'student', 'parent', 'finance', 'system'] },
  { href: '/features', label: 'Features', icon: 'features', section: 'Overview', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/calendar', label: 'Calendar', icon: 'calendar', section: 'Overview', roles: ['admin', 'teacher', 'student', 'parent'] },

  // System-admin (platform) console
  { href: '/schools', label: 'Schools', icon: 'school', section: 'Overview', roles: ['system'] },

  // Academics
  { href: '/students', label: 'Students (SIS)', icon: 'students', section: 'Academics', roles: ['admin', 'teacher'] },
  { href: '/attendance', label: 'Attendance', myLabel: 'My Attendance', icon: 'attendance', section: 'Academics', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/gradebook', label: 'Gradebook & Exams', myLabel: 'Exams & Results', icon: 'gradebook', section: 'Academics', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/assignments', label: 'Assignments (LMS)', myLabel: 'My Homework', icon: 'assignments', section: 'Academics', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/study-material', label: 'Study Material', icon: 'studyMaterial', section: 'Academics', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/infractions', label: 'Infractions', icon: 'infraction', section: 'Academics', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/timetable', label: 'Timetable', myLabel: 'My Time-Table', icon: 'timetable', section: 'Academics', roles: ['admin', 'teacher', 'student', 'parent'] },

  // Operations
  { href: '/admissions', label: 'Admissions', icon: 'admissions', section: 'Operations', roles: ['admin'] },
  { href: '/branches', label: 'Branches', icon: 'building', section: 'Operations', roles: ['admin', 'finance', 'system'] },
  { href: '/fees', label: 'Fees', myLabel: 'My Fees', icon: 'fees', section: 'Operations', roles: ['admin', 'parent', 'finance'] },
  { href: '/finance', label: 'Finance', icon: 'wallet', section: 'Operations', roles: ['finance'] },
  { href: '/library', label: 'Library', myLabel: 'Issue/Return Book', icon: 'library', section: 'Operations', roles: ['admin', 'teacher', 'student'] },
  { href: '/transport', label: 'Transport', myLabel: 'Map View', icon: 'transport', section: 'Operations', roles: ['admin', 'parent'] },
  { href: '/food-menu', label: 'Food Menu', icon: 'foodMenu', section: 'Operations', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/lost-found', label: 'Lost & Found', icon: 'lostFound', section: 'Operations', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/hostel', label: 'Hostel', icon: 'hostel', section: 'Operations', roles: ['admin'] },

  // People & insight
  { href: '/hr', label: 'HR & Payroll', icon: 'hr', section: 'People', roles: ['admin'] },
  { href: '/analytics', label: 'Analytics & AI', icon: 'analytics', section: 'People', roles: ['admin', 'finance'] },
  { href: '/gallery', label: 'Gallery', icon: 'gallery', section: 'People', roles: ['admin', 'teacher', 'student', 'parent'] },
  { href: '/communication', label: 'Communication', myLabel: 'Communicate', icon: 'communication', section: 'People', roles: ['admin', 'teacher', 'student', 'parent', 'finance'] },

  // System
  { href: '/audit', label: 'System Log', myLabel: 'My Activity', icon: 'view', section: 'System', roles: ['admin', 'teacher', 'student', 'parent', 'finance', 'system'] },
  { href: '/account', label: 'My Account', icon: 'account', section: 'System', roles: ['admin', 'teacher', 'student', 'parent', 'finance', 'system'] },
  { href: '/settings', label: 'Settings', icon: 'settings', section: 'System', roles: ['admin', 'system'] },
]

export const SECTIONS = ['Overview', 'Academics', 'Operations', 'People', 'System']

export const SECTION_ICON = {
  Overview: 'dashboard',
  Academics: 'studyMaterial',
  Operations: 'building',
  People: 'people',
  System: 'settings',
}

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
  finance: 'Financial Manager',
  system: 'System Admin',
}

export const ROLE_SHORT = {
  admin: 'Admin', teacher: 'Teacher', student: 'Student', parent: 'Parent', finance: 'Finance', system: 'System',
}

export const ROLE_ICON = {
  admin: 'admin',
  teacher: 'teacher',
  student: 'student',
  parent: 'parent',
  finance: 'wallet',
  system: 'settings',
}
