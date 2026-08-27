# Karsa Studio — Architecture & Handover Document

> **Pembaruan terakhir:** 2026-08-26
> **Repo:** `github.com/alaricdeveloper/karsa` (branch: `main`)
> **Live:** `https://usekarsa.vercel.app`
> **Owner:** Alaric Diaz (`alarictrades@gmail.com` / `diazpandai14@gmail.com`)
> **Dokumen ini dibaca oleh:** AI agent / developer baru — baca sampai habis sebelum mengubah kode apa pun.

---

## 0. Ringkasan Eksekutif

**Karsa Studio** adalah platform SaaS **content-as-a-service** untuk UMKM Indonesia. Satu produk, satu harga: **paket 30-Day Content Calendar seharga Rp299.000** — berisi 30 script video + caption, 4 artikel SEO, audit kompetitor, dan Notion Content OS, dikirim dalam 24 jam.

**Siapa penggunanya:**
- **Customer** (pemilik UMKM) — mengisi brief, "bayar" via transfer bank simulasi, lalu melihat hasil konten 30 hari di **Client Hub** (`/portal/[orderId]`).
- **Owner/Admin** (Alaric) — mengelola semua pesanan lewat **Admin Console** (`/console`).

**Status keseluruhan: PRODUKSI-LAYAK untuk demo & penjualan awal.** Semua alur inti berfungsi dan teruji otomatis (102 checks E2E hijau). Yang belum produksi-sungguhan: pembayaran masih simulasi (bukan gateway asli) dan konten dihasilkan template (bukan AI personalisasi per brand).

**⚠️ 2 aksi manual yang BELUM selesai (blokir keamanan penuh):**
1. **Jalankan `src/seed/security-rls-fix.sql`** di Supabase Dashboard → SQL Editor (menutup celah RLS "public read" — sampai ini dijalankan, anon key masih bisa baca semua data di DB).
2. **Set env var `KARSA_SETUP_SECRET`** di Vercel (dan `.env.local`) agar `/api/admin/setup` (bootstrap admin pertama) bisa dipakai.

