// Seeds a platform super-admin and two demo tenants (schools), each with an
// admin + teacher + student + parent and a few students / invoices.
// Usage: node src/db/seed.js
import bcrypt from 'bcryptjs'
import { pool, query, queryOne, withTransaction } from '../config/db.js'
import { env } from '../config/env.js'

const hash = (p) => bcrypt.hashSync(p, 10)

async function seedSuperAdmin() {
  const existing = await queryOne('SELECT id FROM platform_admins WHERE email = :email', { email: env.seed.superAdminEmail })
  if (existing) return console.log('· super-admin already exists')
  await query(
    'INSERT INTO platform_admins (name, email, password_hash) VALUES (:name, :email, :hash)',
    { name: 'Platform Admin', email: env.seed.superAdminEmail, hash: hash(env.seed.superAdminPassword) }
  )
  console.log(`✓ super-admin: ${env.seed.superAdminEmail} / ${env.seed.superAdminPassword}`)
}

async function seedSchool({ code, name, city, color, students }) {
  const exists = await queryOne('SELECT id FROM schools WHERE code = :code', { code })
  if (exists) { console.log(`· school ${code} already exists`); return }

  await withTransaction(async (conn) => {
    const [school] = await conn.execute(
      'INSERT INTO schools (name, code, board, city, primary_color) VALUES (:name, :code, :board, :city, :color)',
      { name, code, board: 'CBSE', city, color }
    )
    const schoolId = school.insertId

    const [cls] = await conn.execute(
      'INSERT INTO classes (school_id, name, section) VALUES (:sid, :n, :s)',
      { sid: schoolId, n: 'VIII', s: 'A' }
    )
    const classId = cls.insertId

    // users
    const users = [
      { role: 'admin', name: 'School Admin', email: `admin@${code}.edu.in` },
      { role: 'teacher', name: 'Class Teacher', email: `teacher@${code}.edu.in` },
      { role: 'parent', name: 'Parent User', email: `parent@${code}.edu.in` },
    ]
    for (const u of users) {
      await conn.execute(
        'INSERT INTO users (school_id, role, name, email, password_hash) VALUES (:sid, :role, :name, :email, :hash)',
        { sid: schoolId, role: u.role, name: u.name, email: u.email, hash: hash('demo1234') }
      )
    }

    // students (+ a student login for the first)
    let first = true
    for (const s of students) {
      const [st] = await conn.execute(
        `INSERT INTO students (school_id, admission_no, roll_no, name, gender, class_id, guardian_name, guardian_phone)
         VALUES (:sid, :adm, :roll, :name, :gender, :cid, :gname, :gphone)`,
        { sid: schoolId, adm: s.adm, roll: s.roll, name: s.name, gender: s.gender, cid: classId, gname: s.guardian, gphone: s.phone }
      )
      const studentId = st.insertId
      await conn.execute(
        `INSERT INTO fee_invoices (school_id, student_id, term, amount, paid, status, due_date, method)
         VALUES (:sid, :stid, 'Term 1', 38500, :paid, :status, '2026-07-15', :method)`,
        { sid: schoolId, stid: studentId, paid: s.paid, status: s.feeStatus, method: s.method }
      )
      if (first) {
        await conn.execute(
          'INSERT INTO users (school_id, role, name, email, password_hash, student_id) VALUES (:sid, :role, :name, :email, :hash, :stid)',
          { sid: schoolId, role: 'student', name: s.name, email: `student@${code}.edu.in`, hash: hash('demo1234'), stid: studentId }
        )
        first = false
      }
    }
    console.log(`✓ tenant '${code}' (${name}) with ${students.length} students + demo users`)
  })
}

async function main() {
  await seedSuperAdmin()

  await seedSchool({
    code: 'greenwood', name: 'Greenwood Public School', city: 'Pune', color: '#4F46E5',
    students: [
      { adm: 'STU-2401', roll: 12, name: 'Aarav Mehta', gender: 'male', guardian: 'Sunita Mehta', phone: '+91 98765 43210', paid: 38500, feeStatus: 'paid', method: 'UPI' },
      { adm: 'STU-2403', roll: 8, name: 'Kabir Singh', gender: 'male', guardian: 'Harpreet Singh', phone: '+91 99887 76655', paid: 0, feeStatus: 'overdue', method: null },
      { adm: 'STU-2404', roll: 15, name: 'Ananya Rao', gender: 'female', guardian: 'Lakshmi Rao', phone: '+91 98111 22233', paid: 38500, feeStatus: 'paid', method: 'Card' },
    ],
  })

  await seedSchool({
    code: 'riverside', name: 'Riverside International', city: 'Mumbai', color: '#0D9488',
    students: [
      { adm: 'RS-1001', roll: 1, name: 'Meera Kapoor', gender: 'female', guardian: 'Anil Kapoor', phone: '+91 90000 11111', paid: 0, feeStatus: 'due', method: null },
      { adm: 'RS-1002', roll: 2, name: 'Rohan Das', gender: 'male', guardian: 'Priya Das', phone: '+91 90000 22222', paid: 20000, feeStatus: 'partial', method: 'UPI' },
    ],
  })

  console.log('\nSeed complete. Two isolated tenants: greenwood, riverside.')
  await pool.end()
}

main().catch((err) => { console.error('seed failed:', err.message); process.exit(1) })
