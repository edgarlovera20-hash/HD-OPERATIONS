# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`HD-OPERATIONS` is the daily-operations platform of the Heavenly Dreams (HD) ecosystem
(`app.heavenlydreams.com.mx`): operational tasks, agenda, productivity snapshots, internal
notifications, and supervisor reports. Per `ecosystem-boundaries.v1.json` it must **not** own CRM
debt collection, global user administration, finance treasury, or control-tower decisions. It
forwards events to `HD-BRAIN` (`BRAIN_EVENTS_URL=.../api/events/ingest`).

It is one of several sibling apps; the shared foundation lives in `HD-CORE`.

## Critical: sibling checkout requirement

Dependencies on the shared layer use relative paths, e.g.
`"@hd/core-rbac": "file:../HD-CORE/packages/rbac"`. **`HD-CORE` must be cloned as a sibling
directory** (`../HD-CORE`) or `npm install` fails. CI checks out `HD-CORE` alongside this repo (see
`.github/workflows/ci.yml`). Auth, RBAC, UI, types, and validation come from `@hd/core-*`.

> `README.md` lists an aspirational stack (Next.js/NestJS/Shadcn). The actual stack is React 18 +
> Vite 6 + Tailwind v4 (client) and Express + Prisma (server). Trust the code.

## Commands

```bash
npm install          # runs `prisma generate` via postinstall
npm run dev          # tsx server.ts — Express server (port 3005)
npm run typecheck    # tsc --noEmit — the real quality gate (CI runs this)
npm run lint         # alias for tsc --noEmit
npm run test         # placeholder (echo TODO)
npm run format       # prettier on src/** and server/**
npm run build        # build:client (vite build) + build:server (esbuild → dist/server.cjs)
npm start            # node dist/server.cjs (production: serves built client + /api)
```

No test runner is wired up yet. `typecheck` is the gate CI enforces.

## Architecture

**Single Express process, two modes** (`server.ts`): mounts API routers under `/api/*`; in
production also serves the Vite-built client from `dist/client` with SPA fallback, while in dev it
exposes only the API (Vite serves the React client separately).

- `server/` — `routes/` (one router per resource), `middleware/` (JWT `requireAuth` reading
  `JWT_SECRET`; audit logging), `events/` (cross-platform forwarding secured by `EVENT_BUS_SECRET`),
  `db.ts` (Prisma client).
- `src/` — React + React Router client (`App.tsx`, `pages/`, `components/`).
- `prisma/schema.prisma` — PostgreSQL. After schema edits run `npx prisma generate`.

## RBAC

Use `@hd/core-rbac`'s `hasPermission()` (wildcards like `operations.*`, e.g.
`operations.reports.view`). Permission strings are defined centrally in HD-CORE — add new ones there.

## Config & docs

Copy `.env.example` to `.env` (`DATABASE_URL`, `JWT_SECRET`, `EVENT_BUS_SECRET`, `BRAIN_EVENTS_URL`,
`N8N_WEBHOOK_*`). See `docs/` before non-trivial changes.
