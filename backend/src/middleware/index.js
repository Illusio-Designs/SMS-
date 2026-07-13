import { ApiError, verifyToken } from '../utils/helpers.js'
import { master, tenantPool } from '../config/db.js'

// Verify the bearer token, attaching req.auth.
//   platform super-admin: { kind: 'platform', sub, email }
//   tenant user:          { kind: 'tenant', sub, tenantId, dbName, code, role, email }
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

export function requirePlatform(req, _res, next) {
  if (req.auth?.kind !== 'platform') return next(new ApiError(403, 'Super-admin only'))
  next()
}

// Resolve the active tenant and attach its OWN database pool as req.db.
// - tenant user: from the token (tenantId).
// - super-admin: from `X-Tenant` header (school code or domain).
export async function resolveTenant(req, _res, next) {
  try {
    let tenant
    if (req.auth?.kind === 'tenant') {
      tenant = await master.get('SELECT * FROM tenants WHERE id = :id', { id: req.auth.tenantId })
      if (!tenant) return next(new ApiError(404, 'Tenant not found'))
      if (tenant.status !== 'active') return next(new ApiError(403, 'This school is suspended. Contact the administrator.'))
    } else if (req.auth?.kind === 'platform') {
      const key = req.headers['x-tenant']
      if (!key) return next(new ApiError(400, 'Super-admin must pass an X-Tenant header (school code or domain)'))
      tenant = await master.get('SELECT * FROM tenants WHERE code = :k OR domain = :k', { k: key })
      if (!tenant) return next(new ApiError(404, 'Tenant not found'))
    } else {
      return next(new ApiError(401, 'Not authenticated'))
    }
    req.tenant = tenant
    req.db = tenantPool(tenant.db_name) // every downstream query hits this tenant's DB only
    next()
  } catch (err) {
    next(err)
  }
}

// Restrict to specific tenant roles (super-admin bypasses).
export const requireRole = (...roles) => (req, _res, next) => {
  if (req.auth?.kind === 'platform') return next()
  if (!roles.includes(req.auth?.role)) return next(new ApiError(403, `Requires role: ${roles.join(', ')}`))
  next()
}

export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500
  if (status >= 500) console.error(err)
  res.status(status).json({ ok: false, error: err.message || 'Server error', details: err.details })
}
