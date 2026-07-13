// Tenant lifecycle: provision (create DB + schema + first admin), drop
// (delete DB), and resolve by domain / code. Each tenant = its own database.
import bcrypt from 'bcryptjs'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { env } from '../config/env.js'
import { master, tenantPool, closeTenantPool, rawConnection, run } from '../config/db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TENANT_SCHEMA = readFileSync(join(__dirname, '../db/tenant.sql'), 'utf8')

export function tenantDbName(code) {
  return env.db.tenantPrefix + String(code).toLowerCase().replace(/[^a-z0-9]/g, '_')
}

// Create the tenant's database, apply the per-tenant schema, register it in the
// master DB, and create its first admin user. Returns the master tenant row.
export async function provisionTenant({ name, code, domain, board, city, primaryColor, adminName, adminEmail, adminPassword }) {
  const dbName = tenantDbName(code)

  const conn = await rawConnection(true)
  try {
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4`)
    await conn.query(`USE \`${dbName}\``)
    await conn.query(TENANT_SCHEMA)
  } finally {
    await conn.end()
  }

  const res = await master.run(
    `INSERT INTO tenants (name, code, domain, db_name, board, city, primary_color)
     VALUES (:name, :code, :domain, :db, :board, :city, :color)`,
    { name, code, domain: domain || null, db: dbName, board: board || null, city: city || null, color: primaryColor || '#4F46E5' }
  )

  const pool = tenantPool(dbName)
  await run(pool, 'INSERT INTO users (role, name, email, password_hash) VALUES (\'admin\', :name, :email, :hash)',
    { name: adminName || 'School Admin', email: adminEmail, hash: bcrypt.hashSync(adminPassword, 10) })

  return master.get('SELECT * FROM tenants WHERE id = :id', { id: res.insertId })
}

// Drop a tenant: close its pool, drop its database, remove the registry row.
export async function dropTenant(tenantId) {
  const t = await master.get('SELECT * FROM tenants WHERE id = :id', { id: tenantId })
  if (!t) return false
  await closeTenantPool(t.db_name)
  const conn = await rawConnection()
  try { await conn.query(`DROP DATABASE IF EXISTS \`${t.db_name}\``) } finally { await conn.end() }
  await master.run('DELETE FROM tenants WHERE id = :id', { id: tenantId })
  return true
}

// Resolve a tenant for login: explicit code wins, else match the request host
// against the tenant's domain (e.g. greenwood.scholr.app).
export async function resolveTenantForLogin({ schoolCode, host }) {
  if (schoolCode) return master.get('SELECT * FROM tenants WHERE code = :c', { c: schoolCode })
  if (host) {
    const domain = String(host).split(':')[0].toLowerCase()
    return master.get('SELECT * FROM tenants WHERE domain = :d', { d: domain })
  }
  return null
}
