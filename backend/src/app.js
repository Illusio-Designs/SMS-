import express from 'express'
import cors from 'cors'
import { errorHandler } from './middleware/index.js'
import { ApiError, ok } from './utils/helpers.js'

import authRoutes from './modules/auth.js'
import platformRoutes from './modules/platform.js'
import studentRoutes from './modules/students.js'
import attendanceRoutes from './modules/attendance.js'
import feeRoutes from './modules/fees.js'
import userRoutes from './modules/users.js'

export function createApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/health', (_req, res) => ok(res, { status: 'up', service: 'scholr-api' }))

  // Auth (tenant + platform login)
  app.use('/api/auth', authRoutes)
  // Platform super-admin: tenant management
  app.use('/api/platform', platformRoutes)
  // Tenant-scoped resources
  app.use('/api/students', studentRoutes)
  app.use('/api/attendance', attendanceRoutes)
  app.use('/api/fees', feeRoutes)
  app.use('/api/users', userRoutes)

  // 404 + errors
  app.use((_req, _res, next) => next(new ApiError(404, 'Route not found')))
  app.use(errorHandler)

  return app
}
