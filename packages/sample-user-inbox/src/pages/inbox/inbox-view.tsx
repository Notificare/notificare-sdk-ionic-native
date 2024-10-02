import { useAuth0 } from '@auth0/auth0-react';
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
import { NotificarePush } from 'capacitor-notificare-push';
import { NotificarePushUI } from 'capacitor-notificare-push-ui';
import { NotificareUserInbox } from 'capacitor-notificare-user-inbox';
import type { NotificareUserInboxItem } from 'capacitor-notificare-user-inbox';
import { refresh } from 'ionicons/icons';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import '../../styles/index.css';

import { InboxItemView } from '../../components/inbox-item/inbox-item-view';
import { useToastContext } from '../../contexts/toast';
import { getUserInboxResponse } from '../../network/user-inbox-request';

export const InboxView: FC = () => {
  let pressTimer: string | number | NodeJS.Timeout | undefined;

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { addToastInfoMessage } = useToastContext();
  const [items, setItems] = useState<NotificareUserInboxItem[]>([]);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<NotificareUserInboxItem | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const refreshInbox = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        throw new Error('User is not authenticated.');
      }

      const accessToken = await getAccessTokenSilently();
      const requestResponseStr = await getUserInboxResponse(accessToken);
      const userInboxResponse = await NotificareUserInbox.parseResponseFromString(requestResponseStr);

      setItems(userInboxResponse.items);

      console.log('=== Inbox refreshed successfully ===');
      addToastInfoMessage({
        message: 'Inbox refreshed successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error refresh inbox ===');
      console.log(JSON.stringify((e as Error).message || e));

      addToastInfoMessage({
        message: 'Error refresh inbox.',
        type: 'error',
      });
    }
  }, [addToastInfoMessage]);

  useEffect(
    function loadInboxItems() {
      (async () => await refreshInbox())();
    },
    [refreshInbox]
  );

  useEffect(
    function setupListeners() {
      const listeners = [
        NotificarePush.onNotificationOpened(async (_) => {
          await refreshInbox();
        }),

        NotificarePush.onNotificationInfoReceived(async (_) => {
          await refreshInbox();
        }),
      ];

      return () => {
        Promise.all(listeners).then((subscriptions) => subscriptions.forEach((s) => s.remove()));
      };
    },
    [refreshInbox]
  );

  async function open(item: NotificareUserInboxItem) {
    try {
      const notification = await NotificareUserInbox.open(item);
      await NotificarePushUI.presentNotification(notification);

      console.log('=== Opened and presented inbox item successfully ===');
      addToastInfoMessage({
        message: 'Opened and presented inbox item successfully.',
        type: 'success',
      });

      if (!item.opened) {
        await refreshInbox();
      }
    } catch (e) {
      console.log('=== Error opening inbox item ===');
      console.log(JSON.stringify((e as Error).message || e));

      addToastInfoMessage({
        message: 'Error opening inbox item.',
        type: 'error',
      });
    }
  }

  async function markAsRead(item: NotificareUserInboxItem) {
    try {
      await NotificareUserInbox.markAsRead(item);

      console.log('=== Marked as read successfully ===');
      addToastInfoMessage({
        message: 'Marked as read successfully.',
        type: 'success',
      });

      if (!item.opened) {
        await refreshInbox();
      }
    } catch (e) {
      console.log('=== Error mark as read ===');
      console.log(JSON.stringify((e as Error).message || e));

      addToastInfoMessage({
        message: 'Error mark as read.',
        type: 'error',
      });
    }
  }

  async function remove(item: NotificareUserInboxItem) {
    try {
      await NotificareUserInbox.remove(item);

      console.log('=== Removed inbox item successfully ===');
      addToastInfoMessage({
        message: 'Removed inbox item successfully.',
        type: 'success',
      });

      await refreshInbox();
    } catch (e) {
      console.log('=== Error removing inbox item ===');
      console.log(JSON.stringify((e as Error).message || e));

      addToastInfoMessage({
        message: 'Error removing inbox item',
        type: 'error',
      });
    }
  }

  function onTouchStart(item: NotificareUserInboxItem) {
    pressTimer = setTimeout(() => {
      setIsPressed(true);
      setSelectedItem(item);
      setIsActionSheetOpen(true);

      clearTimeout(pressTimer);
    }, 500); // Adjust the duration as needed
  }

  async function onTouchEnd(item: NotificareUserInboxItem) {
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
