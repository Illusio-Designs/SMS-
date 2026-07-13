import { ApiError, verifyToken } from '../utils/helpers.js'
import { queryOne } from '../config/db.js'

// Extract & verify the bearer token, attaching req.auth.
// Token shapes:
//   platform super-admin: { kind: 'platform', sub, email }
//   tenant user:          { kind: 'tenant', sub, schoolId, role, email }
export function authenticate(req, _res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return next(new ApiError(401, 'Missing bearer token'))
  try {
    req.auth = verifyToken(token)
    next()
  } catch {
    next(new ApiError(401, 'Invalid or expired token'))
  }
}

// Require a platform super-admin.
export function requirePlatform(req, _res, next) {
  if (req.auth?.kind !== 'platform') return next(new ApiError(403, 'Super-admin only'))
  next()
}

// Resolve the active tenant for a tenant user and guard tenant status.
// Sets req.schoolId. A platform admin may act inside a tenant by sending
// the `X-School-Id` header.
export async function resolveTenant(req, _res, next) {
  try {
    let schoolId
    if (req.auth?.kind === 'tenant') {
      schoolId = req.auth.schoolId
    } else if (req.auth?.kind === 'platform') {
      schoolId = Number(req.headers['x-school-id'])
      if (!schoolId) return next(new ApiError(400, 'Super-admin must pass X-School-Id header'))
    } else {
      return next(new ApiError(401, 'Not authenticated'))
    }

    const school = await queryOne('SELECT id, status FROM schools WHERE id = :id', { id: schoolId })
    if (!school) return next(new ApiError(404, 'School (tenant) not found'))
    if (school.status !== 'active' && req.auth.kind === 'tenant') {
      return next(new ApiError(403, 'This school is suspended. Contact the administrator.'))
    }
    req.schoolId = schoolId
    next()
  } catch (err) {
    next(err)
  }
}

// Restrict to specific tenant roles.
export const requireRole = (...roles) => (req, _res, next) => {
  if (req.auth?.kind === 'platform') return next() // super-admin bypass
  if (!roles.includes(req.auth?.role)) return next(new ApiError(403, `Requires role: ${roles.join(', ')}`))
  next()
}

// Central error handler.
export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500
  if (status >= 500) console.error(err)
  res.status(status).json({ ok: false, error: err.message || 'Server error', details: err.details })
}
