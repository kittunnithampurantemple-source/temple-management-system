# Sree Temple Trust — Temple Management System

A full-stack temple management web application: public pooja booking, donations,
annual schemes, PDF receipts, Razorpay payments, and an admin dashboard.

```
temple-app/
  backend/    NestJS + Prisma + PostgreSQL API
  frontend/   Next.js 15 + Tailwind public site + admin dashboard
  docker-compose.yml
```

## What's real here, and what to finish before going live

This is a working scaffold with real, wired-up implementations of every core flow
described in the brief — not placeholder stubs. Specifically implemented:

- JWT auth (access + refresh tokens), RBAC (ADMIN/STAFF), bcrypt password hashing
- Pooja CRUD, public listing, booking form (date, devotee, nakshatra, contact, address)
- Razorpay order creation + **server-side signature verification** + webhook handler
  (the frontend's "payment success" is never trusted on its own)
- Donations (general/festival/development/special event) with optional PAN for 80G
- Annual schemes (one-time yearly payment, NOT auto-renewing, renewal-due query)
- PDF receipt generation (PDFKit) behind a storage abstraction (local disk today,
  swap-in-ready for Supabase Storage)
- Email notifications (Nodemailer) for booking confirmation, completion, donation
  receipt, scheme renewal reminders
- Offline counter booking (cash/UPI/bank/cheque) bypassing Razorpay entirely
- Admin dashboard stats, reports (date-range revenue, PDF + Excel export), audit log table
- Helmet, rate limiting (Throttler), global validation pipe, soft-deletes for poojas

Things you should treat as starting points, not finished:

- **Photos, gallery, about/history copy** are placeholders — replace with your temple's
  real content and images.
- **Pooja seed data**: 4 rows from your price-board photo were unreadable due to glare
  and are seeded as `isActive: false` placeholders (`backend/prisma/seed.ts`) — confirm
  the names/prices and re-enable them.
- **Excel/PDF report export** covers revenue summary by date range; extend if you need
  more granular breakdowns.
- **CSRF**: the API is stateless JWT-bearer (no cookies), which is its own CSRF mitigation;
  add `csurf`-style protection only if you switch to cookie-based sessions.
- Contact form is UI-only; wire it to an email/notification endpoint before launch.

## Prerequisites

- Node.js 20+
- Docker & Docker Compose (recommended), OR a local PostgreSQL 16 instance
- A Razorpay account (test mode keys are fine to start)
- An SMTP account (Gmail app password, SendGrid, etc.)

## Quick Start (Docker — recommended)

```bash
cd temple-app

# 1. Configure environment
cp backend/.env.example backend/.env
# edit backend/.env: set RAZORPAY_*, SMTP_*, JWT secrets, TEMPLE_* info

# 2. Start everything (Postgres + API + frontend)
docker compose up --build

# 3. In a second terminal, run migrations + seed data
docker compose exec backend npx prisma migrate dev --name init
docker compose exec backend npx prisma db seed
```

- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin/login
  - Default seeded admin: `admin@yourtemple.org` / `ChangeMe@123` — **change this immediately**
- API base: http://localhost:4000/api

## Manual Setup (without Docker)

```bash
# Backend
cd backend
cp .env.example .env   # edit values, point DATABASE_URL at your local Postgres
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev      # http://localhost:4000/api

# Frontend (separate terminal)
cd frontend
cp .env.example .env.local
npm install
npm run dev             # http://localhost:3000
```

## Razorpay Webhook Setup

In the Razorpay dashboard, add a webhook pointing to:
`https://yourdomain.com/api/payments/razorpay/webhook`
Events to subscribe: `payment.captured`, `payment.failed`.
Copy the webhook secret into `RAZORPAY_WEBHOOK_SECRET` in `backend/.env`.
The webhook is the authoritative payment-confirmation path; the browser-side
verify call is a fast-path UX convenience, not the source of truth.

## Migrating to Supabase Later

- **Database**: the Prisma schema uses plain PostgreSQL types and UUID primary keys
  on purpose. Point `DATABASE_URL` at your Supabase connection string and run
  `npx prisma migrate deploy` — no schema changes needed.
- **Storage**: implement a `SupabaseStorageDriver` in
  `backend/src/receipts/storage.abstraction.ts` (interface already defined) and flip
  `STORAGE_DRIVER=supabase`. Nothing else in the app needs to change.

## Production Notes

- Run `npx prisma migrate deploy` (not `migrate dev`) in production.
- Put the frontend and backend behind a reverse proxy (Nginx/Caddy) with TLS.
- Set `NODE_ENV=production`, restrict CORS to your real domain, rotate JWT secrets.
- Back up the `temple_db_data` and `temple_uploads` Docker volumes regularly.
