import { registerPlugin } from '@capacitor/core';

import type { NotificareInboxPlugin } from './definitions';

const NotificareInbox = registerPlugin<NotificareInboxPlugin>('NotificareInboxPlugin', {
  web: () => import('./web').then((m) => new m.NotificareInboxPluginWeb()),
});

export * from './definitions';
export { NotificareInbox };