Lihat bagian **[16. Belum Dikerjakan](#16-belum-dikerjakan--roadmap)** untuk detail.

---

## 1. Konteks & Latar Belakang

Proyek ini awalnya adalah kumpulan **file HTML statis** (repo `usekarsahtmlonly`): `landingpage.html`, `checkout.html`, `admin_dashboard.html`, `customer_dashboard.html`, dll. — semua desain neobrutalism buatan tangan.

Kemudian semuanya **diport ke Next.js App Router** (repo `karsa` = proyek ini) secara bertahap, dengan aturan **100% visual parity**: setiap halaman harus identik dengan sumber HTML-nya. Setelah semua halaman ter-port, sumber HTML dihapus dari repo (lihat `git log`):

| Commit | Isi |
|---|---|
| `a14bbbe` | Migrasi landing + login |
| `b8db6ee` → `b0e99f4` | Redesign landing neobrutalism, sync semua halaman, port Client Hub |
| `5898fd6` | Port Admin Console (5 plates) |
| `cd41971` | Fix bug kritis: order tidak masuk DB + deliverable tidak ter-generate |
| `a50a952` | **Security hardening** (8 kerentanan ditutup — lihat bagian 8) |
| `acd299c` | Bersihkan file mati, rapikan struktur repo, README asli, `.env.example` |

**Sumber kebenaran desain** masih ada di repo `usekarsahtmlonly/` (HTML asli) — kalau ragu soal visual, bandingkan dengan file HTML di sana.

---

## 2. Tech Stack

| Layer | Teknologi | Versi |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.x |
| UI | React | 19.x |
| Bahasa | TypeScript | ^5 |
| Styling | Tailwind CSS | v4 |
| Database | Supabase (PostgreSQL) | — |
| Auth | Supabase Auth (email/password) + `@supabase/ssr` (session di **cookie**, bukan localStorage) | — |
| Icons | lucide-react | ^1.x |
| Fonts | Instrument Serif, Inter, JetBrains Mono (Google Fonts CDN) | — |
| Deployment | Vercel — auto-deploy dari `main` | — |
| Testing | Playwright (script `.mjs` ad-hoc, **tidak** di-commit ke repo) | — |

**Dependency kunci:** `@supabase/ssr` (createServerClient/createBrowserClient — session disimpan di cookie `sb-<ref>-auth-token`), `@supabase/supabase-js`, `clsx` + `tailwind-merge` (`cn()`).

**Node:** lokal pakai nvm (v24). Perintah npm harus didahului `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"`.

---

## 3. Design System (Neobrutalism)

Semua halaman memakai sistem desain **neobrutalism**: latar krem/putih, border tebal `2px` hitam (`border-2 border-ink`), shadow keras `shadow-brutal` (offset solid, tanpa blur), aksen terracotta/amber, label monospace `font-mono text-xs font-bold uppercase`.

### Token utama (Tailwind config + CSS custom)
| Token | Pakai untuk |
|---|---|
| `ink` (hampir hitam) | Text utama, border, tombol hover |
| `sand-900` | Text gelap |
| `terracotta` | Tombol CTA utama, aksen |
| `amber-500` | Dot pilar 1, aksen status |
| `chalk` / `sand-50` | Latar halaman |
| `font-serif` (Instrument Serif) | Heading hero/section |
| `font-sans` (Inter) | Body |
| `font-mono` (JetBrains Mono) | Badge, label, angka, kode |

### Pola komponen
- `shadow-brutal`: shadow solid `4px 4px 0` warna gelap — ciri khas tombol/kartu.
- `bento-card`: kartu putih ber-border — dipakai lintas halaman.
- `status-chip` / `status-badge`: pill berwarna sesuai status order.
- Semua tombol punya `min-h-[44px]` (aksesibilitas), label `font-mono text-xs font-bold`.

---

## 4. Struktur File (Lengkap)

```
omnicontent-studio/
├── .env.example                     # Template env (di-commit; .env* lain di-gitignore)
├── .env.local                       # Kunci Supabase lokal (TIDAK di-commit)
├── .gitignore
├── package.json                     # Scripts: dev/build/start/lint
├── next.config.ts                   # Security headers + CSP (dev vs prod)
├── tailwind.config.ts               # Palette + custom fonts
├── tsconfig.json                    # Path alias @/* → src/*
├── eslint.config.mjs / postcss.config.mjs
├── README.md                        # Ringkasan singkat + route map
│
├── docs/
│   └── architecture.md              # ← DOKUMEN INI
│
├── public/                          # Statis (icon PWA + logo saja; boilerplate sudah dibersihkan)
│   ├── icon-{16,32,48,180,192,512}x{...}.png
│   ├── logo.png                     # Logo brand (diserve di /logo.png)
│   └── favicon.png                  # (dihapus — duplikat icon-32x32; icons ditangani metadata layout)
│
└── src/
    ├── middleware.ts                # Route protection (lihat bagian 7)
    │
    ├── app/                         # App Router
    │   ├── layout.tsx               # Root layout: fonts, metadata icons, lang="id"
    │   ├── globals.css              # Tailwind v4 + primitif neobrutalism (console/hub)
    │   ├── not-found.tsx            # 404 kustom (neobrutalism)
    │   │
    │   ├── (public)/
    │   │   ├── layout.tsx
    │   │   └── page.tsx             # ★ LANDING (halaman jualan utama)
    │   │
    │   ├── (auth)/layout.tsx        # Login/registrasi
    │   ├── login/page.tsx           # Login + signup, redirect berbasis role
    │   ├── checkout/page.tsx        # Pembayaran (baca localStorage, countdown 15 mnt)
    │   ├── invoice/page.tsx         # Invoice printable
    │   ├── dashboard/page.tsx       # ★ DASHBOARD CUSTOMER (kartu order + tools)
    │   ├── console/
    │   │   ├── layout.tsx           # Auth check admin
    │   │   └── page.tsx             # ★ ADMIN CONSOLE (5 plates, monolitik ~1600 baris)
    │   ├── portal/[orderId]/
    │   │   ├── layout.tsx
    │   │   └── page.tsx             # ★ CLIENT HUB (per-order)
    │   ├── terms/ privacy/ refund/  # Halaman legal
    │   │
    │   ├── auth/callback/route.ts   # OAuth callback (open-redirect sudah diperbaiki)
    │   │
    │   └── api/
    │       ├── create-order/route.ts       # POST publik (validasi ketat) — buat/update order
    │       ├── orders/route.ts             # GET/PATCH/POST — HANYA admin
    │       ├── my-orders/route.ts          # GET — order milik user (email-scoped)
    │       ├── portal/[orderId]/route.ts   # GET — requireUser + cek kepemilikan email
    │       └── admin/
    │           ├── seed/route.ts           # POST — HANYA admin (seeder data demo)
    │           └── setup/route.ts          # POST — butuh env KARSA_SETUP_SECRET (bootstrap admin)
    │
    ├── components/
    │   ├── landing/        # NewLanding.tsx — monolit landing 31 section (mirip pola console/portal)
    │   │                   # Semua state interaktif (dropdown, FAQ, kalkulator, preview, toast) di dalamnya
    │   ├── console/        # StatsOverview, KanbanBoard, OrderTable, DetailModal, NewOrderModal,
    │   │                   # AnalyticsView, AIStudio, SettingsView + console-lib.ts (helper murni)
    │   ├── portal/         # ReadoutPlate, CalendarGrid, ScriptStudio, SeoArticles, AuditView,
    │   │                   # RevisionForm, NotionCallout, Teleprompter, ChecklistView + hub-lib.ts
    │   └── ui/             # BentoCard, Modal, StatusBadge
    │
    ├── lib/
    │   ├── api-auth.ts             # ★ requireUser / requireAdmin (Bearer JWT → getUser + role)
    │   ├── api-client.ts           # ★ authFetch() — attach access_token dari session cookie
    │   ├── generate-deliverables.ts# ★ Generate 30 content_items + 4 seo_articles utk order baru
    │   ├── types.ts                # Interface Order, ContentItem, SeoArticle, dll.
    │   ├── constants.ts            # PILLARS, STUDIO_PILLARS, STATUS_LABELS/COLORS, harga
    │   ├── utils.ts                # cn(), generateOrderId(), formatDateId(), dll.
    │   └── supabase/
    │       ├── client.ts           # Browser client (singleton, cookie storage)
    │       ├── server.ts           # Server client (cookie-based)
    │       ├── middleware.ts       # Logika auth middleware
    │       └── types.ts            # Tipe DB Supabase
    │
    └── seed/                       # SQL migrasi — urutan eksekusi penting (lihat §5)
        ├── seed.sql                # Schema + 34 order demo + content + SEO + RLS lama
        ├── auth-setup.sql          # Tabel profiles + trigger on_auth_user_created
        ├── fix-recursion.sql       # Fix RLS recursive pada profiles
        ├── fix-profiles-grants.sql # Fix grants profiles
        ├── add-order-brief-fields.sql  # Kolom brief (BELUM diterapkan ke DB live)
        └── security-rls-fix.sql    # ★ WAJIB dijalankan — nutup RLS bocor (lihat §8)
```

**Catatan struktur:** `src/app/console/page.tsx` dan `src/app/portal/[orderId]/page.tsx` adalah halaman monolitik besar (~1500–2000 baris) yang merangkai semua sub-komponen. Sub-komponen di `components/console` dan `components/portal` — logic murni (format tanggal, SLA, audit log) dipisah di `*-lib.ts`.

---

## 5. Database (Supabase/PostgreSQL)

### Tabel `orders`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | UUID PK | Auto |
| `order_id` | TEXT UNIQUE | ID manusiawi: `INV-XXXXXX` (alur checkout) atau `OC-YYMMDD-RAND` (server) |
| `brand` | TEXT | Nama bisnis |
| `category` | TEXT | Kategori industri |
| `competitor` | TEXT | Handle kompetitor |
| `description` | TEXT | Deskripsi produk/brief |
| `email` | TEXT | Email customer — **kunci kepemilikan** |
| `phone` | TEXT | Nomor WhatsApp |
| `status` | TEXT | `PENDING_PAYMENT` / `IN_PROGRESS` / `QC_REVIEW` / `COMPLETED` |
| `notion_url` | TEXT | Link Notion workspace (diisi admin) |
| `notes` | TEXT | Catatan internal admin |
| `user_id` | UUID | FK auth.users — **tidak konsisten terisi** (email yang dipakai) |
| `created_at` / `updated_at` | TIMESTAMPTZ | Auto |

> ⚠️ **Kolom `content_goal`, `content_tone`, `priority_channel` TIDAK ADA di DB live** (ada di `add-order-brief-fields.sql` yang belum diterapkan). Brief form mengumpulkan 3 bidang itu, tapi saat insert hanya brand/category/competitor/description/email/phone/status yang tersimpan. Kalau mau simpan field brief lengkap: terapkan `add-order-brief-fields.sql` + update `/api/create-order` insert.

### Tabel `content_items` (30 baris per order)
`id`, `order_id` FK, `day_number` (1–30), `pillar`, `hook`, `body`, `cta`, `caption`, `created_at`

### Tabel `seo_articles` (4 baris per order)
`id`, `order_id` FK, `article_number` (1–4), `article_type`, `title`, `description`, `outline`, `created_at`

### Tabel `profiles`
`id` UUID PK (= auth.users.id), `email`, `role` (`admin` | `customer`, default customer), `created_at`. Dibuat otomatis oleh trigger `on_auth_user_created` saat signup.

### RLS — status penting!
- **Sebelum hardening:** policy "Public read" di orders/content_items/seo_articles + "Anyone can read profiles" + anon write grants → **siapa pun dengan anon key bisa baca SEMUA data**. Ini sudah diperbaiki di level aplikasi (semua route API pakai auth server-side), tapi **policy DB-nya belum dijatuhkan**.
- **SEKARANG (pending):** jalankan `src/seed/security-rls-fix.sql` di Supabase SQL Editor → drop semua policy publik + revoke grant anon. Setelah ini, satu-satunya jalur baca adalah API routes (yang sudah memvalidasi auth).
- Service role (`SUPABASE_SERVICE_ROLE_KEY`) melewati RLS — dipakai server-side di route admin/seed/generate.

### Seeder (`/api/admin/seed` — admin only)
- 34 order demo UMKM Indonesia + 30 content_items per order + 4 seo_articles per order.
- Idempotent (tidak duplikat kalau dijalankan ulang).
- Setelah seeder, user bisa login sebagai customer `sri.tempong@gmail.com` (order `INV-993810`) untuk melihat hub terisi.

---

## 6. Alur User (End-to-End)

### Alur 1: Pembelian (fungsi inti!)
```
Landing → OrderForm (brief: nama, kategori, kompetitor, deskripsi, WA, email)
   ↓  brief disimpan ke localStorage (karsa_checkout_*)
   ↓  klik "Lanjut ke Pembayaran"
Auth gate → belum login? → /login?redirect=/checkout&id=INV-XXXXXX
   ↓
/checkout?id=INV-XXXXXX → tampil VA BCA + Mandiri (simulasi), countdown 15 menit
   ↓  klik "Saya Sudah Transfer"
confirmPayment() → status order di localStorage omni_order_* → lalu
POST /api/create-order  { orderId, brand, email, status: "IN_PROGRESS", ... }
   ↓  (kunci! lihat §9)
   - kalau order belum ada di DB → INSERT order + auto-generate 30 content + 4 SEO
   - kalau sudah ada → validasi brief cocok (brand+email) → UPDATE status saja
   ↓
redirect → /invoice?id=INV-XXXXXX  (printable)
```

### Alur 2: Dashboard Customer (`/dashboard`)
```
Middleware: harus login → supabase getUser()
   ↓
authFetch("/api/my-orders")  → hanya order dengan email == user.email
   ↓
Kartu order + status + tombol "Buka Hub" → /portal/{order_id}
   (plus tools: hook generator, ROI calculator, audit score — terpisah dari data order)
```

### Alur 3: Client Hub (`/portal/[orderId]`)
```
Middleware: harus login (tapi cek kepemilikan di SERVER, bukan client!)
   ↓
GET /api/portal/{orderId}  → requireUser + email order harus == email user
   mismatch → 403 "Anda tidak memiliki akses ke portal ini."
   ↓
Render: ReadoutPlate (status + SLA ticker + stepper) · rail 01–06 ·
30-hari calendar grid · ScriptStudio (hook/body/CTA + teleprompter) ·
SEO articles · AuditView (audit kompetitor) · ChecklistView (67 item) ·
RevisionForm (kirim revisi → buka WhatsApp) · NotionCallout ·
Order selector (dari /api/my-orders) untuk pindah antar order
```

### Alur 4: Admin Console (`/console`) — 5 Plates
| Plate | Isi |
|---|---|
| 01 Pipeline | Kanban (PENDING_PAYMENT → IN_PROGRESS → QC_REVIEW → COMPLETED), aksi cepat, detail modal (status, Notion URL, notes) |
| 02 Database | Tabel semua order + search + filter + export CSV |
| 03 Prompt Studio | Template prompt AI (generate konten bantu) |
| 04 Laporan | Metric revenue, grafik intake, SLA |
| 05 Pengaturan | DB readout, backup JSON, seed, setup |
| (+ New Order modal) | Input brief manual → insert langsung ke DB |

### Alur 5: Bootstrap admin (sekali saja)
```
POST /api/admin/setup?token=KARSA_SETUP_SECRET  +  { email, password }
   → membuat user + menandai role='admin' di profiles
   (token lama 'karsa-setup-2024' sudah TIDAK berlaku — dihapus dari kode)
```

---

## 7. Auth & Middleware

### Lapisan 1 — Middleware (`src/middleware.ts` → `lib/supabase/middleware.ts`)
| Route | Aturan |
|---|---|
| `/console/*` | Wajib login + role `admin` di profiles → kalau bukan, redirect `/login` |
| `/dashboard/*` | Wajib login |
| `/portal/*` | Wajib login (kepemilikan dicek terpisah di API route) |
| `/login` | Sudah login? admin→`/console`, customer→`/dashboard`, hormati `?redirect=` |

### Lapisan 2 — API Routes (`lib/api-auth.ts`)
- `requireUser(req)` → baca `Authorization: Bearer <access_token>` → `supabase.auth.getUser(token)` → return user atau 401.
- `requireAdmin(req)` → requireUser + cek `profiles.role === "admin"` → selain itu 403.
- Client memanggil via `authFetch(url, opts)` (`lib/api-client.ts`) yang otomatis ambil access_token dari session cookie — **jangan** memanggil fetch polos ke API ber-auth.

### Lapisan 3 — DB (RLS) — masih pending, lihat §5.

### Sesion storage — penting
`@supabase/ssr` menyimpan session di **cookie** (`sb-<ref>-auth-token`), BUKAN localStorage. Kalau debugging: token ada di `document.cookie` (base64 JSON berisi `access_token`). Jangan cari di localStorage.

---

## 8. Keamanan — Riwayat & Status

### Kerentanan yang SUDAH ditutup (commit `a50a952`, semua terbukti exploitable & sudah diverifikasi E2E)
| # | Kerentanan | Dampak | Perbaikan |
|---|---|---|---|
| 1 | `/api/orders` tanpa auth | Siapa pun bisa dump semua data customer + ubah status + insert order | Admin-only (Bearer JWT + role check) |
| 2 | `/api/admin/seed` token hardcoded di bundle client | Siapa pun bisa wipe + reseed seluruh DB | Admin-session-only |
| 3 | `/api/admin/setup` token sama | Siapa pun bisa buat admin / promote diri = takeover penuh | Token diganti env `KARSA_SETUP_SECRET` |
| 4 | `/api/portal/[orderId]` cek kepemilikan hanya di client | `curl` order siapapun | Cek kepemilikan email di SERVER |
| 5 | RLS "public read" + "Anyone can read profiles" | Anon key bisa query DB langsung | `security-rls-fix.sql` (⚠️ belum dijalankan) |
| 6 | `/auth/callback` open redirect (`next=//evil.com`) | Phishing | Validasi path same-site (harus `/`, bukan `//`) |
| 7 | Tanpa CSP / X-Frame-Options / nosniff | Clickjacking + injeksi | Header lengkap di `next.config.ts` |
| 8 | `/api/create-order` tanpa validasi | orderId `<script>`, status arbitrer, flip status order orang | Validasi format + status enum + ownership check brief |

### Status keamanan SEKARANG
- **API routes:** terkunci. 401/403 teruji otomatis (security suite 24 checks hijau).
- **CSP:** `frame-ancestors 'none'`, `object-src 'none'`, `script-src 'self' 'unsafe-inline'` di prod (tanpa `unsafe-eval`); di dev ditambah `unsafe-eval` (dibutuhkan hot reload). Font Google di-allow di style/font/connect.
- **Belum bisa disebut 100% terkunci sampai:**
  1. `security-rls-fix.sql` dijalankan di Supabase SQL Editor,
  2. `KARSA_SETUP_SECRET` di-set di Vercel + lokal.
- **Catatan:** session di cookie bisa dibaca JavaScript (`document.cookie`) — aman selama tidak ada XSS (saat ini tanpa `dangerouslySetInnerHTML`), tapi kalau nanti ada rendering HTML user, pindah ke cookie httpOnly atau short-lived tokens.

---

## 9. API Reference (Kondisi Saat Ini)

| Endpoint | Method | Auth | Fungsi |
|---|---|---|---|
| `/api/create-order` | POST | Publik (validasi ketat) | Insert order kalau belum ada + auto-generate deliverables; update status kalau sudah ada (dengan cek brief cocok) |
| `/api/my-orders` | GET | User | Order dengan `email == user.email` |
| `/api/orders` | GET/PATCH/POST | Admin | Semua order (data lengkap, termasuk email customer) |
| `/api/portal/[orderId]` | GET | User + kepemilikan | Order + content_items + seo_articles |
| `/api/admin/seed` | POST | Admin | Seeder data demo (idempotent) |
| `/api/admin/setup` | POST | Env `KARSA_SETUP_SECRET` | Buat admin pertama |
| `/api/auth/callback` | GET | — | Callback OAuth |

### Validasi `/api/create-order` (jangan longgar-kan tanpa alasan)
- `orderId`: regex `/^[A-Za-z0-9-]{4,40}$/`
- `status`: hanya `ALLOWED_STATUSES` (4 enum)
- `brand`: 2–120 karakter; `description`: 5–5000; `email`: regex; `competitor`/`phone`: validasi tipe
- Update path: `brand` + `email` di body harus cocok dengan baris DB → selain itu **403**

### Kontrak data
- Semua response error JSON: `{ "error": string }` dengan status 400/401/403/500.
- `GET /api/my-orders` & `GET /api/orders` → array order (tanpa content). `GET /api/portal/{id}` → `{ order, contentItems, seoArticles }`.

---

## 10. Generate Deliverables (`lib/generate-deliverables.ts`)

Dipanggil oleh `/api/create-order` (order baru) dan seeder.
- **30 content_items:** day 1–30, pillar berotasi `["Edukasi Solusi", "Storytelling Nyata", "Penawaran Spesial", "Mitos vs Fakta"]` (`(day-1) % 4`), hook/body/cta/caption diisi dari template berbasis brief (brand/kategori).
- **4 seo_articles:** article_type, title, description, outline dari template.
- Idempotent untuk seed (cek keberadaan dulu).

> Batas yang diketahui: konten masih **template**, belum personalisasi AI per brand. Ini pekerjaan besar berikutnya yang masuk akal (lihat §16).

---

## 11. Design Detail Penting (Gotchas Visual)

1. **Globals.css** berisi dua blok "primitives": `Member console primitives (ported from user_dashboard.html)` dan `Admin console primitives (ported from admin_dashboard.html)` — utility class neobrutalism kustom (mis. `.status-chip`, `.shadow-brutal`, ticker/SLA styles). Jangan hapus tanpa cek pemakaian.
2. **Halaman monolitik:** console & portal merangkai semua di satu page — kalau mengubah state/shared logic, cek `console-lib.ts` / `hub-lib.ts` dulu.
3. **Font Google CDN** — CSP harus tetap mengizinkan `fonts.googleapis.com` & `fonts.gstatic.com` (jangan pernah pindah ke self-host tanpa update CSP).
4. **Satu titik amber-500** di landing (dot pilar) itu disengaja (parity dengan HTML asli).
5. Harga `Rp299.000` **hardcoded** di beberapa tempat (constants + copy halaman) — ubah semua kalau ganti harga.
6. Middleware mengecualikan file statis (`.svg|.png|...` + `_next/*` + favicon) — jangan hapus pattern itu.

---

## 12. Testing (E2E Playwright)

Script test **tidak di-commit** — hidup di `/tmp/opencode/` (mesin lokal). Kalau hilang (mis. laptop restart & /tmp terhapus), regenerasi dari alur di bawah. Instal: `npm i playwright` + `npx playwright install chromium`.

| Suite | File | Checks | Isi |
|---|---|---|---|
| Customer | `e2e-customer.mjs` | 44 | Alur pembelian penuh: landing → brief → login → checkout → invoice → dashboard → portal |
| Admin | `e2e-admin.mjs` | 25 | 5 plates console, modal, CSV export, backup JSON, new order masuk DB |
| Dashboard | `e2e-dashboard.mjs` | 9 | Dashboard customer + tools |
| Security | `e2e-security.mjs` | 24 | 401/403 semua endpoint, validasi create-order, open redirect, headers, CSP smoke |

Total **102 checks**. Jalankan: `node e2e-customer.mjs` dst. (dev server harus jalan di `localhost:3001`).

### Akun test
| Role | Email | Password | Catatan |
|---|---|---|---|
| Admin | `admin@karsa.my.id` | `Admin123!@#` | role=admin di profiles (di-reset via auth.admin.updateUserById) |
| Customer | `sri.tempong@gmail.com` | `Test1234!@` | pemilik order `INV-993810` (seed) |

### Trik yang sudah terbukti
- Session di cookie: untuk panggil API ber-auth dari `page.evaluate`, baca `document.cookie` → ambil `sb-*-auth-token` → base64 decode → `access_token` → header `Authorization: Bearer`.
- Login helper: tunggu `page.waitForURL(/dashboard|console/)` setelah submit (redirect pasca-login menghancurkan context kalau cuma `waitForTimeout`).

---

## 13. Environment Variables

| Variable | Scope | Fungsi |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | URL proyek Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Kunci anon (publik) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Service role (melewati RLS) — jangan pernah di client bundle |
| `KARSA_SETUP_SECRET` | Server only | Bootstrap admin (`/api/admin/setup`) — **belum di-set** ⚠️ |

Lokal: `.env.local` (jangan di-commit). Vercel: dashboard → Settings → Environment Variables (Production + Preview).

---

## 14. Development Workflow

```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"   # wajib sebelum npm/node
npm run dev -- -p 3001     # dev server (port 3001 — E2E & README memakai ini)
npm run build              # production build
npm run start -- -p 3100   # serve hasil build (cek CSP prod di sini)
npm run lint               # ESLint
npx tsc --noEmit           # TypeScript check
```

Deploy = `git push origin main` → Vercel auto-build & deploy. Tidak ada staging terpisah.

---

## 15. Riwayat Pengerjaan Terperinci

1. **Migrasi halaman HTML → Next.js** (landing → login → dashboard user → admin console → client hub), aturan 100% visual parity dengan `usekarsahtmlonly/`.
2. **Redesign penuh ke neobrutalism** — semua halaman (checkout, invoice, legal, 404 ikut di-sync).
3. **Client Hub port dari `customer_dashboard.html`** — readout plate, SLA ticker, stepper, rail 01–06, calendar 30 hari, script studio + teleprompter, SEO outlines, audit, revisi→WA, checklist 67 item, order selector.
4. **E2E testing putaran pertama** → menemukan 2 bug kritis:
   - Alur beli **tidak pernah menulis order ke DB** (hanya localStorage) → `/api/create-order` sekarang insert-if-missing.
   - Order baru **tanpa konten** → auto-generate 30 content + 4 SEO via `generate-deliverables.ts`.
5. **Security audit menyeluruh** → 8 kerentanan (bagian 8) ditutup, diverifikasi dengan security E2E + re-run semua suite (semua hijau).
6. **Pembersihan repo** — hapus 19 file mati (HTML sumber, boilerplate SVG, duplikat), `architecture.md` → `docs/`, README & `.env.example` asli.

---

## 16. Belum Dikerjakan / Roadmap

### 🔴 Blokir segera (2 aksi manual, bukan kode)
1. **Jalankan `src/seed/security-rls-fix.sql`** di Supabase Dashboard → SQL Editor. Tanpa ini, data masih bisa dibaca lewat anon key.
2. **Set `KARSA_SETUP_SECRET`** di Vercel env (+ `.env.local` kalau mau setup lokal). Tanpa ini `/api/admin/setup` tidak berfungsi (bootstrap admin pertama tidak bisa dilakukan lewat API).

### 🟡 Pekerjaan produk berikutnya (kandidat terbaik)
1. **Gateway pembayaran asli** (Midtrans/Xendit) — ganti simulasi VA + countdown. Arsitektur sudah siap: status `PENDING_PAYMENT` + hook pembayaran tinggal diarahkan ke update status yang sama.
2. **Konten personalisasi AI** — ganti template `generate-deliverables.ts` dengan panggilan LLM per brief (perlu kunci API server-side; pastikan tidak bocor ke client).
3. **Email transaksional** (konfirmasi order, notifikasi status) — pakai Resend/Supabase Auth email templates.
4. **Simpan field brief lengkap** — terapkan `add-order-brief-fields.sql` (content_goal/content_tone/priority_channel) + update insert di create-order.
5. **Populasi `user_id`** pada order — sekarang kepemilikan via email (rapuh kalau email berubah); migrasi ke `user_id` + policy user_id-based.

### 🟢 Polish
- Sitemap/robots.txt + metadata SEO (belum ada).
- Analytics (Vercel Analytics / GA4) — tidak ada sama sekali.
- Error boundary + loading skeleton.
- Komit test suite E2E ke repo (`/tmp/opencode` bisa hilang saat restart).
- `CheckoutModal.tsx` tidak terpakai → hapus atau pakai.
- Hapus `tsconfig.tsbuildinfo` bila muncul (artifact, sudah di-gitignore).

---

## 17. Panduan Memulai Kerja (untuk AI/dev berikutnya)

1. Baca dokumen ini sampai habis (terutama §5, §8, §9, §16).
2. `npm install` lalu `npm run dev -- -p 3001` — buka `localhost:3001`.
3. Login admin: `admin@karsa.my.id` / `Admin123!@#` → `/console`. Login customer: `sri.tempong@gmail.com` / `Test1234!@` → lihat `INV-993810` di `/portal/INV-993810`.
4. Sebelum mengubah perilaku API: cek `lib/api-auth.ts` + `lib/api-client.ts` — semua route baru WAJIB pakai pola yang sama.
5. Sebelum mengubah tampilan: bandingkan dengan HTML asli di `usekarsahtmlonly/` dan jangan rusak parity.
6. Setelah mengubah kode: `npm run build` + `npx tsc --noEmit` + jalankan suite E2E (bagian 12).
7. Jangan commit `.env.local`, jangan pernah menaruh secret di kode client.
8. Push ke `main` = deploy. Kalau ragu, tanya owner dulu.

### Aturan emas
- **Semua akses data customer lewat API routes ber-auth** — jangan pernah panggil Supabase langsung dari client dengan anon key untuk data sensitif.
- **Jangan longgarkan validasi** di `/api/create-order` tanpa alasan keamanan yang jelas.
- **CSP prod tanpa `unsafe-eval`** — kalau halaman error di prod dengan pesan CSP, itu tanda kode baru butuh izin CSP (atau pindah ke nonce).
- **Struktur di luar `src` sudah bersih** — jaga tetap bersih (README, docs/, .env.example; aset hanya di `public/`).

---

*Dokumen ini ditulis agar AI atau developer mana pun bisa langsung memahami arah proyek tanpa konteks sebelumnya. Perbarui bagian "Pembaruan terakhir" + §16 setiap ada milestone besar.*