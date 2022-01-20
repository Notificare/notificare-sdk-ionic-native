import { registerPlugin } from '@capacitor/core';

import { NotificarePlugin } from './definitions';

const NotificarePlugin = registerPlugin<NotificarePlugin>('NotificarePlugin', {
  web: () => import('./web').then((m) => new m.NotificarePluginWeb()),
});

export * from './definitions';
export { NotificarePlugin };
