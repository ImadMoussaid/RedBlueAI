export type AppEnvironment = 'staging' | 'test' | 'production-safe';

export type AppTarget = {
  name: string;
  customerName: string;
  environment: AppEnvironment;
  baseUrl: string;
  loginUrl?: string;
  description: string;
  apiSpecSource?: string;
};

export type AppOnboardingSnapshot = {
  target: AppTarget;
  scope: {
    allowedDomains: string[];
    blockedDomains: string[];
    publicPaths: string[];
    authPaths: string[];
    apiBaseUrls: string[];
  };
  guardrails: {
    readOnlyMode: boolean;
    noDestructiveActions: boolean;
    rateLimitPerMinute: number;
    allowedHours: string;
    legalAccepted: boolean;
  };
};
