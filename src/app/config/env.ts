import { SENTRY_DSN } from '@env';

export const env = {
  sentryDsn: typeof SENTRY_DSN === 'undefined' ? '' : SENTRY_DSN,
};
