# Karsa Studio — Architecture & Handover Document

> **Last updated:** 2026-08-19
> **Repo:** `github.com/alaricdeveloper/karsa` (branch: `main`)
> **Live:** `https://usekarsa.vercel.app`
> **Owner:** Alaric Diaz (`alarictrades@gmail.com` / `diazpandai14@gmail.com`)

---

## 1. Project Overview

**Karsa Studio** is a full-stack SaaS platform for UMKM (Indonesian SMEs) that sells a **30-Day Content Calendar** package for Rp299,000. The product includes 30 video scripts, captions, 4 SEO articles, competitor audit, and a Notion content OS — all delivered within 24 hours.

### What It Does
- **Landing page** sells the product with a brief intake form
- **Customer registers/logs in** → fills brief → goes to **checkout** → "pays" (simulated bank transfer)
- After payment, a **customer dashboard** shows their order status and links to a **client portal**
- The **client portal** (`/portal/[orderId]`) displays the 30-day content calendar, scripts, SEO articles, competitor radar, and revision form
- An **admin console** (`/console`) lets the owner manage all orders, update statuses, view analytics, and use AI tools

### Revenue Model
- Rp299,000 per order (hardcoded in code)
- Payment is simulated (bank transfer VA numbers displayed, user clicks "confirm")
- No real payment gateway integration yet

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.3.1 |
| UI | React | 19.2.8 |
| Styling | Tailwind CSS | v4 |
| Language | TypeScript | ^5 |
| Database | Supabase (PostgreSQL) | — |
| Auth | Supabase Auth (email/password) | — |
| Deployment | Vercel (auto-deploy from `main`) | — |
| Icons | lucide-react | ^1.31.0 |
| Fonts | Instrument Serif, Inter, JetBrains Mono | Google Fonts |

### Key Dependencies
- `@supabase/ssr` — Supabase client for Next.js (cookie-based sessions)
- `@supabase/supabase-js` — Supabase JS client
- `clsx` + `tailwind-merge` — className utility (`cn()`)

---

## 3. Design System

### Color Palette (Sand)
| Token | Hex | Usage |
|-------|-----|-------|
| `sand-50` | `#FBFBFA` | Page background |
| `sand-100` | `#F5F5F3` | Card hover |
| `sand-200` | `#EBEBE8` | Borders, secondary bg |
| `sand-300` | `#DDDCD7` | Input borders |
| `sand-700` | `#4A4844` | Secondary text |
| `sand-800` | `#2A2927` | Button hover |
| `sand-900` | `#171615` | Primary text, primary buttons |

### Typography
- **Serif headings:** Instrument Serif (landing page, section titles)
- **Body:** Inter (all body text, UI)
- **Monospace:** JetBrains Mono (badges, labels, code-like elements)

### Component Pattern
- `bento-card` class: `bg-white border border-sand-200 rounded-2xl` — used throughout
- `status-badge` class: colored pill for order status
- Responsive: mobile-first with `sm:`, `md:`, `lg:` breakpoints

---

## 4. File Structure

