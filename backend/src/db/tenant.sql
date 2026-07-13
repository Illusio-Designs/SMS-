-- =====================================================================
-- Scholr — PER-TENANT schema. Applied to each tenant's OWN database when
-- the school is provisioned. The database itself is the tenant boundary, so
-- there is no school_id column — isolation is physical.
-- =====================================================================

CREATE TABLE IF NOT EXISTS users (
  id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  role          ENUM('admin','staff','teacher','student','parent') NOT NULL,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(160) NOT NULL,
  phone         VARCHAR(20)  DEFAULT NULL,
  password_hash VARCHAR(100) NOT NULL,
  student_id    BIGINT UNSIGNED DEFAULT NULL,
  status        ENUM('active','disabled') NOT NULL DEFAULT 'active',
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_user_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS classes (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(30) NOT NULL,
  section    VARCHAR(10) NOT NULL,
  teacher_id BIGINT UNSIGNED DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_class (name, section)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS students (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
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
  UNIQUE KEY uq_admission (admission_no),
  KEY idx_students_class (class_id),
  CONSTRAINT fk_students_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS attendance (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  student_id BIGINT UNSIGNED NOT NULL,
  date       DATE NOT NULL,
  status     ENUM('present','absent','late','leave') NOT NULL DEFAULT 'present',
  marked_by  BIGINT UNSIGNED DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_attendance (student_id, date),
  KEY idx_attendance_date (date),
  CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS fee_invoices (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
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
  KEY idx_fees_student (student_id),
  CONSTRAINT fk_fees_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
