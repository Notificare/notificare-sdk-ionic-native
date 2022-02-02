import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import type { NotificareInboxItem } from 'capacitor-notificare-inbox';
import { NotificareInbox } from 'capacitor-notificare-inbox';
import { NotificarePushUI } from 'capacitor-notificare-push-ui';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { InboxItem } from '../../components/inbox-item';

import './index.css';

export const Inbox: FC = () => {
  const [items, setItems] = useState<NotificareInboxItem[]>([]);

  useEffect(function loadItems() {
    (async () => {
      const items = await NotificareInbox.getItems();
      setItems(items);
    })();
  }, []);

  useEffect(function setupListeners() {
    const subscriptions = [NotificareInbox.onInboxUpdated(setItems)];
    return () => subscriptions.forEach((s) => s.remove());
  }, []);

  async function open(item: NotificareInboxItem) {
    const notification = await NotificareInbox.open(item);
    await NotificarePushUI.presentNotification(notification);
  }

  // async function refresh() {
  //   await NotificareInbox.refresh();
  // }
  //
  // async function markAllAsRead() {
  //   await NotificareInbox.markAllAsRead();
  // }
  //
  // async function clear() {
  //   await NotificareInbox.clear();
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        {items.length === 0 && (
          <section className="empty-state-container">
            <p>You have no messages</p>
          </section>
        )}

        {items.length > 0 && (
          <IonList>
            {items.map((item) => (
              <IonItem key={item.id} onClick={() => open(item)}>
                <InboxItem item={item} />
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};