```
omnicontent-studio/
├── .env.local                          # Supabase keys (not in git)
├── next.config.ts                      # Default Next.js config
├── tailwind.config.ts                  # Sand palette + custom fonts
├── tsconfig.json                       # TS config with @/* path alias
├── package.json                        # Dependencies & scripts
│
├── public/                             # Static assets
│   ├── dashboard.html                  # Legacy standalone dashboard (backup)
│   ├── icon-*.png                      # PWA icons (16-512px)
│   ├── logo.png                        # Karsa logo
│   └── *.svg                           # Default Next.js SVGs
│
├── src/
│   ├── middleware.ts                    # Entry point → calls supabase/middleware
│   │
│   ├── app/                            # Next.js App Router pages
│   │   ├── layout.tsx                  # Root layout (fonts, metadata, <html lang="id">)
│   │   ├── globals.css                 # Tailwind v4 imports + custom utilities
│   │   ├── not-found.tsx               # Custom 404 page
│   │   │
│   │   ├── (public)/
│   │   │   ├── layout.tsx              # Public layout wrapper
│   │   │   └── page.tsx                # ★ LANDING PAGE (main sales page)
│   │   │
│   │   ├── login/page.tsx              # Login + signup (role-based redirect)
│   │   ├── checkout/page.tsx           # Payment page (reads localStorage)
│   │   ├── invoice/page.tsx            # Invoice display (printable)
│   │   ├── dashboard/page.tsx          # ★ CUSTOMER DASHBOARD (orders, profile, tools)
│   │   │
│   │   ├── console/                    # ★ ADMIN CONSOLE
│   │   │   ├── layout.tsx              # Admin layout (auth check)
│   │   │   └── page.tsx                # Admin dashboard (kanban, table, analytics, AI)
│   │   │
│   │   ├── portal/[orderId]/           # ★ CLIENT PORTAL (per-order)
│   │   │   ├── layout.tsx              # Portal layout
│   │   │   └── page.tsx                # Calendar, scripts, SEO, revisions
│   │   │
│   │   ├── terms/page.tsx              # Terms of service
│   │   ├── privacy/page.tsx            # Privacy policy
│   │   ├── refund/page.tsx             # Refund policy
│   │   │
│   │   ├── auth/callback/route.ts      # OAuth callback handler
│   │   │
│   │   └── api/                        # API routes (server-side)
│   │       ├── create-order/route.ts   # POST: create order in Supabase OR update status
│   │       ├── orders/route.ts         # GET: list all orders (service role)
│   │       ├── portal/[orderId]/route.ts # GET: fetch order + content + SEO from Supabase
│   │       ├── admin/
│   │       │   ├── seed/route.ts       # POST: seed demo data
│   │       │   └── setup/route.ts      # POST: create admin user
│   │       └── auth/callback/route.ts  # Auth callback API
│   │
│   ├── components/                     # React components
│   │   ├── landing/                    # 15 components (landing page sections)
│   │   │   ├── MegaDropdownNav.tsx     # Top nav with login button
│   │   │   ├── HeroSection.tsx         # Hero with CTA
│   │   │   ├── OrderForm.tsx           # ★ Brief intake form (auth-gated)
│   │   │   ├── Footer.tsx              # Footer with legal links
│   │   │   └── ... (11 more sections)
│   │   │
│   │   ├── console/                    # 7 components (admin console)
│   │   │   ├── StatsOverview.tsx       # Revenue, orders, SLA stats
│   │   │   ├── KanbanBoard.tsx         # Drag-style kanban view
│   │   │   ├── OrderTable.tsx          # Table view of all orders
│   │   │   ├── DetailModal.tsx         # Order detail + edit modal
│   │   │   ├── NewOrderModal.tsx       # Manual order creation
│   │   │   ├── AnalyticsView.tsx       # Charts and metrics
│   │   │   └── AIStudio.tsx            # AI content generation tools
│   │   │
│   │   ├── portal/                     # 8 components (client portal)
│   │   │   ├── StatusHero.tsx          # Order status banner
│   │   │   ├── CalendarGrid.tsx        # 30-day content calendar
│   │   │   ├── ScriptStudio.tsx        # Video script viewer/editor
│   │   │   ├── SeoArticles.tsx         # SEO article display
│   │   │   ├── CompetitorRadar.tsx     # Competitor audit view
│   │   │   ├── RevisionForm.tsx        # Client revision request form
│   │   │   ├── NotionCallout.tsx       # Notion integration CTA
│   │   │   └── Teleprompter.tsx        # Teleprompter overlay
│   │   │
│   │   └── ui/                         # 3 shared UI components
│   │       ├── BentoCard.tsx           # Reusable card component
│   │       ├── Modal.tsx               # Reusable modal
│   │       └── StatusBadge.tsx         # Status pill badge
│   │
│   ├── lib/                            # Utilities and configuration
│   │   ├── types.ts                    # TypeScript interfaces (Order, ContentItem, etc.)
│   │   ├── constants.ts                # Pillars, statuses, categories, seed data, FAQ
│   │   ├── utils.ts                    # cn(), generateOrderId(), SLA calc, revenue calc
│   │   └── supabase/
│   │       ├── client.ts               # Browser Supabase client (singleton)
│   │       ├── server.ts               # Server Supabase client (cookie-based)
│   │       ├── middleware.ts           # ★ Auth middleware (route protection)
│   │       └── types.ts               # Generated Supabase database types
│   │
│   └── seed/                           # Database setup SQL
│       ├── seed.sql                    # Full schema + 34 demo orders + RLS
│       ├── auth-setup.sql              # Profiles table + auto-create trigger
│       ├── fix-recursion.sql           # Fix recursive RLS on profiles
│       └── fix-profiles-grants.sql     # Fix grants for profiles table
│
└── architecture.md                     # ← THIS FILE
```

