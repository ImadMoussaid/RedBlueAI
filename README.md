# RedBlueAI

RedBlueAI is a consent-first AI cyber exercise SaaS for web apps and APIs.

## What is scaffolded

- Next.js app shell with landing page and operator routes
- Add-app starter flow
- Consent capture page
- Run queue placeholder view
- Health endpoint
- Prisma starter schema for apps, exercises, consent, and workers
- Dockerfile and docker-compose baseline for web, worker, db, redis, and ollama
- Placeholder worker entrypoint

## Planned next steps

1. Install dependencies and generate a lockfile.
2. Wire Prisma client and seed data.
3. Replace mock data with real repositories and actions.
4. Implement consent persistence and exercise request creation.
5. Add queue consumption, worker heartbeat, and job assignment.

## Run locally

```bash
npm install
npm run dev
```

## Run with Docker

```bash
docker compose up --build
```
