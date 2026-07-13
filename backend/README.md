# Scholr — Backend API

Multi-tenant School Management System API. **Node.js (Express) + MySQL.**

## Tenancy model — database-per-tenant, admin-managed

- **Each school gets its OWN database** (`scholr_t_<code>`). A small **master
  database** (`scholr_master`) holds only the tenant registry + platform
  super-admins. Isolation is **physical** — a tenant connection can only ever
  touch that tenant's database.
- **Resolved by domain.** A tenant has a `domain` (e.g. `greenwood.scholr.app`);
  login resolves the tenant from the request `Host` header (or an explicit
  `schoolCode`), then connects to that tenant's database. A per-tenant
  connection pool is created lazily and cached.
- **Admin-managed, not subscription-based.** A platform super-admin provisions a
  tenant (creates its database + schema + first admin), can update it, **suspend
  / re-activate** it, or delete it (drops the whole database). No plans, no billing.

```
                 ┌─────────────── master DB (scholr_master) ───────────────┐
Super-admin ────▶│  tenants (name, code, domain, db_name, status, …)       │
                 │  platform_admins                                        │
                 └─────────────────────────────────────────────────────────┘
                          │ provisions / drops
        ┌─────────────────┼───────────────────────┐
   scholr_t_greenwood   scholr_t_riverside   scholr_t_<code>   ← one DB per school
   (users, students, attendance, fee_invoices, classes …)
```

## Quick start (no Docker)

Requires a running **MySQL 8 / MariaDB** you can create databases on.

```bash
cd backend
cp .env.example .env          # point DB_* at your MySQL server
npm install

npm run db:migrate            # creates the master DB + registry tables
npm run db:seed               # super-admin + 2 demo tenants (each its own DB)
npm run dev                   # http://localhost:4000/health
```

Reset everything (drops master **and every** `scholr_t_*` tenant DB, then reseeds):
```bash
npm run db:reset
```

### Seeded credentials
| Who | Login |
|---|---|
| Platform super-admin | `superadmin@scholr.app` / `admin1234` → `POST /api/auth/platform/login` |
| Greenwood admin | domain `greenwood.scholr.app` **or** `schoolCode: greenwood`, `admin@greenwood.edu.in` / `demo1234` |
| Teacher / Student / Parent | `teacher@…`, `student@…`, `parent@greenwood.edu.in` / `demo1234` |
| Riverside | `riverside.scholr.app` / code `riverside`, `admin@riverside.edu.in` / `demo1234` |

## API

Send `Authorization: Bearer <token>`.

### Auth
| Method | Path | Body |
|---|---|---|
| POST | `/api/auth/login` | `{ email, password, schoolCode? }` — tenant resolved by `Host` domain or `schoolCode` |
| POST | `/api/auth/platform/login` | `{ email, password }` |
| GET | `/api/auth/me` | — |

### Platform (super-admin) — tenant management
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/platform/schools` | List tenants (+ live counts per DB) |
| POST | `/api/platform/schools` | **Provision** a tenant (new DB + schema + first admin) |
| GET | `/api/platform/schools/:id` | Detail |
| PATCH | `/api/platform/schools/:id` | Update name / domain / board / colour / logo |
| POST | `/api/platform/schools/:id/status` | `{ status: active \| suspended }` |
| DELETE | `/api/platform/schools/:id` | **Drop** the tenant's database |

### Tenant-scoped (run against the tenant's own DB)
| Method | Path | Notes |
|---|---|---|
| GET/POST/PATCH/DELETE | `/api/students` | roster + records |
| GET/POST | `/api/attendance` (+`/summary`) | `POST { date, records:[{studentId,status}] }` |
| GET | `/api/fees` (+`/summary`) | students see only their own |
| POST | `/api/fees/:id/pay` | `{ amount, method }` |
| GET/POST | `/api/users` | admin manages tenant users |

> A super-admin can operate inside a tenant by adding `X-Tenant: <code or domain>`.

## Example — provision a tenant, then use it

```bash
# 1) super-admin provisions a new school (creates its own database)
curl -X POST localhost:4000/api/platform/schools \
  -H "Authorization: Bearer $SUPER" -H 'Content-Type: application/json' \
  -d '{"name":"Sunrise Academy","code":"sunrise","domain":"sunrise.scholr.app",
       "adminEmail":"admin@sunrise.edu.in","adminPassword":"demo1234"}'

# 2) that school's admin logs in by domain (Host) or schoolCode
curl -X POST localhost:4000/api/auth/login -H 'Content-Type: application/json' \
  -H 'Host: sunrise.scholr.app' -d '{"email":"admin@sunrise.edu.in","password":"demo1234"}'

# 3) all subsequent calls hit ONLY sunrise's database
curl localhost:4000/api/students -H "Authorization: Bearer $TENANT"
```

## Layout
```
src/
  config/     env.js · db.js (master pool + per-tenant pool cache + raw conn)
  db/         master.sql · tenant.sql · migrate.js · seed.js
  lib/        tenants.js (provision / drop / resolve-by-domain)
  middleware/ authenticate · requirePlatform · resolveTenant (attaches req.db) · requireRole
  modules/    auth · platform · students · attendance · fees · users
  app.js server.js
```
