export type BillingCurrency = 'USD' | 'EUR';
export type BillingStatus = 'draft' | 'pending_payment' | 'paid' | 'failed' | 'refunded';

export interface RunBillingPlan {
  productName: string;
  title: string;
  priceCents: number;
  currency: BillingCurrency;
  cadence: 'per_run';
  description: string;
  includes: string[];
  notes: string[];
}

export interface BillingLineItem {
  label: string;
  description: string;
  amountCents: number;
  quantity: number;
}

export interface RunPaymentRecord {
  id: string;
  runId: string;
  target: string;
  status: BillingStatus;
  currency: BillingCurrency;
  amountCents: number;
  description: string;
  createdAt: string;
  paidAt?: string;
  entitlementState: 'locked' | 'ready_for_review' | 'queued' | 'consumed';
}

export interface BillingEntitlement {
  runId: string;
  target: string;
  approvalState: 'awaiting_payment' | 'ready_for_review' | 'queued' | 'consumed';
  paymentStatus: BillingStatus;
  operatorNote: string;
}

export interface BillingSummary {
  plan: RunBillingPlan;
  latestPayment: RunPaymentRecord;
  payments: RunPaymentRecord[];
  entitlements: BillingEntitlement[];
  lineItems: BillingLineItem[];
}
