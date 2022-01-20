import { registerPlugin } from '@capacitor/core';

import type { NotificareAuthenticationPlugin } from './definitions';

const NotificareAuthentication = registerPlugin<NotificareAuthenticationPlugin>('NotificareAuthenticationPlugin', {
  web: () => import('./web').then((m) => new m.NotificareAuthenticationPluginWeb()),
});

export * from './definitions';
export { NotificareAuthentication };
