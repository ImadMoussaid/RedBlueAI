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
  status: BillingStatus;
  currency: BillingCurrency;
  amountCents: number;
  description: string;
  createdAt: string;
  paidAt?: string;
}

export interface BillingSummary {
  plan: RunBillingPlan;
  latestPayment: RunPaymentRecord;
  lineItems: BillingLineItem[];
}
