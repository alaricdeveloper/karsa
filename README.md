# Karsa Studio

Platform SaaS untuk UMKM Indonesia — paket **30-Day Content Calendar** (Rp299.000): 30 script video, caption, 4 artikel SEO, competitor audit, dan Notion content OS, dikirim dalam 24 jam.

## Route Map

| Route | Fungsi |
|---|---|
| `/` | Landing page + brief intake |
| `/login` | Login/registrasi customer |
| `/checkout` | Checkout (simulasi transfer bank) |
| `/dashboard` | Dashboard customer (status order) |
| `/portal/[orderId]` | Client hub: kalender konten, script, SEO, revisi |
| `/console` | Admin console (order, analitik, AI tools) |
| `/privacy` `/terms` `/refund` `/invoice` `/404` | Halaman pendukung |

## API

| Endpoint | Auth | Fungsi |
|---|---|---|
| `/api/create-order` | Publik (validasi ketat) | Buat order dari brief |
| `/api/my-orders` | Session customer | Order milik user sendiri |
| `/api/portal/[orderId]` | Session + kepemilikan | Data deliverable |
| `/api/orders` | Admin | CRUD semua order |
| `/api/admin/seed` | Admin | Seeder data demo |
| `/api/admin/setup` | Env `KARSA_SETUP_SECRET` | Bootstrap admin pertama |

## Stack

Next.js (App Router) · Supabase (Auth + Postgres) · Tailwind · neobrutalism

## Pengembangan

```bash
npm run dev        # dev server (port 3001)
npm run build      # production build
npm run start      # jalankan hasil build
```

## Setup

1. Salin `.env.example` → `.env.local`, isi `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `KARSA_SETUP_SECRET`
2. Jalankan migrasi di Supabase SQL Editor (folder `src/seed/`)
3. Set `KARSA_SETUP_SECRET` juga di Vercel (untuk `/api/admin/setup`)

## Dokumentasi

- `docs/architecture.md` — arsitektur & handover lengkap
- `src/seed/` — migrasi RLS + SQL seed

## Deployment

Auto-deploy dari branch `main` via Vercel. Live: `https://usekarsa.vercel.app`