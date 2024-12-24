import type { NotificareDevice } from './models/notificare-device';
import type { NotificareDoNotDisturb } from './models/notificare-do-not-disturb';
import { _Notificare } from './plugin';

export class NotificareDeviceModule {
  /**
   * @returns The current {@link NotificareDevice} information.
   */
  public async getCurrentDevice(): Promise<NotificareDevice | null> {
    const { result } = await _Notificare.getCurrentDevice();
    return result;
  }

  /**
   * @returns The preferred language of the current device for notifications and
   * messages.
   */
  public async getPreferredLanguage(): Promise<string | null> {
    const { result } = await _Notificare.getPreferredLanguage();
    return result;
  }

  /**
   * Updates the preferred language setting for the device.
   *
   * @param language The preferred language code.
   */
  public async updatePreferredLanguage(language: string | null): Promise<void> {
    await _Notificare.updatePreferredLanguage({ language });
  }

  /**
   * Registers a user for the device.
   *
   * To register the device anonymously, set both `userId` and `userName` to `null`.
   *
   * @param userId Optional user identifier.
   * @param userName Optional username.
   *
   * @deprecated Use updateUser() instead.
   */
  public async register(userId: string | null, userName: string | null): Promise<void> {
    await _Notificare.register({ userId, userName });
  }

  /**
   * Updates the user information for the device.
   *
   * To register the device anonymously, set both `userId` and `userName` to `null`.
   *
   * @param userId Optional user identifier.
   * @param userName Optional username.
   */
  public async updateUser(userId: string | null, userName: string | null): Promise<void> {
    await _Notificare.updateUser({ userId, userName });
  }

  /**
   * Fetches the tags associated with the device.
   *
   * @return A list of tags currently associated with the device.
   */
  public async fetchTags(): Promise<string[]> {
    const { result } = await _Notificare.fetchTags();
    return result;
  }

  /**
   * Adds a single tag to the device.
   *
   * @param tag The tag to add.
   */
  public async addTag(tag: string): Promise<void> {
    await _Notificare.addTag({ tag });
  }

  /**
   * Adds multiple tags to the device.
   *
   * @param tags A list of tags to add.
   */
  public async addTags(tags: string[]): Promise<void> {
    await _Notificare.addTags({ tags });
  }

  /**
   * Removes a specific tag from the device.
   *
   * @param tag The tag to remove.
   */
  public async removeTag(tag: string): Promise<void> {
    await _Notificare.removeTag({ tag });
  }

  /**
   * Removes multiple tags from the device.
   *
   * @param tags A list of tags to remove.
   */
  public async removeTags(tags: string[]): Promise<void> {
    await _Notificare.removeTags({ tags });
  }

  /**
   * Clears all tags from the device.
   */
  public async clearTags(): Promise<void> {
    await _Notificare.clearTags();
  }

  /**
   * Fetches the "Do Not Disturb" (DND) settings for the device.
   *
   * @return The current {@link NotificareDoNotDisturb} settings, or `null` if
   * none are set.
   */
  public async fetchDoNotDisturb(): Promise<NotificareDoNotDisturb | null> {
    const { result } = await _Notificare.fetchDoNotDisturb();
    return result;
  }

  /**
   * Updates the "Do Not Disturb" (DND) settings for the device.
   *
   * @param dnd The new {@link NotificareDoNotDisturb} settings to apply.
   */
  public async updateDoNotDisturb(dnd: NotificareDoNotDisturb): Promise<void> {
    await _Notificare.updateDoNotDisturb({ dnd });
  }

  /**
   * Clears the "Do Not Disturb" (DND) settings for the device.
   */
  public async clearDoNotDisturb(): Promise<void> {
    await _Notificare.clearDoNotDisturb();
  }

  /**
   * Fetches the user data associated with the device.
   *
   * @return The current user data.
   */
  public async fetchUserData(): Promise<Record<string, string>> {
    const { result } = await _Notificare.fetchUserData();
    return result;
  }

  /**
   * Updates the custom user data associated with the device.
   *
   * @param userData The updated user data to associate with the device.
   */
  public async updateUserData(userData: Record<string, string>): Promise<void> {
    await _Notificare.updateUserData({ userData });
  }
}
