const config = {
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  modelName: process.env.MODEL_NAME || 'qwen3:14b',
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
};

console.log('[purple-rain-worker] starting placeholder worker');
console.log('[purple-rain-worker] configuration', config);
console.log('[purple-rain-worker] next step: connect to queue, claim approved jobs, enforce scope, run sequential phases');
