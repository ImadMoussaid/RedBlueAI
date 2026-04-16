# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: RedBlueAI

Consent-first AI cyber exercise platform for web apps and APIs. Founder-operated approval flow. Currently **mock-data driven** — the UI and orchestration are real but persistence, payments, auth, and model execution are not yet wired.

## Commands

```bash
npm install          # install dependencies
npm run dev          # Next.js dev server → localhost:3000
npm run build        # production build
npm test             # Node.js native test runner (tests/*.mjs)
npm run lint         # ESLint
npm run worker       # run distributed worker process
docker compose up    # full stack: web + worker + postgres + redis + ollama
```

Single test file:
```bash
node --test tests/scaffold.test.mjs
node --test tests/worker.test.mjs
```

Database (when wiring Prisma):
```bash
npx prisma generate
npx prisma db push
```

## Architecture

### Stack
- **Next.js 15 App Router** (React 19, TypeScript strict)
- **Prisma ORM** → PostgreSQL 16
- **Redis 7** (job queues, not yet consumed)
- **Ollama** with `qwen3:14b` (planned model runtime)
- **Node.js 22** for worker processes
- Plain CSS with CSS variables (no Tailwind or CSS-in-JS)

### Route Layout

```
app/
  (marketing)/      # landing, sign-in, register, verify-email, forgot-password
  (app)/            # workspace, dashboard, apps, consent, launch, runs, workers, billing, reports
  api/              # health check only so far
```

### Feature Layer Pattern

Each feature follows the same three-layer pattern:

1. **`lib/{feature}/types.ts`** — TypeScript types
2. **`lib/{feature}/mock.ts`** — mock repository (simulates future Prisma repositories)
3. **`components/{feature}/*.tsx`** — React components

When wiring real persistence, replace `lib/{feature}/mock.ts` with server actions or Prisma queries — the types and components stay.

### Worker Architecture

- `worker/` — Node.js distributed worker processes
- `worker/mock-control-plane.js` — simulated control plane
- Workers claim jobs via heartbeat model, execute sequential phases, and report findings
- Exercise lifecycle: `pending → approved → queued → assigned → running → reporting → completed`

### Prisma Schema

Models: `User`, `Workspace`, `App`, `Consent`, `Exercise`, `Worker`

Exercise states are encoded as strings (not enums): `pending_manual_start`, `approved`, `queued`, `assigned`, `running`, `reporting`, `completed`, `failed`, `blocked`.

Scope, guardrails, and consent snapshots are stored as JSON.

## What Is Mocked vs Real

**Mocked (UI-complete, no real backend):**
- Consent state and audit trail
- Request review / approval lifecycle
- Worker queue, claim, heartbeat, phase flow
- Findings, evidence, reporting outputs
- Per-run billing entitlement state

**Not yet implemented:**
- Real database persistence
- Redis job consumption
- Ollama model execution
- Payment provider integration
- Auth backend
- PDF generation

## CI

GitHub Actions (`.github/workflows/ci.yml`): regression tests → build → Docker build. All three stages must pass.
