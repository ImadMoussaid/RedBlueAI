export type ScopeSection = {
  title: string;
  items: string[];
};

export type ScopeSnapshot = {
  allowedDomains: string[];
  blockedDomains: string[];
  allowlistPaths: string[];
  forbiddenActions: string[];
  testAccountNotes: string;
};

export type GuardrailSnapshot = {
  readOnlyMode: boolean;
  noDestructiveActions: boolean;
  rateLimitPerMinute: number;
  allowedHours: string;
  legalAccepted: boolean;
};
