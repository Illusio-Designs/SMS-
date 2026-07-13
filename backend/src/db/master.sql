-- =====================================================================
-- Scholr — MASTER (control-plane) schema.
-- Holds the tenant registry and platform super-admins only. Each tenant's
-- actual data lives in its OWN database (see tenant.sql), resolved by domain.
-- Tenancy is ADMIN-MANAGED (no subscription/billing) — a school is simply
-- active or suspended.
-- =====================================================================

CREATE TABLE IF NOT EXISTS tenants (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(150) NOT NULL,
  code          VARCHAR(40)  NOT NULL,           -- tenant slug
  domain        VARCHAR(190) DEFAULT NULL,       -- e.g. greenwood.scholr.app
  db_name       VARCHAR(120) NOT NULL,           -- this tenant's own database
  board         VARCHAR(40)  DEFAULT NULL,
  city          VARCHAR(120) DEFAULT NULL,
  status        ENUM('active','suspended') NOT NULL DEFAULT 'active',
  primary_color VARCHAR(9)   DEFAULT '#4F46E5',
  logo_url      VARCHAR(255) DEFAULT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_tenant_code (code),
  UNIQUE KEY uq_tenant_domain (domain),
  UNIQUE KEY uq_tenant_db (db_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS platform_admins (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(160) NOT NULL,
  password_hash VARCHAR(100) NOT NULL,
  status        ENUM('active','disabled') NOT NULL DEFAULT 'active',
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_platform_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
