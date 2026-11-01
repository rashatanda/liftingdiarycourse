# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Standards — Read First

**Before generating any code, always check the `/docs` directory for a relevant standards file and follow it.**

| Area | Doc |
|------|-----|
| UI / components / date formatting | `docs/ui.md` |

If a `/docs` file covers the area you are working in, its rules take precedence over general defaults.


## Warning: Non-standard Next.js version

This project uses **Next.js 16.4.3** with **React 19.3.0** — a version likely newer than your training data. APIs, conventions, and file structure may differ significantly. Before writing any Next.js-specific code, read the relevant guide in `node_modules/next/dist/docs/`.

Notable non-standard APIs already in use:
- `LayoutProps<"/">` type for layout components (not the standard `{ children: React.ReactNode }`)
- `cacheComponents`, `partialPrefetching` config options
- `experimental.agentFeedback` flag

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
```

## Stack

- **Next.js 16** App Router with Turbopack
- **Tailwind CSS v4** via `@tailwindcss/turbopack` loader (no `tailwind.config.js` — configured through CSS)
- **TypeScript 5**
- **Clerk** (`@clerk/nextjs`) for authentication

## Project structure

- `src/app/` — App Router pages and layouts
- `src/app/layout.tsx` — Root layout with Geist font variables on `<html>`, body uses `flex flex-col min-h-full`; `ClerkProvider` wraps children inside `<body>`
- `src/app/globals.css` — Global styles (Tailwind v4 entry point)
- `src/proxy.ts` — Clerk middleware (`clerkMiddleware`) applied to all non-static routes
- `src/app/sign-in/[[...sign-in]]/page.tsx` — Clerk catch-all sign-in page
- `src/app/sign-up/[[...sign-up]]/page.tsx` — Clerk catch-all sign-up page

## Authentication (Clerk)

Routes are **public by default**. Protect individual pages, Route Handlers, or Server Actions with `await auth.protect()`.

`next.config.ts` sets `cacheComponents: true`, so any Server Component that calls `auth()`, `currentUser()`, or renders `<Show>` must be wrapped in `<Suspense>`. The same applies to the catch-all `<SignIn />` and `<SignUp />` pages (already done).

`auth()` is async in Next.js 15+: always `await auth()`.

## Tailwind v4 notes

Tailwind v4 has breaking changes from v3: no `tailwind.config.js`, theme customization is done in CSS via `@theme` directive, and utility syntax may differ. Read `node_modules/tailwindcss/` docs before using theme customization or unfamiliar utilities.
