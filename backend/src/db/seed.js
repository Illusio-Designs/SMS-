// Seeds a platform super-admin (master DB) and two demo tenants, each in its
// OWN database, with users + students + fee invoices.
// Usage: node src/db/seed.js
import bcrypt from 'bcryptjs'
import { master, tenantPool, run, get, closeAll } from '../config/db.js'
import { provisionTenant } from '../lib/tenants.js'
import { env } from '../config/env.js'

const hash = (p) => bcrypt.hashSync(p, 10)

async function seedSuperAdmin() {
  const existing = await master.get('SELECT id FROM platform_admins WHERE email = :email', { email: env.seed.superAdminEmail })
  if (existing) return console.log('· super-admin already exists')
  await master.run('INSERT INTO platform_admins (name, email, password_hash) VALUES (:name, :email, :hash)',
    { name: 'Platform Admin', email: env.seed.superAdminEmail, hash: hash(env.seed.superAdminPassword) })
  console.log(`✓ super-admin: ${env.seed.superAdminEmail} / ${env.seed.superAdminPassword}`)
}

async function seedTenant({ code, name, domain, city, color, students }) {
  if (await master.get('SELECT id FROM tenants WHERE code = :c', { c: code })) {
    return console.log(`· tenant ${code} already exists`)
  }
  const tenant = await provisionTenant({
    name, code, domain, city, board: 'CBSE', primaryColor: color,
    adminName: 'School Admin', adminEmail: `admin@${code}.edu.in`, adminPassword: 'demo1234',
  })
  const pool = tenantPool(tenant.db_name)

  const cls = await run(pool, "INSERT INTO classes (name, section) VALUES ('VIII','A')")
  const classId = cls.insertId

  for (const u of [['teacher', 'Class Teacher'], ['parent', 'Parent User']]) {
    await run(pool, 'INSERT INTO users (role, name, email, password_hash) VALUES (:role, :name, :email, :hash)',
      { role: u[0], name: u[1], email: `${u[0]}@${code}.edu.in`, hash: hash('demo1234') })
  }

  let first = true
  for (const s of students) {
    const st = await run(pool,
      `INSERT INTO students (admission_no, roll_no, name, gender, class_id, guardian_name, guardian_phone)
       VALUES (:adm, :roll, :name, :gender, :cid, :gname, :gphone)`,
      { adm: s.adm, roll: s.roll, name: s.name, gender: s.gender, cid: classId, gname: s.guardian, gphone: s.phone })
    await run(pool,
      `INSERT INTO fee_invoices (student_id, term, amount, paid, status, due_date, method)
       VALUES (:stid, 'Term 1', 38500, :paid, :status, '2026-07-15', :method)`,
      { stid: st.insertId, paid: s.paid, status: s.feeStatus, method: s.method })
    if (first) {
      await run(pool, 'INSERT INTO users (role, name, email, password_hash, student_id) VALUES (\'student\', :name, :email, :hash, :stid)',
        { name: s.name, email: `student@${code}.edu.in`, hash: hash('demo1234'), stid: st.insertId })
      first = false
    }
  }
  console.log(`✓ tenant '${code}' → db ${tenant.db_name} (${students.length} students, domain ${domain})`)
}

async function main() {
  await seedSuperAdmin()

  await seedTenant({
    code: 'greenwood', name: 'Greenwood Public School', domain: 'greenwood.scholr.app', city: 'Pune', color: '#4F46E5',
    students: [
      { adm: 'STU-2401', roll: 12, name: 'Aarav Mehta', gender: 'male', guardian: 'Sunita Mehta', phone: '+91 98765 43210', paid: 38500, feeStatus: 'paid', method: 'UPI' },
      { adm: 'STU-2403', roll: 8, name: 'Kabir Singh', gender: 'male', guardian: 'Harpreet Singh', phone: '+91 99887 76655', paid: 0, feeStatus: 'overdue', method: null },
      { adm: 'STU-2404', roll: 15, name: 'Ananya Rao', gender: 'female', guardian: 'Lakshmi Rao', phone: '+91 98111 22233', paid: 38500, feeStatus: 'paid', method: 'Card' },
    ],
  })

  await seedTenant({
    code: 'riverside', name: 'Riverside International', domain: 'riverside.scholr.app', city: 'Mumbai', color: '#0D9488',
    students: [
      { adm: 'RS-1001', roll: 1, name: 'Meera Kapoor', gender: 'female', guardian: 'Anil Kapoor', phone: '+91 90000 11111', paid: 0, feeStatus: 'due', method: null },
      { adm: 'RS-1002', roll: 2, name: 'Rohan Das', gender: 'male', guardian: 'Priya Das', phone: '+91 90000 22222', paid: 20000, feeStatus: 'partial', method: 'UPI' },
    ],
  })

  console.log('\nSeed complete. Two tenants, each in its own database.')
  await closeAll()
}

main().catch((err) => { console.error('seed failed:', err.message); process.exit(1) })
