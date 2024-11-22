import type { NotificareAsset } from './models/notificare-asset';
import { NativePlugin } from './plugin';

export class NotificareAssets {
  /**
   * Fetches a list of {@link NotificareAsset} for a specified group.
   *
   * @param group The name of the group whose assets are to be fetched.
   * @returns A list of {@link NotificareAsset} belonging to the specified group.
   */
  public static async fetch(group: string): Promise<NotificareAsset[]> {
    const { result } = await NativePlugin.fetch({ group });
    return result;
  }
}
