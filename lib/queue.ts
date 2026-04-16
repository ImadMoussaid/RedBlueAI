export const QUEUE_KEY = 'redblueai:exercise:queue';

export function triggerChannel(exerciseId: string) {
  return `redblueai:exercise:trigger:${exerciseId}`;
}