---

## 5. Database Schema (Supabase)

### Tables

#### `profiles`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | FK → `auth.users.id` |
| `email` | TEXT | User email |
| `role` | TEXT | `'admin'` or `'customer'` (default) |
| `created_at` | TIMESTAMPTZ | Auto |

- Auto-created via trigger `on_auth_user_created` when a user signs up
- RLS: permissive read for all, full access for service role

#### `orders`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | Auto-generated |
| `order_id` | TEXT UNIQUE | Human-readable ID (e.g. `OC-260819-7280` or `INV-993810`) |
| `brand` | TEXT | Business name |
| `category` | TEXT | Industry category |
| `competitor` | TEXT | Competitor handle |
| `description` | TEXT | Product description |
| `email` | TEXT | Customer email (ownership key) |
| `phone` | TEXT | WhatsApp number |
| `status` | TEXT | `PENDING_PAYMENT` / `IN_PROGRESS` / `QC_REVIEW` / `COMPLETED` |
| `notion_url` | TEXT | Notion workspace link (admin sets) |
| `notes` | TEXT | Admin notes |
| `user_id` | UUID | FK → auth.users (optional, not consistently used) |
| `created_at` | TIMESTAMPTZ | Auto |
| `updated_at` | TIMESTAMPTZ | Auto |

#### `content_items`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | Auto |
| `order_id` | UUID FK | → `orders.id` |
| `day_number` | INT | 1–30 |
| `pillar` | TEXT | Content pillar key |
| `hook` | TEXT | Video hook script |
| `body` | TEXT | Video body script |
| `cta` | TEXT | Call to action |
| `caption` | TEXT | Social media caption |
| `created_at` | TIMESTAMPTZ | Auto |

#### `seo_articles`
| Column | Type | Notes |
|--------|------|-------|
| `id` | UUID PK | Auto |
| `order_id` | UUID FK | → `orders.id` |
| `article_number` | INT | 1–4 |
| `article_type` | TEXT | Article type |
| `title` | TEXT | Article title |
| `description` | TEXT | Meta description |
| `outline` | TEXT | Article outline |
| `created_at` | TIMESTAMPTZ | Auto |

### RLS Policies
- **orders:** Public read (`USING (true)`), Admin full access (service role bypasses)
- **content_items:** Public read, Admin full access
- **seo_articles:** Public read, Admin full access
- **profiles:** Permissive read, Admin full access, auto-create trigger

### Seed Data
- 34 demo orders with Indonesian UMKM brand names
- 30 content items per order (1,020 total)
- 4 SEO articles per order (136 total)
- Mix of statuses: 4 IN_PROGRESS, 2 QC_REVIEW, 2 PENDING_PAYMENT, 26 COMPLETED

---

## 6. Auth Flow

### Middleware Protection (`src/lib/supabase/middleware.ts`)
```
/console/*  → must be logged in + role='admin' in profiles table
              → fail: redirect to /login?redirect=/console

/dashboard/* → must be logged in
              → fail: redirect to /login?redirect=/dashboard

/portal/*   → client-side auth check (not middleware)
              → must be logged in + email must match order.email

/login      → if already logged in:
              → admin → /console
              → customer → /dashboard
              → or → ?redirect= param
```

### Login/Signup Flow (`src/app/login/page.tsx`)
1. User enters email + password
2. **Signup:** `supabase.auth.signUp()` with `role: 'customer'` metadata → auto-creates profile via DB trigger → redirect to `?redirect=` or `/dashboard`
3. **Login:** `supabase.auth.signInWithPassword()` → check `profiles.role` → admin→`/console`, customer→`/dashboard`
4. URL param `?redirect=/checkout&id=INV-XXX` preserves intended destination + order ID

### Session Management
- Supabase SSR handles cookie-based sessions
- Middleware refreshes session on every request via `supabase.auth.getUser()`
- Browser client uses singleton pattern (`createClient()` in `supabase/client.ts`)

---

## 7. Core User Flows

