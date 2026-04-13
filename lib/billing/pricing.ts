import type { BillingCurrency, RunBillingPlan } from './types';

export const billingPlan: RunBillingPlan = {
  productName: 'RedBlueAI',
  title: 'Fixed-price per run',
  priceCents: 9900,
  currency: 'USD',
  cadence: 'per_run',
  description:
    'One paid exercise run includes customer setup review, manual approval, worker execution, findings, and a polished PDF report.',
  includes: [
    'One approved exercise run',
    'Scope and consent snapshot',
    'Findings dashboard updates',
    'Downloadable PDF report'
  ],
  notes: [
    'No subscription in the MVP',
    'No tiering or seat-based billing',
    'One payment maps to one exercise run'
  ]
};

export function formatCurrency(amountCents: number, currency: BillingCurrency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(amountCents / 100);
}
