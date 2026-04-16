'use strict';

async function generate(baseUrl, model, prompt) {
  const res = await fetch(`${baseUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt, stream: false })
  });
  if (!res.ok) {
    throw new Error(`Ollama request failed: ${res.status}`);
  }
  const data = await res.json();
  return data.response ?? '';
}

module.exports = { generate };
