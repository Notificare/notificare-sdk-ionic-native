import { registerPlugin } from '@capacitor/core';

import type { NotificareScannablesPlugin } from './definitions';

const NotificareScannables = registerPlugin<NotificareScannablesPlugin>('NotificareScannablesPlugin', {
  web: () => import('./web').then((m) => new m.NotificareScannablesPluginWeb()),
});

export * from './definitions';
export { NotificareScannables };
