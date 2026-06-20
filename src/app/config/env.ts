import {SENTRY_DSN} from '@env';

export const env = {
  sentryDsn: SENTRY_DSN ?? '',
};
