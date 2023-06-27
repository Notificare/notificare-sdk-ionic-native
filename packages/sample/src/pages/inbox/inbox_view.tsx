import {
  IonActionSheet,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import type { NotificareInboxItem } from 'capacitor-notificare-inbox';
import { NotificareInbox } from 'capacitor-notificare-inbox';
import { NotificarePushUI } from 'capacitor-notificare-push-ui';
import { mailOpenOutline, refresh, trashOutline } from 'ionicons/icons';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import '../../styles/index.css';

import { mainContext } from '../../app';
import { InboxItemView } from '../../components/inbox-item/inbox_item_view';

export const InboxView: FC = () => {
  let pressTimer: string | number | NodeJS.Timeout | undefined;

  const addToastInfoMessage = useContext(mainContext).addToastInfoMessage;
  const [items, setItems] = useState<NotificareInboxItem[]>([]);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<NotificareInboxItem | null>(null);
  const [isPressed, setIsPressed] = useState(false);

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
    try {
      const notification = await NotificareInbox.open(item);
      await NotificarePushUI.presentNotification(notification);

      console.log('=== Opened and presented inbox item successfully ===');

      addToastInfoMessage({
        message: 'Opened and presented inbox item successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error opening inbox item ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error opening inbox item.',
        type: 'error',
      });
    }
  }

  async function markAsRead(item: NotificareInboxItem) {
    try {
      await NotificareInbox.markAsRead(item);

      console.log('=== Marked as read successfully ===');

      addToastInfoMessage({
        message: 'Marked as read successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error mark as read ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error mark as read.',
        type: 'error',
      });
    }
  }

  async function remove(item: NotificareInboxItem) {
    try {
      await NotificareInbox.remove(item);

      console.log('=== Removed inbox item successfully ===');

      addToastInfoMessage({
        message: 'Removed inbox item successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error removing inbox item ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error removing inbox item',
        type: 'error',
      });
    }
  }

  async function refreshInbox() {
    try {
      await NotificareInbox.refresh();

      console.log('=== Refreshed inbox successfully ===');

      addToastInfoMessage({
        message: 'Refreshed inbox successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error refreshing inbox ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error refreshing inbox.',
        type: 'error',
      });
    }
  }

  async function markAllAsRead() {
    try {
      await NotificareInbox.markAllAsRead();

      console.log('=== Marked all as read successfully ===');

      addToastInfoMessage({
        message: 'Marked all as read successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error mark all as read ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error mark all as read.',
        type: 'error',
      });
    }
  }

  async function clear() {
    try {
      await NotificareInbox.clear();

      console.log('=== Cleared inbox successfully ===');

      addToastInfoMessage({
        message: 'Cleared inbox successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error clearing inbox ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error clearing inbox.',
        type: 'error',
      });
    }
  }

  function onTouchStart(item: NotificareInboxItem) {
    pressTimer = setTimeout(() => {
      setIsPressed(true);
      setSelectedItem(item);
      setIsActionSheetOpen(true);

      clearTimeout(pressTimer);
    }, 500); // Adjust the duration as needed
  }

  async function onTouchEnd(item: NotificareInboxItem) {
    clearTimeout(pressTimer);

    if (isPressed) {
      setIsPressed(false);
    } else {
      await open(item);
    }
  }

  async function onActionSheetOpen() {
    const item = selectedItem;

    if (item == null) return;

    await open(item);
    setSelectedItem(null);
  }

  async function onActionSheetMarkAsRead() {
    const item = selectedItem;

    if (item == null) return;

    await markAsRead(item);
    setSelectedItem(null);
  }

  async function onActionSheetRemove() {
    const item = selectedItem;

    if (item == null) return;

    await remove(item);
    setSelectedItem(null);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton onClick={refreshInbox}>
              <IonIcon slot="icon-only" icon={refresh}></IonIcon>
            </IonButton>

            <IonButton onClick={markAllAsRead}>
              <IonIcon slot="icon-only" icon={mailOpenOutline}></IonIcon>
            </IonButton>

            <IonButton onClick={clear}>
              <IonIcon slot="icon-only" icon={trashOutline}></IonIcon>
            </IonButton>
          </IonButtons>

          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {items.length === 0 && (
          <section className="no-data-container">
            <p>You have no messages</p>
          </section>
        )}

        {items.length > 0 && (
          <IonList>
            {items.map((item) => (
              <IonItem
                detail={false}
                lines="full"
                key={item.id}
                onTouchStart={() => onTouchStart(item)}
                onTouchEnd={() => onTouchEnd(item)}
              >
                <InboxItemView item={item} />
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>

      <IonActionSheet
        isOpen={isActionSheetOpen}
        buttons={[
          {
            text: 'Open',
            handler: onActionSheetOpen,
          },
          {
            text: 'Mark as Read',
            handler: onActionSheetMarkAsRead,
          },
          {
            text: 'Remove',
            role: 'destructive',
            handler: onActionSheetRemove,
          },
          {
            text: 'Cancel',
            role: 'cancel',
            data: {
              action: 'cancel',
            },
          },
        ]}
        onDidDismiss={() => setIsActionSheetOpen(false)}
      ></IonActionSheet>
    </IonPage>
  );
};
