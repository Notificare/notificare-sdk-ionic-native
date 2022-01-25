import type { NotificareDevice } from './models/notificare-device';
import type { NotificareDoNotDisturb } from './models/notificare-do-not-disturb';
import { _Notificare } from './plugin';

export class NotificareDeviceModule {
  public async getCurrentDevice(): Promise<NotificareDevice | null> {
    const { result } = await _Notificare.getCurrentDevice();
    return result;
  }

  public async getPreferredLanguage(): Promise<string | null> {
    const { result } = await _Notificare.getPreferredLanguage();
    return result;
  }

  public async updatePreferredLanguage(language: string | null): Promise<void> {
    await _Notificare.updatePreferredLanguage({ language });
  }

  public async register(userId: string | null, userName: string | null): Promise<void> {
    await _Notificare.register({ userId, userName });
  }

  public async fetchTags(): Promise<string[]> {
    const { result } = await _Notificare.fetchTags();
    return result;
  }

  public async addTag(tag: string): Promise<void> {
    await _Notificare.addTag({ tag });
  }

  public async addTags(tags: string[]): Promise<void> {
    await _Notificare.addTags({ tags });
  }

  public async removeTag(tag: string): Promise<void> {
    await _Notificare.removeTag({ tag });
  }

  public async removeTags(tags: string[]): Promise<void> {
    await _Notificare.removeTags({ tags });
  }

  public async clearTags(): Promise<void> {
    await _Notificare.clearTags();
  }

  public async fetchDoNotDisturb(): Promise<NotificareDoNotDisturb | null> {
    const { result } = await _Notificare.fetchDoNotDisturb();
    return result;
  }

  public async updateDoNotDisturb(dnd: NotificareDoNotDisturb): Promise<void> {
    await _Notificare.updateDoNotDisturb({ dnd });
  }

  public async clearDoNotDisturb(): Promise<void> {
    await _Notificare.clearDoNotDisturb();
  }

  public async fetchUserData(): Promise<Record<string, string>> {
    const { result } = await _Notificare.fetchUserData();
    return result;
  }

  public async updateUserData(userData: Record<string, string>): Promise<void> {
    await _Notificare.updateUserData({ userData });
  }
}
