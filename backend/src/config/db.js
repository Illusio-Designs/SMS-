import mysql from 'mysql2/promise'
import { env } from './env.js'

// Shared connection pool.
export const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true,
  multipleStatements: false,
})

// Thin helpers.
export async function query(sql, params = {}) {
  const [rows] = await pool.execute(sql, params)
  return rows
}

export async function queryOne(sql, params = {}) {
  const rows = await query(sql, params)
  return rows[0] || null
}

// Run a set of statements in a transaction.
export async function withTransaction(fn) {
  const conn = await pool.getConnection()
  try {
    await conn.beginTransaction()
    const result = await fn(conn)
    await conn.commit()
    return result
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
}
