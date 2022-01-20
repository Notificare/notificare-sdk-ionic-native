import { registerPlugin } from '@capacitor/core';

import type { NotificarePlugin } from './definitions';

const Notificare = registerPlugin<NotificarePlugin>('NotificarePlugin', {
  web: () => import('./web').then((m) => new m.NotificarePluginWeb()),
});

export * from './definitions';
export { Notificare };
