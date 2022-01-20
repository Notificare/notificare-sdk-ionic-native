import { registerPlugin } from '@capacitor/core';

import type { NotificarePushUIPlugin } from './definitions';

const NotificarePushUI = registerPlugin<NotificarePushUIPlugin>('NotificarePushUIPlugin', {
  web: () => import('./web').then((m) => new m.NotificarePushUIPluginWeb()),
});

export * from './definitions';
export { NotificarePushUI };
