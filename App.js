import boot from './src/app/index';
import Sentry from 'sentry-expo';

const app = boot();

Sentry.enableInExpoDevelopment = true;
Sentry.config('https://expo.io/@kainisoft/dreamphoto?release-channel=stage', ).install();

export default app;
