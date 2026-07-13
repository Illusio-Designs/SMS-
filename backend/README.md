# Scholr — Backend API

Multi-tenant School Management System API. **Node.js (Express) + MySQL.**

## Tenancy model — admin-managed, not subscription-based

- **Shared database, `school_id` discriminator.** Every tenant table carries a
  `school_id`; every query is filtered by it, so one school can never see
  another's data. Deleting a school cascades to all its rows.
- **A platform super-admin provisions and manages tenants** (create a school,
  update it, **suspend / re-activate**, delete). There is **no subscription or
  billing** — a school is simply `active` or `suspended`, toggled by the admin.
- **Tenant users** (admin / staff / teacher / student / parent) log in with their
  **school code** + email + password and are pinned to their `school_id` by the
  JWT. A suspended school blocks all its users' access.

```
Platform super-admin ──manages──▶ Schools (tenants)
                                     └─ users, students, attendance, fees … (isolated by school_id)
```

## Quick start

```bash
cd backend
cp .env.example .env
npm install

# 1) Start MySQL (Docker) — or point .env at your own MySQL 8
docker compose up -d

# 2) Create schema + seed a super-admin and two demo tenants
npm run db:migrate
npm run db:seed

# 3) Run the API
npm run dev          # http://localhost:4000/health
```

Reset everything: `npm run db:reset` (drops + recreates + reseeds).

### Seeded credentials
| Who | Login |
|---|---|
| Platform super-admin | `superadmin@scholr.app` / `admin1234` (via `/api/auth/platform/login`) |
| School admin (tenant `greenwood`) | code `greenwood`, `admin@greenwood.edu.in` / `demo1234` |
| Teacher / Student / Parent | `teacher@…`, `student@…`, `parent@greenwood.edu.in` / `demo1234` |
| Second tenant | code `riverside`, `admin@riverside.edu.in` / `demo1234` |

## API

Auth: send `Authorization: Bearer <token>`.

### Auth
| Method | Path | Body |
|---|---|---|
| POST | `/api/auth/login` | `{ schoolCode, email, password }` → tenant token |
| POST | `/api/auth/platform/login` | `{ email, password }` → super-admin token |
| GET | `/api/auth/me` | — |

### Platform (super-admin only) — tenant management
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/platform/schools` | List all tenants (+ counts) |
| POST | `/api/platform/schools` | Provision a school **and its first admin** |
| GET | `/api/platform/schools/:id` | Tenant detail |
| PATCH | `/api/platform/schools/:id` | Update name/board/city/colour/logo |
| POST | `/api/platform/schools/:id/status` | `{ status: active \| suspended }` |
| DELETE | `/api/platform/schools/:id` | Delete tenant + all data |

### Tenant-scoped (auto-isolated by `school_id`)
| Method | Path | Notes |
|---|---|---|
| GET/POST/PATCH/DELETE | `/api/students` | roster + records |
| GET/POST | `/api/attendance` | `POST { date, records:[{studentId,status}] }` (upsert) |
| GET | `/api/attendance/summary` | per-student % |
| GET | `/api/fees` · `/api/fees/summary` | parents see only their child |
| POST | `/api/fees/:id/pay` | `{ amount, method }` |
| GET/POST | `/api/users` | school admin manages tenant users |

> A super-admin can act **inside** a tenant by adding an `X-School-Id: <id>`
> header to tenant-scoped calls.

## Example

```bash
# super-admin creates a new school + its admin
curl -X POST localhost:4000/api/platform/schools \
  -H "Authorization: Bearer $SUPER" -H 'Content-Type: application/json' \
  -d '{"name":"Sunrise Academy","code":"sunrise","adminEmail":"admin@sunrise.edu.in","adminPassword":"demo1234"}'

# that school's admin logs in and lists students (only their tenant's)
curl -X POST localhost:4000/api/auth/login -H 'Content-Type: application/json' \
  -d '{"schoolCode":"sunrise","email":"admin@sunrise.edu.in","password":"demo1234"}'
curl localhost:4000/api/students -H "Authorization: Bearer $TENANT"
```

## Layout
```
src/
  config/     env.js, db.js (mysql2 pool)
  db/         schema.sql, migrate.js, seed.js
  middleware/ authenticate · requirePlatform · resolveTenant · requireRole · errorHandler
  modules/    auth · platform · students · attendance · fees · users
  app.js server.js
```
