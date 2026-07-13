import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

// Wrap async route handlers so thrown errors reach the error middleware.
export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

// Typed API error.
export class ApiError extends Error {
  constructor(status, message, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

export const signToken = (payload) => jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn })
export const verifyToken = (token) => jwt.verify(token, env.jwt.secret)

export const ok = (res, data, status = 200) => res.status(status).json({ ok: true, data })
