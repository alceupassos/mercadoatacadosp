# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fashion wholesale marketplace ("Mercado Atacado SP") — a multi-tenant e-commerce frontend for wholesale fashion from Bras district in Sao Paulo, built on top of Medusa.js.

## Backend (Medusa.js)

- **API URL:** `http://62.171.181.241:9000`
- **Admin Panel:** `http://62.171.181.241:9000/app`
- **Credentials:** `admin@angra.io` / `B5b0dcf500@#`
- **Database:** PostgreSQL at `postgresql://angrauser:B5b0dcf500@#@localhost:5432/angraprojeto`
- **Publishable API Key:** `pk_dc1824662c3758e57a738ee1954bb10461702e002e0bb723a41075b6c494a6cc`

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **State:** React Query (server state) + Context (cart/auth)
- **Forms:** react-hook-form + zod
- **Video:** Remotion (product showcases)

## Commands

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build
npm run lint      # Run ESLint
```

## Design Mockups

The `mkt1.png` through `mkt9.png` files are the UI/UX reference layouts:
- mkt1: Homepage (full scroll with hero, categories, featured products)
- mkt2: Category listing (sidebar filters, product grid)
- mkt3: Search results
- mkt4: Product detail (image gallery, variants, buy box)
- mkt5: Cart page
- mkt6: Checkout page
- mkt7: Account dashboard (order history, addresses)
- mkt8: Order detail (dark theme, status tracking)
- mkt9: Account settings (profile form)

## Design System

- Primary (brand blue-teal): `#488ba7`
- Accent (CTA gold/amber): `#f3b94d`
- Background: `#f1f4f9`
- Footer dark navy: `#222336`
- Alert/danger red: `#d10030`

## Medusa Integration

Use `@medusajs/medusa-js` for typed API access to the Medusa storefront.
All server data fetching goes through React Query hooks in `src/hooks/`.
