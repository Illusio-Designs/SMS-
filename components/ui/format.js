// Shared formatting helpers used across the component library and pages.

export function inr(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN')
}

export function initials(name = '') {
  return name.split(' ').filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
}

export function fmtDate(d, opts = { day: '2-digit', month: 'short' }) {
  try {
    return new Date(d).toLocaleDateString('en-IN', opts)
  } catch {
    return d
  }
}

export function fmtDateLong(d) {
  return fmtDate(d, { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })
}