### Flow 1: Customer Purchase
```
Landing Page → Fill Brief (OrderForm) → Auth Gate
  ↓
  Not logged in → /login?redirect=/checkout&id=INV-XXX
  Logged in → /checkout?id=INV-XXX
  ↓
  Checkout Page → Display VA number + countdown timer
  ↓
  Click "Sudah Bayar" → confirmPayment()
  ↓
  Save to localStorage (omni_order_INV-XXX)
  ↓
  POST /api/create-order → Insert into Supabase orders table (status: PENDING_PAYMENT)
  ↓
  Redirect to /invoice?id=INV-XXX
```

### Flow 2: Customer Dashboard
```
/dashboard → Middleware auth check → Supabase getUser()
  ↓
  Fetch orders via /api/orders (server-side, service role)
  ↓
  Filter by email === user.email
  ↓
  Display order cards with status + "Buka Hub" link
```

### Flow 3: Client Portal
```
/portal/OC-260819-7280 → Check auth (Supabase getUser)
  ↓
  Not logged in → /login?redirect=/portal/OC-260819-7280
  ↓
  Fetch order from /api/portal/OC-260819-7280
  ↓
  Check order.email === user.email
  ↓
  Mismatch → "Anda tidak memiliki akses"
  Match → Display portal (calendar, scripts, SEO, revisions)
```

### Flow 4: Admin Console
```
/console → Middleware: auth + role='admin'
  ↓
  Fetch all orders from Supabase (service role, bypasses RLS)
  ↓
  Kanban/Table/Analytics/AI views
  ↓
  Update order status, add Notion URL, notes
```

---

## 8. API Routes

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/create-order` | POST | None | Create new order OR update existing order status |
| `/api/orders` | GET | None (service role) | List all orders |
| `/api/portal/[orderId]` | GET | None (service role) | Fetch order + content_items + seo_articles |
| `/api/admin/seed` | POST | None (service role) | Seed demo data |
| `/api/admin/setup` | POST | None (service role) | Create admin user |
| `/api/auth/callback` | GET | None | OAuth callback handler |

### `/api/create-order` Dual Purpose
- **With `orderId` + `status`:** Updates existing order status (used by checkout `confirmPayment`)
- **Without `orderId`:** Creates new order with generated `OC-YYMMDD-RAND` ID

---

## 9. Key Design Decisions

1. **Order ID formats:** Two formats exist:
   - `INV-XXXXXX` — generated client-side by `generateOrderId()` for checkout flow
   - `OC-YYMMDD-RAND` — generated server-side by `/api/create-order` for Supabase
   - The `INV-` format is used in localStorage; `OC-` format is used in Supabase

2. **Email = ownership key:** Orders are linked to users by `email` field, not `user_id`. The `user_id` column exists but is not consistently populated.

3. **Dashboard fetches from API, not Supabase client:** The customer dashboard fetches all orders from `/api/orders` (service role, bypasses RLS) then filters by email client-side. This avoids RLS/cookie issues.

4. **Payment is simulated:** No real payment gateway. User sees VA numbers, clicks "Confirm", status updates to IN_PROGRESS.

5. **Vercel auto-deploy:** Push to `main` triggers automatic Vercel deployment. No manual `vercel --prod` needed.

6. **localStorage as bridge:** Order data flows: `OrderForm → karsa_checkout_{id} → Checkout → omni_order_{id} + Supabase`. Dashboard reads from Supabase, not localStorage.

---

## 10. Completed Features

### ✅ Landing Page
- Full sales page with hero, problem section, deliverables, comparison calculator, samples, bonuses, value stack, case studies, FAQ, sticky mobile CTA
- Mega dropdown navigation with login button
- Order brief form with validation (auth-gated)

### ✅ Authentication
- Email/password login and signup
- Supabase Auth with auto-created profiles (role: customer)
- Admin role check in middleware
- Role-based redirects (admin→console, customer→dashboard)
- Auth-gated routes: /dashboard, /console, /portal

### ✅ Checkout & Payment
- Countdown timer (15 min)
- VA number display (BCA + Mandiri) with copy-to-clipboard
- Payment confirmation → updates Supabase status to IN_PROGRESS
- Invoice page with print support

### ✅ Customer Dashboard
- Order list (fetched from Supabase, filtered by user email)
- Profile management (localStorage-based)
- Hook generator, ROI calculator, audit score tools
- "Buka Hub" button links to `/portal/{orderId}`

### ✅ Client Portal (`/portal/[orderId]`)
- Auth-gated + email ownership check
- 30-day content calendar grid
- Script studio with teleprompter
- SEO articles display
- Competitor radar
- Revision form
- Status hero banner

### ✅ Admin Console
- Stats overview (revenue, orders, SLA)
- Kanban board view
- Table view with search/filter
- Order detail modal (status, Notion URL, notes)
- Manual order creation
- Analytics view
- AI studio tools
- CSV export
- Auth-protected (admin role only)

### ✅ Legal Pages
- Terms of Service (`/terms`)
- Privacy Policy (`/privacy`)
- Refund Policy (`/refund`)

### ✅ Infrastructure
- Custom 404 page
- Middleware-based route protection
- Supabase RLS policies
- Database seeding (34 demo orders + content + SEO)
- Auto-deploy from GitHub to Vercel

---

## 11. Incomplete / Known Issues

### 🔴 Critical
- **Payment is fake** — no real payment gateway integration (Midtrans, Xendit, etc.)
- **Order content is seed data only** — the 30 scripts + 4 SEO articles per order are hardcoded seed data, not dynamically generated per customer

### 🟡 Medium
- **`user_id` not consistently populated** — orders use `email` for ownership, not Supabase auth `user_id`
- **No email notifications** — no transactional emails (order confirmation, status updates)
- **No real content generation** — AI Studio in admin console generates templates, not real content
- **Portal content is static** — all 30 days of content come from seed data, same for all orders
- **Invoice page reads from localStorage** — if user clears localStorage, invoice data is lost
- **No order expiration** — the 15-min countdown on checkout doesn't actually expire the order

### 🟢 Low
- **Legacy HTML files in project root** — `user_dashboard.html`, `admin_dashboard.html`, `landingpage.html`, etc. (backups, not used)
- **`CheckoutModal.tsx`** exists but is not used (replaced by `/checkout` page)
- **No error boundary** — React errors will crash the page
- **No loading skeletons** — loading states are simple text spinners
- **No analytics** — no Vercel Analytics, Google Analytics, or Mixpanel
- **No SEO optimization** — no sitemap, robots.txt, or structured data

---

## 12. Environment Variables

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase service role key (bypasses RLS) |

All three are set in:
- `.env.local` (local development)
- Vercel dashboard (Production + Preview environments)

---

## 13. Deployment

- **Platform:** Vercel
- **Trigger:** Push to `main` branch on GitHub auto-deploys
- **Build:** `next build` (Turbopack)
- **Domain:** `usekarsa.vercel.app` (alias from Vercel)
- **Node:** 24.18.0 (Vercel build machine)

---

## 14. Development Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint         # ESLint check
npx tsc --noEmit     # TypeScript check
```

