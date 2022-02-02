import type { NotificareAsset } from './models/notificare-asset';
import { NativePlugin } from './plugin';

export class NotificareAssets {
  public static async fetch(group: string): Promise<NotificareAsset[]> {
    const { result } = await NativePlugin.fetch({ group });
    return result;
  }
}
