export type ConsentVersion = {
  version: string;
  title: string;
  effectiveDate: string;
  body: string;
};

export type ConsentSigner = {
  fullName: string;
  role: string;
  organization: string;
  email: string;
  signedAt: string;
  signedBy: string;
};

export type ConsentAffirmation = {
  id: string;
  label: string;
  detail: string;
  checked: boolean;
};

export type ConsentAuditEvent = {
  id: string;
  action: string;
  actor: string;
  runId: string;
  timestamp: string;
  note: string;
};

export type ConsentSnapshot = {
  consentId: string;
  currentVersion: ConsentVersion;
  signer: ConsentSigner;
  affirmations: ConsentAffirmation[];
  acceptedAt: string;
  linkedRuns: string[];
  auditTrail: ConsentAuditEvent[];
};
