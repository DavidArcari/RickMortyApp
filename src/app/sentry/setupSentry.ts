import * as Sentry from '@sentry/react-native';
import {env} from '../config/env';

let initialized = false;

export const routingInstrumentation =
  Sentry.reactNavigationIntegration?.() ?? undefined;

export function setupSentry() {
  if (initialized || !env.sentryDsn) {
    return;
  }

  initialized = true;

  Sentry.init({
    dsn: env.sentryDsn,
    tracesSampleRate: 0.2,
    integrations: routingInstrumentation ? [routingInstrumentation] : [],
  });
}
