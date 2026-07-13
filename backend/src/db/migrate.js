// Runs schema.sql against the configured MySQL database.
// Usage: node src/db/migrate.js [--fresh]   (--fresh drops tables first)
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import mysql from 'mysql2/promise'
import { env } from '../config/env.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fresh = process.argv.includes('--fresh')

const DROP_ORDER = ['fee_invoices', 'attendance', 'students', 'classes', 'users', 'platform_admins', 'schools']

async function main() {
  // Connect without a database first so we can create it if missing.
  const root = await mysql.createConnection({
    host: env.db.host, port: env.db.port, user: env.db.user,
    password: env.db.password, multipleStatements: true,
  })
  await root.query(`CREATE DATABASE IF NOT EXISTS \`${env.db.database}\` CHARACTER SET utf8mb4`)
  await root.query(`USE \`${env.db.database}\``)

  if (fresh) {
    await root.query('SET FOREIGN_KEY_CHECKS = 0')
    for (const t of DROP_ORDER) await root.query(`DROP TABLE IF EXISTS \`${t}\``)
    await root.query('SET FOREIGN_KEY_CHECKS = 1')
    console.log('· dropped existing tables (--fresh)')
  }

  const sql = readFileSync(join(__dirname, 'schema.sql'), 'utf8')
  await root.query(sql)
  console.log('✓ schema applied to database:', env.db.database)
  await root.end()
}

main().catch((err) => { console.error('migration failed:', err.message); process.exit(1) })
