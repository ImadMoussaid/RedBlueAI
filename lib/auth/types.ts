export type AuthJourneyStatus = 'complete' | 'current' | 'pending';

export type AuthHighlight = {
  title: string;
  detail: string;
};

export type AuthJourneyStep = {
  title: string;
  detail: string;
  status: AuthJourneyStatus;
};

export type AuthActionLink = {
  label: string;
  href: string;
};
