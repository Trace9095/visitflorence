# VisitFlorence.co

Discover Florence, Colorado — the Antique Capital of Colorado. Explore 100+ antique shops, craft breweries, local dining, and outdoor adventures just minutes from the Royal Gorge.

**Live:** [visitflorence.co](https://visitflorence.co) · **Vercel:** `visitflorence`

---

## Stack

- **Framework:** Next.js ~16.1.5 App Router
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Payments:** Stripe ($99/mo minimum listings)
- **Monorepo:** Turborepo (npm workspaces)
- **Deployment:** Vercel (rootDirectory: `apps/web`)

## Quick Start

```bash
npm install
npm run dev              # Next.js dev server

# Database
cd apps/web
npx drizzle-kit push     # push schema
npx tsx lib/db/seed.ts   # seed data
```

## Structure

```
apps/web/    — Next.js 16 (Vercel root dir, no src/ dir)
apps/mobile/ — Expo (scaffold)
packages/shared/ — @visitflorence/shared
```

## CEO Rules

- $99/mo minimum for listings — NO free tier
- No emojis — Lucide icons only
- No Epic AI branding visitor-facing
- Real photos only — no stock photos
- The Edge Zip is NOT listed on any directory site
- Every business verified real and OPEN before listing
