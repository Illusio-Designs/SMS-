import dotenv from 'dotenv'
dotenv.config()

export const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  db: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'scholr',
    // Control-plane database (tenant registry + super-admins).
    masterName: process.env.DB_MASTER_NAME || 'scholr_master',
    // Per-tenant databases are named `${tenantPrefix}${code}`.
    tenantPrefix: process.env.TENANT_DB_PREFIX || 'scholr_t_',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'change-me-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  seed: {
    superAdminEmail: process.env.SEED_SUPERADMIN_EMAIL || 'superadmin@scholr.app',
    superAdminPassword: process.env.SEED_SUPERADMIN_PASSWORD || 'admin1234',
  },
}
