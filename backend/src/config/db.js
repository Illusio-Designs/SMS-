import mysql from 'mysql2/promise'
import { env } from './env.js'

const base = {
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  waitForConnections: true,
  namedPlaceholders: true,
}

// Master (control-plane) pool — tenant registry + platform super-admins.
export const masterPool = mysql.createPool({ ...base, database: env.db.masterName, connectionLimit: 10 })

// One pool per tenant database, created lazily and cached.
const tenantPools = new Map()
export function tenantPool(dbName) {
  if (!tenantPools.has(dbName)) {
    tenantPools.set(dbName, mysql.createPool({ ...base, database: dbName, connectionLimit: 5 }))
  }
  return tenantPools.get(dbName)
}
export async function closeTenantPool(dbName) {
  const p = tenantPools.get(dbName)
  if (p) { await p.end().catch(() => {}); tenantPools.delete(dbName) }
}

// A short-lived raw connection with no database selected — used to
// CREATE / DROP DATABASE when provisioning or removing a tenant.
export function rawConnection(multipleStatements = false) {
  return mysql.createConnection({ host: base.host, port: base.port, user: base.user, password: base.password, multipleStatements })
}

// Pool-bound query helpers.
export async function run(pool, sql, params = {}) {
  const [rows] = await pool.execute(sql, params)
  return rows
}
export async function get(pool, sql, params = {}) {
  const rows = await run(pool, sql, params)
  return rows[0] || null
}

// Convenience wrappers for the master DB.
export const master = {
  run: (sql, params = {}) => run(masterPool, sql, params),
  get: (sql, params = {}) => get(masterPool, sql, params),
}

export async function closeAll() {
  await Promise.allSettled([masterPool.end(), ...[...tenantPools.values()].map((p) => p.end())])
}
