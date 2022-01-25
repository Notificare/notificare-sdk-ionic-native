import { _Notificare } from './plugin';

export class NotificareEventsModule {
  public async logCustom(event: string, data?: Record<string, any>): Promise<void> {
    await _Notificare.events().logCustom({ event, data });
  }
}
