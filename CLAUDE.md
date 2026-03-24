# VisitFlorence.co — Florence, CO Visitor Guide

> AGENTS: Read this file BEFORE touching any code. Check git log. Do NOT redo completed work.
> Last updated: 2026-03-24 (Session 133)
> **MONOREPO:** Web is at `apps/web/`, mobile at `apps/mobile/` (scaffold). Vercel rootDirectory = `apps/web`.

## Project Overview

VisitFlorence.co is a Colorado tourism directory site for Florence, CO — the Antique Capital of Colorado. Covers 100+ antique shops, craft breweries, local dining, outdoor adventures, and the gateway to the Royal Gorge. Part of the Wave 8 directory site build sprint (S129).

- **Location in APPS:** `~/Documents/APPS/_new-projects/visitflorence/`
- **GitHub:** https://github.com/Trace9095/visitflorence
- **Branch:** main
- **Production URL:** visitflorence.co
- **Vercel Slug:** `visitflorence`
- **Version:** 0.1.0
- **Admin:** CEO@epicai.ai / Trace87223!

## Current Status

- **Build:** ✅ READY
- **Deployment:** On Vercel, rootDirectory = `apps/web`
- **Neon DB:** Connected via Vercel Storage integration
- **Drizzle schema:** Pushed
- **GA4:** Wired (gtag.js in head)
- **Google Search Console:** Verification meta tag configured (google: '7jc12-lVG5f_urymoqzGqftRCjj_5iFngU0PSXzXdPI')
- **Vercel Analytics + Speed Insights:** Wired in layout.tsx
- **DNS:** visitflorence.co — A: 76.76.21.21, CNAME www: cname.vercel-dns.com (configured S129)
- **Last commit:** `83fe4a1` — fix: remove free listing tier entirely — $99/mo minimum enforced

## Monorepo Structure

```
visitflorence/
├── apps/
│   ├── web/           ← Next.js ~16.1.5 (Vercel root directory)
│   │   ├── app/       ← App Router pages (no src/ directory)
│   │   └── lib/db/    ← Drizzle config + seed
│   └── mobile/        ← Expo (scaffold only)
├── packages/
│   └── shared/        ← Shared types (@visitflorence/shared)
├── turbo.json
└── package.json
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js ~16.1.5 (App Router) |
| Language | TypeScript strict |
| Styling | Tailwind CSS v4 |
| Database | Neon PostgreSQL + Drizzle ORM |
| Auth | JWT (jose) + bcryptjs |
| Payments | Stripe ($99/mo minimum listings) |
| Email | Resend |
| Fonts | Geist (via geist package) |
| Icons | Lucide React |
| Analytics | GA4 + Vercel Analytics + Speed Insights |

## Root Directory & Build Command

```bash
# Monorepo: web app is at apps/web/
# Vercel rootDirectory = apps/web
# Build command:
npx next build
# Dev:
npm run dev
# DB migrations:
cd apps/web && npx drizzle-kit push
# DB seed:
cd apps/web && npx tsx lib/db/seed.ts
```

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Landing — hero + featured listings + categories |
| `/(website)/antiques` | Antique shops directory |
| `/(website)/dining` | Restaurants & dining |
| `/(website)/breweries` | Craft breweries |
| `/(website)/activities` | Activities & outdoor |
| `/(website)/events` | Events listing |
| `/(website)/blog` | Blog / content |
| `/(website)/about` | About Florence |
| `/(website)/pricing` | Business listing pricing ($99/mo minimum) |
| `/(website)/request-listing` | Business listing request form |
| `/(website)/add-listing` | Add a new listing |
| `/(website)/manage` | Business management |
| `/admin` | Admin dashboard |
| `/api/` | API routes |
| `/sitemap.ts` | Dynamic sitemap |
| `/robots.ts` | Robots config |

## Brand Identity

- **Theme:** Dark #0D1117 background, Antique brass/burgundy color scheme (antique brass compass favicon)
- **Font:** Geist Sans + Geist Mono
- **Icons:** Lucide React (no emojis)
- **Style:** Heritage tourism — antique, historic, artisan — the Antique Capital of Colorado

## CEO Rules for This Project (Wave 8 Directives)

1. **$99/mo minimum** for business listings — NO free tier ever
2. Sister businesses appear as ACTUAL directory entries (not just banners)
3. Every business verified as real and OPEN before listing
4. Every external URL tested before deploy
5. Real photos from real businesses only — no stock photos
6. Antique brass/burgundy color scheme — must look independent from other directory sites
7. **The Edge Zip is NOT listed** on any directory site (permanent exclusion)
8. GA4 + Google Ads conversion tracking wired
9. Separate Neon DB (no sharing between sites)
10. No emojis anywhere — use Lucide icons
11. De-branding: Must NOT show "Epic AI" to visitors
12. Fritz Restaurant Salida is CLOSED — never list it

## Recent Commits

```
83fe4a1 fix: remove free listing tier entirely — $99/mo minimum enforced
d631335 fix: remove stock photos from seed data — use gradient fallbacks
3e212db fix: remove The Edge Zip from all directory listings (CEO directive)
2de94d7 fix: add gtag.js to head for GSC verification
0c37733 chore: trigger redeploy for GA4 activation
f2a899d feat: add Google Search Console verification meta tag
667e40c feat: wire GA4 tracking + Google Search Console verification slot
4b14ae4 feat: add icon.tsx and apple-icon.tsx favicons (antique brass compass)
```

## Completed Work (DO NOT REDO)

- ✅ Full directory site built (antiques, dining, breweries, activities, events, blog)
- ✅ Neon DB connected, Drizzle schema pushed
- ✅ GA4 + Vercel Analytics + Speed Insights wired
- ✅ Google Search Console verification meta tag
- ✅ Free tier removed — $99/mo minimum enforced
- ✅ Stock photos removed — gradient fallbacks used
- ✅ The Edge Zip removed from listings (CEO directive)
- ✅ Favicons wired (antique brass compass)
- ✅ DNS configured (visitflorence.co → Vercel)

## Known Issues / TODO

1. Replace remaining photo placeholders with gradient fallbacks + "Claim this listing" CTA
2. Final visual QA sweep — every page, every button, every link
3. Google Ads conversion tracking (GA4 is wired, but Ads tag may need verification)
4. Submit sitemap to Google Search Console (Trace must verify domain ownership first)

## Environment Variables

```
DATABASE_URL=                # Neon PostgreSQL (via Vercel Storage integration)
NEXT_PUBLIC_APP_URL=         # https://visitflorence.co
NEXT_PUBLIC_GA_ID=           # GA4 Measurement ID
STRIPE_SECRET_KEY=           # Stripe secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=  # Stripe publishable
JWT_SECRET=                  # Auth JWT secret
RESEND_API_KEY=              # Resend for emails
```

## GitHub & Remote

- **Repo:** https://github.com/Trace9095/visitflorence
- **Branch:** main (auto-deploy to Vercel)
