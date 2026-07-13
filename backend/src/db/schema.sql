-- =====================================================================
-- Scholr — multi-tenant schema (shared database, school_id discriminator)
-- Tenancy is ADMIN-MANAGED (a platform super-admin provisions schools).
-- There is NO subscription / billing model — schools are simply active or
-- suspended, controlled by the platform admin.
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- --- Tenants: one row per school ------------------------------------
CREATE TABLE IF NOT EXISTS schools (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name          VARCHAR(150) NOT NULL,
  code          VARCHAR(40)  NOT NULL,           -- tenant slug (login / subdomain)
  board         VARCHAR(40)  DEFAULT NULL,
  city          VARCHAR(120) DEFAULT NULL,
  status        ENUM('active','suspended') NOT NULL DEFAULT 'active',
  primary_color VARCHAR(9)   DEFAULT '#4F46E5',
  logo_url      VARCHAR(255) DEFAULT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_school_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- Platform super-admins (manage tenants; not tied to a school) ----
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

-- --- Tenant users (admin / staff / teacher / student / parent) -------
CREATE TABLE IF NOT EXISTS users (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  school_id     BIGINT UNSIGNED NOT NULL,
  role          ENUM('admin','staff','teacher','student','parent') NOT NULL,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(160) NOT NULL,
  phone         VARCHAR(20)  DEFAULT NULL,
  password_hash VARCHAR(100) NOT NULL,
  student_id    BIGINT UNSIGNED DEFAULT NULL,    -- link for role=student
  status        ENUM('active','disabled') NOT NULL DEFAULT 'active',
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_user_email (school_id, email),   -- email unique WITHIN a tenant
  KEY idx_users_school (school_id),
  CONSTRAINT fk_users_school FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- Classes / sections ---------------------------------------------
CREATE TABLE IF NOT EXISTS classes (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  school_id  BIGINT UNSIGNED NOT NULL,
  name       VARCHAR(30) NOT NULL,               -- e.g. 'VIII'
  section    VARCHAR(10) NOT NULL,               -- e.g. 'A'
  teacher_id BIGINT UNSIGNED DEFAULT NULL,       -- class teacher (users.id)
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_class (school_id, name, section),
  KEY idx_classes_school (school_id),
  CONSTRAINT fk_classes_school FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- Students -------------------------------------------------------
CREATE TABLE IF NOT EXISTS students (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  school_id      BIGINT UNSIGNED NOT NULL,
  admission_no   VARCHAR(40) NOT NULL,
  roll_no        INT DEFAULT NULL,
  name           VARCHAR(120) NOT NULL,
  gender         ENUM('male','female','other') DEFAULT NULL,
  dob            DATE DEFAULT NULL,
  class_id       BIGINT UNSIGNED DEFAULT NULL,
  guardian_name  VARCHAR(120) DEFAULT NULL,
  guardian_phone VARCHAR(20)  DEFAULT NULL,
  status         ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admission (school_id, admission_no),
  KEY idx_students_school (school_id),
  KEY idx_students_class (school_id, class_id),
  CONSTRAINT fk_students_school FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- Attendance -----------------------------------------------------
CREATE TABLE IF NOT EXISTS attendance (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  school_id  BIGINT UNSIGNED NOT NULL,
  student_id BIGINT UNSIGNED NOT NULL,
  date       DATE NOT NULL,
  status     ENUM('present','absent','late','leave') NOT NULL DEFAULT 'present',
  marked_by  BIGINT UNSIGNED DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_attendance (school_id, student_id, date),
  KEY idx_attendance_school_date (school_id, date),
  CONSTRAINT fk_attendance_school FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --- Fee invoices ---------------------------------------------------
CREATE TABLE IF NOT EXISTS fee_invoices (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  school_id  BIGINT UNSIGNED NOT NULL,
  student_id BIGINT UNSIGNED NOT NULL,
  term       VARCHAR(40) NOT NULL,
  amount     DECIMAL(10,2) NOT NULL DEFAULT 0,
  paid       DECIMAL(10,2) NOT NULL DEFAULT 0,
  status     ENUM('due','partial','paid','overdue') NOT NULL DEFAULT 'due',
  due_date   DATE DEFAULT NULL,
  method     VARCHAR(40) DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_fees_school (school_id),
  KEY idx_fees_student (school_id, student_id),
  CONSTRAINT fk_fees_school FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
