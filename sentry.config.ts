import * as Sentry from '@sentry/react-router';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  release: process.env.VERCEL_GITHUB_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
  environment: process.env.VERCEL_ENV || 'development',
  tracesSampleRate: 1.0,
  integrations: [],
});
