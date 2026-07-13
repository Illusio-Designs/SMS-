// Applies the MASTER schema (tenant registry + super-admins). Tenant databases
// are created on demand when a school is provisioned.
// Usage: node src/db/migrate.js [--fresh]
//   --fresh drops the master DB *and every tenant DB* (prefix match), then recreates.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { env } from '../config/env.js'
import { rawConnection } from '../config/db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fresh = process.argv.includes('--fresh')

async function main() {
  const conn = await rawConnection(true)

  if (fresh) {
    const [dbs] = await conn.query('SHOW DATABASES')
    const key = Object.keys(dbs[0] || { Database: '' })[0]
    for (const row of dbs) {
      const name = row[key]
      if (name === env.db.masterName || name.startsWith(env.db.tenantPrefix)) {
        await conn.query(`DROP DATABASE IF EXISTS \`${name}\``)
        console.log('· dropped', name)
      }
    }
  }

  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${env.db.masterName}\` CHARACTER SET utf8mb4`)
  await conn.query(`USE \`${env.db.masterName}\``)
  await conn.query(readFileSync(join(__dirname, 'master.sql'), 'utf8'))
  console.log('✓ master schema applied to', env.db.masterName)
  await conn.end()
}

main().catch((err) => { console.error('migration failed:', err.message); process.exit(1) })
