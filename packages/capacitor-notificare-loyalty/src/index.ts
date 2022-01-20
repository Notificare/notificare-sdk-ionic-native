import { registerPlugin } from '@capacitor/core';

import type { NotificareLoyaltyPlugin } from './definitions';

const NotificareLoyalty = registerPlugin<NotificareLoyaltyPlugin>('NotificareLoyaltyPlugin', {
  web: () => import('./web').then((m) => new m.NotificareLoyaltyPluginWeb()),
});

export * from './definitions';
export { NotificareLoyalty };
