'use client'

const TONE = {
  Paid: 'green', Present: 'green', Approved: 'green', Enrolled: 'green', PASS: 'green',
  Active: 'green', Published: 'green', 'Marks Published': 'green', Available: 'green',
  'On Time': 'green', 'In Service': 'green', Cleared: 'green', Returned: 'green',
  Due: 'amber', Partial: 'amber', Pending: 'amber', Draft: 'amber', Waitlist: 'amber',
  Late: 'amber', Issued: 'amber', Occupied: 'amber', Delayed: 'amber', 'On Leave': 'amber',
  Scheduled: 'blue', Offer: 'blue', Submitted: 'blue', 'In Progress': 'blue', New: 'blue',
  Overdue: 'red', Absent: 'red', Rejected: 'red', Defaulter: 'red', Maintenance: 'red',
  Vacant: 'red', Missing: 'red',
}

export function Badge({ children, tone, dot = true }) {
  const t = tone || TONE[children] || 'gray'
  return (
    <span className={`badge ${t}`}>
      {dot && <span className="dot" />}
      {children}
    </span>
  )
}

export default Badge
