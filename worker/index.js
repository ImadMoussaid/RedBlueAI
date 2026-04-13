const config = {
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  modelName: process.env.MODEL_NAME || 'qwen3:14b',
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
};

console.log('[redblueai-worker] starting placeholder worker');
console.log('[redblueai-worker] configuration', config);
console.log('[redblueai-worker] next step: connect to queue, claim approved jobs, enforce scope, run sequential phases');
