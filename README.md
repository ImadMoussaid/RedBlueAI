# RedBlueAI

RedBlueAI is a consent-first AI cyber exercise MVP for web apps and APIs.

## Current MVP State

The local MVP now includes:
- Next.js product shell with landing, auth, workspace, apps, consent, launch, runs, workers, reports, and billing routes
- founder-operated request approval flow with visible approve/block transitions
- customer consent capture with versioned authorization and audit-trail UI
- app onboarding with scope and guardrail snapshots
- distributed worker fleet view with queue assignment and heartbeat state
- findings and run-detail views with evidence, remediation ownership, and actionable fixes
- reporting surface with executive summary, evidence references, artifact summaries, and remediation plan
- per-run billing and entitlement gating wired into the launch flow
- Prisma starter schema for users, workspaces, apps, consents, exercises, and workers
- Dockerfile and docker-compose baseline for web, worker, db, redis, and Ollama
- GitHub Actions CI plus regression coverage for core MVP scaffolding and orchestration contracts

## Current Architecture Assumptions

- Frontend/backend: Next.js app router
- Database: PostgreSQL via Prisma schema
- Queue/control plane: centralized, mock-mode for now
- Worker runtime: distributed worker hosts with heartbeat and claim simulation
- Planned model runtime: Ollama with `qwen3:14b`
- Current product state: mostly mock-data driven UI and orchestration, not real persistence or payments yet

## Local Development

```bash
cd /Users/imadmoussaid/Documents/Apps/PurpleRain
npm install
npm test
npm run build
npm run dev
```

Then open:
- `http://localhost:3000`
- `http://localhost:3000/workspace`
- `http://localhost:3000/apps/new`
- `http://localhost:3000/consent`
- `http://localhost:3000/launch`
- `http://localhost:3000/runs`
- `http://localhost:3000/workers`
- `http://localhost:3000/reports`
- `http://localhost:3000/billing`

## Docker

If Docker is installed locally:

```bash
docker compose up --build
```

If `docker` is not installed, use `npm run dev` instead.

## What Is Mocked vs Real

Implemented as mocked MVP behavior:
- consent state and audit trail
- request review and approval lifecycle
- worker queue, claim, heartbeat, and sequential phase flow
- findings, evidence, and reporting outputs
- per-run billing entitlement state

Not implemented yet as real backend behavior:
- real database persistence wiring
- real queue/Redis job consumption
- real Ollama model execution
- real payment provider integration
- real authentication backend
- real PDF generation pipeline

## Recommended Next Steps

1. Replace mock data with real repositories and server actions.
2. Wire Prisma client and seed data.
3. Add real payment provider integration.
4. Connect worker orchestration to Redis and persisted run state.
5. Integrate Ollama and real report generation.
