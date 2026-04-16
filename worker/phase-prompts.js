'use strict';

function rulesCheckPrompt(job) {
  return `You are a security exercise coordinator. Review the following scope and guardrails for a "${job.type}" exercise against "${job.appName}" and confirm they are safe to proceed.

Scope: ${JSON.stringify(job.scopeSnapshot ?? {})}
Guardrails: ${JSON.stringify(job.guardrailsSnapshot ?? {})}

Provide a brief confirmation that the scope is well-defined and the guardrails are appropriate. No JSON needed.`;
}

function reconPrompt(job) {
  return `You are a security researcher performing reconnaissance on "${job.appName}", a ${job.type} application.

Describe what passive recon would reveal: likely entry points, technology stack indicators, exposed services, and user flows. Keep it concise and practical.`;
}

function appMappingPrompt(job) {
  return `You are mapping the attack surface of "${job.appName}", a ${job.type} application.

List the key application surface areas: authentication paths, API endpoints, input forms, session management patterns, and third-party integrations. Keep your response concise.`;
}

function redTeamChecksPrompt(job) {
  return `You are a red team operator assessing "${job.appName}", a ${job.type} application.

Identify the most likely OWASP Top 10 vulnerabilities for this app type. Return ONLY a valid JSON array with no explanation, no markdown, no code fences.

Each item must have these fields:
- title (string)
- severity ("Critical" | "High" | "Medium" | "Low")
- summary (string)
- evidence (string)
- owasp (string, e.g. "A07:2021")
- cwe (string, e.g. "CWE-614")
- action (string)
- remediationOwner (string)
- detectionStatus ("triggered" | "missed" | "review")

Example format: [{"title":"...","severity":"High","summary":"...","evidence":"...","owasp":"A01:2021","cwe":"CWE-285","action":"...","remediationOwner":"...","detectionStatus":"missed"}]`;
}

function blueReviewPrompt(job) {
  return `You are a blue team analyst reviewing findings from a red team exercise against "${job.appName}", a ${job.type} application.

Assess which vulnerability categories would likely be caught by standard defenses: WAF rules, SIEM alerts, anomaly detection, and application logging. Provide a concise summary of detection coverage gaps.`;
}

function purpleSummaryPrompt(job) {
  return `You are a purple team coordinator synthesizing a security exercise for "${job.appName}", a ${job.type} application.

Produce a prioritized list of actionable findings combining red team discoveries with blue team detection gaps. Return ONLY a valid JSON array with no explanation, no markdown, no code fences.

Each item must have these fields:
- title (string)
- severity ("Critical" | "High" | "Medium" | "Low")
- summary (string)
- evidence (string)
- owasp (string)
- cwe (string)
- action (string)
- remediationOwner (string)
- detectionStatus ("triggered" | "missed" | "review")

Example format: [{"title":"...","severity":"High","summary":"...","evidence":"...","owasp":"A01:2021","cwe":"CWE-285","action":"...","remediationOwner":"...","detectionStatus":"missed"}]`;
}

function reportGenerationPrompt(job) {
  return `You are writing an executive summary for a purple team security exercise conducted against "${job.appName}", a ${job.type} application.

Write 2-3 sentences summarizing: what was tested, the most critical risks found, and the top recommended action. Plain text only, no bullet points or markdown.`;
}

module.exports = {
  rulesCheckPrompt,
  reconPrompt,
  appMappingPrompt,
  redTeamChecksPrompt,
  blueReviewPrompt,
  purpleSummaryPrompt,
  reportGenerationPrompt,
};
