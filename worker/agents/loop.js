'use strict';

const prompts = require('./prompts');
const { generate } = require('../ollama-client');

// ---------------------------------------------------------------------------
// Internal: parse a raw model response into JSON
// ---------------------------------------------------------------------------

async function callAgent(agentName, job, exerciseState, config, log) {
  const promptFn = prompts[agentName];
  if (!promptFn) throw new Error(`No prompt registered for agent: ${agentName}`);

  const prompt = promptFn(job, exerciseState);
  const raw = await generate(config.ollamaBaseUrl, config.modelName, prompt);

  // Strip markdown code fences if the model wraps its response
  const clean = raw.replace(/^```[a-z]*\n?/i, '').replace(/```\s*$/i, '').trim();

  // Extract the first complete JSON object even if the model prepends/appends prose
  const start = clean.indexOf('{');
  const end = clean.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error(`No JSON object found in ${agentName} response`);

  const parsed = JSON.parse(clean.slice(start, end + 1));

  log(`agent.${agentName}`, {
    action: parsed.action ?? parsed.decision ?? 'completed',
    findings: parsed.findings ? parsed.findings.length : 0,
  });

  return parsed;
}

// ---------------------------------------------------------------------------
// Safe wrapper — logs errors but does not throw; returns null on failure
// ---------------------------------------------------------------------------

async function safeCallAgent(agentName, job, exerciseState, config, log) {
  try {
    return await callAgent(agentName, job, exerciseState, config, log);
  } catch (err) {
    log(`agent.${agentName}.error`, { error: String(err) });
    return null;
  }
}

// ---------------------------------------------------------------------------
// Helpers to accumulate findings into exerciseState
// ---------------------------------------------------------------------------

