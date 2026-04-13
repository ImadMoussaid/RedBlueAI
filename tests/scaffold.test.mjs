import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import './worker.test.mjs';

const repoFiles = [
  'README.md',
  'package.json',
  'docker-compose.yml',
  '.env.example',
  'lib/config/site.ts',
  'worker/index.js',
  'app/api/health/route.ts',
  'app/(app)/workers/page.tsx',
  'worker/mock-control-plane.js',
  'app/(app)/launch/page.tsx',
  'app/(app)/runs/page.tsx',
  'app/(app)/runs/[runId]/page.tsx',
  'app/(app)/consent/page.tsx',
  'docs/mvp-delivery-plan.md',
  'prisma/schema.prisma',
  'lib/consent/mock.ts',
  'lib/exercises/mock.ts'
];

async function readText(relativePath) {
  return readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('branding is consistently RedBlueAI and legacy names are absent', async () => {
  const packageJson = JSON.parse(await readText('package.json'));

  assert.equal(packageJson.name, 'redblueai');

  const fileContents = await Promise.all(repoFiles.map((file) => readText(file)));
  const combined = fileContents.join('\n');

  assert.match(combined, /RedBlueAI/);
  assert.doesNotMatch(combined, /Purple Rain|PurpleRain|purple-rain|purple_rain/);
});

test('package scripts include the CI-relevant entry points', async () => {
  const packageJson = JSON.parse(await readText('package.json'));

  assert.equal(packageJson.scripts.dev, 'next dev');
  assert.equal(packageJson.scripts.build, 'next build');
  assert.equal(packageJson.scripts.worker, 'node worker/index.js');
  assert.equal(packageJson.scripts.test, 'node --test tests/scaffold.test.mjs');
});

test('prisma schema includes the exercise lifecycle and safety snapshots', async () => {
  const schema = await readText('prisma/schema.prisma');

  for (const status of ['pending_manual_start', 'approved', 'queued', 'assigned', 'running', 'reporting', 'completed', 'failed', 'blocked']) {
    assert.ok(schema.includes(status), `missing status ${status}`);
  }

  for (const field of ['scopeSnapshot', 'guardrailsSnapshot', 'consentSnapshot', 'manualTriggerRequired', 'approvedAt']) {
    assert.ok(schema.includes(field), `missing field ${field}`);
  }
});

test('docker compose exposes the expected control plane services', async () => {
  const compose = await readText('docker-compose.yml');

  for (const service of ['web:', 'worker:', 'db:', 'redis:', 'ollama:']) {
    assert.ok(compose.includes(service), `missing service ${service}`);
  }

  assert.ok(compose.includes('POSTGRES_DB: redblueai'));
  assert.ok(compose.includes('reports_data:'));
  assert.ok(compose.includes('evidence_data:'));
});
