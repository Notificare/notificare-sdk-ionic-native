import { registerPlugin } from '@capacitor/core';

import type { NotificarePushPlugin } from './definitions';

const NotificarePush = registerPlugin<NotificarePushPlugin>('NotificarePushPlugin', {
  web: () => import('./web').then((m) => new m.NotificarePushPluginWeb()),
});

export * from './definitions';
export { NotificarePush };