---

## 15. Handover Summary

### What This Project Is
Karsa Studio is a content-as-a-service platform for Indonesian UMKM. Customers pay Rp299k for a 30-day content calendar including video scripts, captions, SEO articles, and competitor analysis. The platform handles the full lifecycle: landing page → order → payment → delivery portal.

### What's Done
- Complete landing page with high-converting design
- Full auth system (signup, login, role-based access)
- Customer dashboard with order management
- Client portal with content calendar, scripts, SEO, revisions
- Admin console with kanban, table, analytics, AI tools
- Payment flow (simulated)
- Legal pages
- Database with RLS and seeding
- Auto-deploy pipeline

### What's NOT Done
- Real payment gateway
- Dynamic content generation (everything is seed data)
- Email notifications
- Production-ready error handling
- Analytics/monitoring

### How to Continue Working
1. Read this file first
2. Check `src/lib/types.ts` for data models
3. Check `src/lib/constants.ts` for config values
4. Check `src/lib/supabase/middleware.ts` for auth rules
5. Check `src/app/api/` for server-side logic
6. Run `npm run dev` and open `http://localhost:3000`
7. Admin login: check Supabase dashboard for credentials
8. Customer flow: register → fill brief → checkout → portal

### Key Gotchas
- Order IDs: `INV-XXXXXX` (client) vs `OC-YYMMDD-RAND` (server/Supabase)
- Dashboard fetches from `/api/orders` (not Supabase client directly)
- Portal checks email ownership client-side after fetching order
- Vercel auto-deploys on push — no manual deploy needed
- `createClient()` singleton in `supabase/client.ts` can silently return null if env vars missing

---

*This document was generated to enable any AI or developer to fully understand and continue work on the Karsa Studio project without prior context.*
