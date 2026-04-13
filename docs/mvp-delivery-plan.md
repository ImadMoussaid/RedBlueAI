# RedBlueAI MVP Delivery Plan

This document now reflects the current implemented MVP state in `ImadMoussaid/RedBlueAI`.

## Delivery Principle

RedBlueAI has been built as a consent-first, founder-operated MVP for web app and API cyber exercises with:
- explicit customer authorization capture
- centralized run approval and control plane workflows
- distributed worker execution scaffolding across multiple hosts
- actionable findings and partner-ready reporting
- CI/CD and regression coverage before broader rollout

## GitHub Issue Status

Completed:
- #2 `Foundation hardening: rename cleanup, dependency upgrades, and app baseline`
- #3 `Implement auth, user model, and workspace foundation`
- #4 `Build app onboarding with scope and guardrails`
- #5 `Implement customer consent capture and authorization audit trail`
- #6 `Implement exercise request lifecycle and operator approval flow`
- #7 `Implement distributed worker orchestration and queue processing`
- #8 `Build findings, actionable fixes, and run detail experience`
- #9 `Implement artifact storage and professional PDF reporting`
- #10 `Implement billing and per-run payment flow`
- #11 `Set up CI/CD pipeline for RedBlueAI`
- #12 `Add regression testing strategy and automated coverage`

Still intentionally open:
- #1 `MVP delivery plan and execution tracker`
  - top-level tracker and program record

## What Is Implemented

### Product flows
- workspace and auth shell
- app onboarding with scope and guardrails
- consent capture and audit trail
- exercise launch flow
- founder approval/block flow
- worker fleet monitoring
- findings and run-detail experience
- reporting and artifact delivery UI
- billing and entitlement gating

### Infrastructure baseline
- Dockerfile and Docker Compose stack
- Prisma schema for core entities
- worker mock orchestration layer
- CI workflow for regression, build, and Docker build
- regression tests for orchestration and product contracts

## What Is Still Mocked

The MVP is implemented as a strong product shell, but several systems are still mocked:
- persistence and repositories behind the UI
- queue execution against Redis
- Ollama/Qwen runtime integration
- payment provider integration
- real report/PDF generation
- real auth implementation

## Current Definition of Done Snapshot

The MVP implementation backlog is complete because:
- users can navigate the product shell end to end
- a customer app can be configured with scope and guardrails
- consent is captured as a versioned artifact
- an exercise request can be reviewed, approved, blocked, queued, and assigned in the UI model
- workers have a distributed control-plane model with claim and heartbeat scaffolding
- findings and actionable fixes are visible in the UI
- reporting and artifacts are represented consistently in the product
- billing is represented as one paid run mapping to one entitlement
- CI/CD validates changes automatically
- regression tests cover core MVP scaffolding behavior

## Recommended Next Real Build Phase

1. Replace mock data with persisted Prisma-backed repositories.
2. Wire real auth and workspace persistence.
3. Connect the queue model to Redis and durable run state.
4. Integrate Ollama with `qwen3:14b` for actual worker execution.
5. Add real payment provider integration and real PDF generation.