function accumulateFindings(output, side, exerciseState) {
  if (!output || !Array.isArray(output.findings)) return;
  if (side === 'red') {
    exerciseState.redFindings.push(...output.findings);
  } else {
    exerciseState.blueFindings.push(...output.findings);
  }
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

async function runExercise(job, config, callApi, log) {
  // -------------------------------------------------------------------------
  // Initialise shared exercise state
  // -------------------------------------------------------------------------
  const exerciseState = {
    target: job.baseUrl || job.appName,
    redFindings: [],
    blueFindings: [],
    detectedActions: [],
    missedActions: [],
    incidentStatus: 'monitoring',
    attackChain: [],
    lastRedOutput: null,
    proposedAction: null,
    purpleOutput: null,
  };

  // =========================================================================
  // PHASE 1 — Safety & Recon
  // =========================================================================

  // 1a. Safety validates the overall exercise scope
  log('phase.start', { phase: 'safety-validation' });
  const safetyInit = await safeCallAgent('safety', job, exerciseState, config, log);
  if (safetyInit && safetyInit.approved === false) {
    log('safety.abort', { reason: safetyInit.reason });
    return { findings: [], executiveSummary: `Exercise aborted by safety agent: ${safetyInit.reason}` };
  }

  // 1b. Recon (always first)
  log('phase.start', { phase: 'recon' });
  const reconOutput = await safeCallAgent('recon', job, exerciseState, config, log);
  accumulateFindings(reconOutput, 'red', exerciseState);
  if (reconOutput) {
    exerciseState.attackChain.push('recon');
    exerciseState.lastRedOutput = reconOutput;
  }

  // 1c. Vulnerability analysis (always second)
  log('phase.start', { phase: 'vulnerability-analysis' });
  const vulnOutput = await safeCallAgent('vulnerability-analysis', job, exerciseState, config, log);
  accumulateFindings(vulnOutput, 'red', exerciseState);
  if (vulnOutput) {
    exerciseState.attackChain.push('vulnerability-analysis');
    exerciseState.lastRedOutput = vulnOutput;
  }

  // =========================================================================
  // PHASE 2 — Adversarial loop (4 rounds)
  // =========================================================================

  const eligibleRedAgents = new Set([
    'initial-access',
    'privilege-escalation',
    'lateral-movement',
    'persistence',
    'exfiltration-impact',
  ]);

  for (let round = 1; round <= 4; round++) {
    log('phase.start', { phase: `adversarial-round-${round}` });

    // ---- a. Red coordinator picks next agent --------------------------------
    const redCoordOutput = await safeCallAgent('red-coordinator', job, exerciseState, config, log);
    let chosenAgent = redCoordOutput ? redCoordOutput.decision : null;

    // Fallback: pick first eligible agent not yet used if coordinator fails or
    // returns something unexpected
    if (!chosenAgent || !eligibleRedAgents.has(chosenAgent)) {
      chosenAgent = [...eligibleRedAgents][0] || null;
    }

    if (!chosenAgent) {
      log('phase.skip', { phase: `adversarial-round-${round}`, reason: 'No eligible red agents remaining' });
      break;
    }

    // ---- b. Safety validates the planned action ----------------------------
    exerciseState.proposedAction = { agent: chosenAgent, rationale: redCoordOutput ? redCoordOutput.rationale : 'coordinator unavailable' };
    const roundSafety = await safeCallAgent('safety', job, exerciseState, config, log);

    if (roundSafety && roundSafety.approved === false) {
      log('safety.block', { round, agent: chosenAgent, reason: roundSafety.reason });

      // Red coordinator must pick differently — remove blocked agent and retry once
      eligibleRedAgents.delete(chosenAgent);
      const fallbackAgent = [...eligibleRedAgents][0] || null;
      if (!fallbackAgent) {
        log('phase.skip', { phase: `adversarial-round-${round}`, reason: 'Safety blocked all remaining agents' });
        break;
      }
      chosenAgent = fallbackAgent;
      exerciseState.proposedAction = { agent: chosenAgent, rationale: 'safety-forced fallback' };
    }

    // Remove from pool so it won't repeat
    eligibleRedAgents.delete(chosenAgent);

    // ---- c. Chosen red agent executes -------------------------------------
    log('phase.start', { phase: `red.${chosenAgent}` });
    const redOutput = await safeCallAgent(chosenAgent, job, exerciseState, config, log);
    accumulateFindings(redOutput, 'red', exerciseState);
    if (redOutput) {
      exerciseState.attackChain.push(chosenAgent);
      exerciseState.lastRedOutput = redOutput;
    }

    // ---- d. Monitoring agent observes -------------------------------------
    log('phase.start', { phase: `blue.monitoring.round-${round}` });
    const monitorOutput = await safeCallAgent('monitoring', job, exerciseState, config, log);
    accumulateFindings(monitorOutput, 'blue', exerciseState);

    // Track detected vs missed
    if (monitorOutput && Array.isArray(monitorOutput.findings)) {
      for (const f of monitorOutput.findings) {
        if (f.detectionStatus === 'triggered') {
          exerciseState.detectedActions.push(`${chosenAgent}:${f.title}`);
        } else if (f.detectionStatus === 'missed') {
          exerciseState.missedActions.push(`${chosenAgent}:${f.title}`);
        }
      }
    }

    // ---- e. Triage classifies ---------------------------------------------
    log('phase.start', { phase: `blue.triage.round-${round}` });
    const triageOutput = await safeCallAgent('triage', job, exerciseState, config, log);
    accumulateFindings(triageOutput, 'blue', exerciseState);

    // Determine if any triage finding escalated to incident
    let isIncident = false;
    if (triageOutput && Array.isArray(triageOutput.findings)) {
      for (const f of triageOutput.findings) {
        if (f.title && f.title.toLowerCase().includes('incident')) isIncident = true;
        if (f.summary && f.summary.toLowerCase().includes('incident')) isIncident = true;
      }
    }

    // ---- f. If incident: incident-response acts ---------------------------
    if (isIncident || exerciseState.incidentStatus === 'active-incident') {
      log('phase.start', { phase: `blue.incident-response.round-${round}` });
      const irOutput = await safeCallAgent('incident-response', job, exerciseState, config, log);
      accumulateFindings(irOutput, 'blue', exerciseState);
    }

    // ---- g. Blue coordinator updates incident status ----------------------
    log('phase.start', { phase: `blue.coordinator.round-${round}` });
    const blueCoordOutput = await safeCallAgent('blue-coordinator', job, exerciseState, config, log);
    if (blueCoordOutput && blueCoordOutput.decision) {
      // Blue coordinator decision maps to an updated incident status
      const decisionLower = blueCoordOutput.decision.toLowerCase();
      if (decisionLower.includes('incident') || decisionLower.includes('escalat')) {
        exerciseState.incidentStatus = 'active-incident';
      } else if (decisionLower.includes('contain')) {
        exerciseState.incidentStatus = 'contained';
      } else if (decisionLower.includes('suspicious')) {
        exerciseState.incidentStatus = 'suspicious';
      }
    }

    log('phase.complete', { phase: `adversarial-round-${round}`, attackChain: exerciseState.attackChain.join(' → ') });
  }

  // =========================================================================
  // PHASE 3 — Deep analysis
  // =========================================================================

  // Threat hunting
  log('phase.start', { phase: 'threat-hunting' });
  const huntOutput = await safeCallAgent('threat-hunting', job, exerciseState, config, log);
  accumulateFindings(huntOutput, 'blue', exerciseState);

  // Forensics
  log('phase.start', { phase: 'forensics' });
  const forensicsOutput = await safeCallAgent('forensics', job, exerciseState, config, log);
  accumulateFindings(forensicsOutput, 'blue', exerciseState);

  // Detection engineering
  log('phase.start', { phase: 'detection-engineering' });
  const detEngOutput = await safeCallAgent('detection-engineering', job, exerciseState, config, log);
  accumulateFindings(detEngOutput, 'blue', exerciseState);

  // =========================================================================
  // PHASE 4 — Synthesis
  // =========================================================================

  // Recovery & hardening
  log('phase.start', { phase: 'recovery-hardening' });
  const recoveryOutput = await safeCallAgent('recovery-hardening', job, exerciseState, config, log);
  accumulateFindings(recoveryOutput, 'blue', exerciseState);

  // Purple coordinator
  log('phase.start', { phase: 'purple-coordinator' });
  const purpleOutput = await safeCallAgent('purple-coordinator', job, exerciseState, config, log);
  accumulateFindings(purpleOutput, 'blue', exerciseState);
  if (purpleOutput) exerciseState.purpleOutput = purpleOutput;

  // Executive reporting
  log('phase.start', { phase: 'executive-reporting' });
  const execOutput = await safeCallAgent('executive-reporting', job, exerciseState, config, log);

  // Build executive summary from exec agent's action field or first finding summary
  let executiveSummary = '';
  if (execOutput) {
    if (execOutput.action) {
      executiveSummary = execOutput.action;
    }
    if (execOutput.findings && execOutput.findings.length > 0) {
      executiveSummary = execOutput.findings.map(f => f.summary).join('\n\n');
    }
    accumulateFindings(execOutput, 'blue', exerciseState);
  }

  // =========================================================================
  // Combine all findings
  // =========================================================================

  const findings = [
    ...exerciseState.redFindings,
    ...exerciseState.blueFindings,
  ];

  return { findings, executiveSummary };
}

module.exports = { runExercise };
