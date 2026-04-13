import type { BillingEntitlement, BillingLineItem, BillingSummary, RunPaymentRecord } from './types';
import { billingPlan } from './pricing';

const lineItems: BillingLineItem[] = [
  {
    label: 'RedBlueAI exercise run',
    description: 'Founder-reviewed exercise execution, finding capture, and report generation',
    amountCents: billingPlan.priceCents,
    quantity: 1
  }
];

const payments: RunPaymentRecord[] = [
  {
    id: 'pay_01J0R1BILLING',
    runId: 'RB-001',
    target: 'Acme staging portal',
    status: 'pending_payment',
    currency: billingPlan.currency,
    amountCents: billingPlan.priceCents,
    description: 'Pending payment for Acme staging portal exercise run',
    createdAt: '2026-04-13T15:00:00.000Z',
    entitlementState: 'locked'
  },
  {
    id: 'pay_01J0R1PAID',
    runId: 'RB-002',
    target: 'Northwind API',
    status: 'paid',
    currency: billingPlan.currency,
    amountCents: billingPlan.priceCents,
    description: 'Payment captured for Northwind API exercise run',
    createdAt: '2026-04-13T14:40:00.000Z',
    paidAt: '2026-04-13T14:45:00.000Z',
    entitlementState: 'queued'
  },
  {
    id: 'pay_01J0R1USED',
    runId: 'RB-004',
    target: 'Fabrikam checkout',
    status: 'paid',
    currency: billingPlan.currency,
    amountCents: billingPlan.priceCents,
    description: 'Payment captured for Fabrikam checkout exercise run',
    createdAt: '2026-04-13T15:05:00.000Z',
    paidAt: '2026-04-13T15:07:00.000Z',
    entitlementState: 'consumed'
  }
];

const entitlements: BillingEntitlement[] = [
  {
    runId: 'RB-001',
    target: 'Acme staging portal',
    approvalState: 'awaiting_payment',
    paymentStatus: 'pending_payment',
    operatorNote: 'Consent and scope are present, but the run cannot move into founder review until payment is captured.'
  },
  {
    runId: 'RB-002',
    target: 'Northwind API',
    approvalState: 'queued',
    paymentStatus: 'paid',
    operatorNote: 'Payment has been captured, so the operator can approve and queue the run.'
  },
  {
    runId: 'RB-004',
    target: 'Fabrikam checkout',
    approvalState: 'consumed',
    paymentStatus: 'paid',
    operatorNote: 'The paid entitlement has already been consumed by an assigned run.'
  }
];

export const billingSummary: BillingSummary = {
  plan: billingPlan,
  latestPayment: payments[0],
  payments,
  entitlements,
  lineItems
};
