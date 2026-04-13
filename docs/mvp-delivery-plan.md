# RedBlueAI MVP Delivery Plan

This document maps the RedBlueAI MVP execution plan to the live GitHub issue backlog in `ImadMoussaid/RedBlueAI`.

## Delivery principle

Build RedBlueAI as a consent-first, founder-operated MVP for web app and API cyber exercises with:
- explicit customer authorization capture
- centralized run approval and control plane workflows
- distributed worker execution across multiple hosts
- actionable findings and polished reporting
- CI/CD and regression coverage before broader rollout

## GitHub issue map

- #1 `MVP delivery plan and execution tracker`
  - Top-level tracker for the MVP backlog and completion criteria.
- #2 `Foundation hardening: rename cleanup, dependency upgrades, and app baseline`
  - Normalize the repository branding, remove scaffold drift, and upgrade framework dependencies.
- #3 `Implement auth, user model, and workspace foundation`
  - Add the first real account and workspace layer.
- #4 `Build app onboarding with scope and guardrails`
  - Persist target application setup, in-scope assets, and guardrail definitions.
- #5 `Implement customer consent capture and authorization audit trail`
  - Persist customer authorization, versioned consent content, and acceptance history.
- #6 `Implement exercise request lifecycle and operator approval flow`
  - Create the founder-operated run review and lifecycle system.
- #7 `Implement distributed worker orchestration and queue processing`
  - Build the multi-host execution model on top of a central queue and worker heartbeat system.
- #8 `Build findings, actionable fixes, and run detail experience`
  - Replace placeholder dashboards with persisted findings and remediation guidance.
- #9 `Implement artifact storage and professional PDF reporting`
  - Generate and store downloadable reports and supporting evidence.
- #10 `Implement billing and per-run payment flow`
  - Add the MVP commercial path where one paid run maps to one exercise execution.
- #11 `Set up CI/CD pipeline for RedBlueAI`
  - Add GitHub Actions and deployment-ready automation for validation and release flow.
- #12 `Add regression testing strategy and automated coverage`
  - Protect core flows with automated regression suites integrated into CI.

## Recommended execution order

### Phase 1: baseline stability
- #2 Foundation hardening
- #3 Auth, user, and workspace foundation

### Phase 2: request creation and trust model
- #4 App onboarding with scope and guardrails
- #5 Consent capture and audit trail
- #6 Exercise request lifecycle and operator approval

### Phase 3: execution and outputs
- #7 Distributed worker orchestration
- #8 Findings and actionable fixes
- #9 Artifact storage and PDF reporting

### Phase 4: commercial and release readiness
- #10 Billing and per-run payment flow
- #11 CI/CD pipeline
- #12 Regression testing strategy and automation

## Definition of done

The RedBlueAI MVP is ready for pilot use when:
- users can authenticate and create a workspace
- a customer app can be added with saved scope and guardrails
- customer consent is captured and stored as a versioned artifact
- an exercise request can be reviewed, approved, queued, and assigned
- a worker can execute the run through a centralized queue model
- findings and actionable fixes are visible in the UI
- a polished PDF report can be generated and downloaded
- per-run billing is represented in the product flow
- CI/CD validates changes automatically
- regression tests cover the critical product flows
