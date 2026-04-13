import type { BillingLineItem, BillingSummary, RunPaymentRecord } from './types';
import { billingPlan } from './pricing';

const lineItems: BillingLineItem[] = [
  {
    label: 'RedBlueAI exercise run',
    description: 'Founder-reviewed exercise execution, finding capture, and report generation',
    amountCents: billingPlan.priceCents,
    quantity: 1
  }
];

const latestPayment: RunPaymentRecord = {
  id: 'pay_01J0R1BILLING',
  runId: 'run_acme_staging_001',
  status: 'pending_payment',
  currency: billingPlan.currency,
  amountCents: billingPlan.priceCents,
  description: 'Pending payment for Acme staging app exercise run',
  createdAt: '2026-04-13T15:00:00.000Z'
};

export const billingSummary: BillingSummary = {
  plan: billingPlan,
  latestPayment,
  lineItems
};
