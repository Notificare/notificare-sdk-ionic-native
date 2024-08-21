import { IonBadge, IonCard, IonIcon, IonItem, IonLabel, IonText, IonToggle } from '@ionic/react';
import { NotificareInbox } from 'capacitor-notificare-inbox';
import { NotificarePush, PushPermissionStatus } from 'capacitor-notificare-push';
import { fileTrayOutline, informationCircleOutline, notificationsOutline, pricetagOutline } from 'ionicons/icons';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import '../../../styles/index.css';
import { useHistory } from 'react-router';

import { useAlertDialogContext } from '../../../contexts/alert-dialog';
import { useToastContext } from '../../../contexts/toast';

export const RemoteNotificationsCardView: FC = () => {
  const { setCurrentAlertDialog } = useAlertDialogContext();
  const { addToastInfoMessage } = useToastContext();
  const [badge, setBadge] = useState(0);
  const [hasNotificationsEnabled, setHasNotificationsEnabled] = useState(false);
  const [statusLoaded, setStatusLoaded] = useState(false);
  const history = useHistory();

  const checkNotificationsStatus = useCallback(async () => {
    try {
      const enabled = (await NotificarePush.hasRemoteNotificationsEnabled()) && (await NotificarePush.allowedUI());

      setHasNotificationsEnabled(enabled);
    } catch (e) {
      console.log('=== Error checking remote notifications status ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error checking remote notifications status.',
        type: 'error',
      });
    }
  }, [addToastInfoMessage]);

  useEffect(
    function setupListeners() {
      const subscriptions = [
        NotificareInbox.onBadgeUpdated(setBadge),

        NotificarePush.onNotificationSettingsChanged(async () => await checkNotificationsStatus()),
      ];

      return () => subscriptions.forEach((s) => s.remove());
    },
    [checkNotificationsStatus]
  );

  useEffect(
    function checkInitialStatus() {
      (async () => {
        await checkNotificationsStatus();

        setStatusLoaded(true);
      })();
    },
    [checkNotificationsStatus]
  );

  useEffect(
    function getBadge() {
      (async () => {
        try {
          const result = await NotificareInbox.getBadge();

          setBadge(result);
        } catch (e) {
          console.log('=== Error getting badge ===');
          console.log(JSON.stringify(e));

          addToastInfoMessage({
            message: 'Error getting badge.',
            type: 'error',
          });
        }
      })();
    },
    [addToastInfoMessage]
  );

  async function updateNotificationsStatus(enabled: boolean) {
    if (!statusLoaded) return;

    setHasNotificationsEnabled(enabled);

    if (!enabled) {
      try {
        console.log('=== Disabling remote notifications ===');
        await NotificarePush.disableRemoteNotifications();

        console.log('=== Disabling remote notifications finished ===');
        addToastInfoMessage({
          message: 'Disabled remote notifications successfully.',
          type: 'success',
        });
      } catch (e) {
        console.log('=== Error disabling remote notifications ===');
        console.log(JSON.stringify(e));

        addToastInfoMessage({
          message: 'Error disabling remote notifications.',
          type: 'error',
        });
      }

      return;
    }

    try {
      if (await ensureNotificationsPermission()) {
        console.log('=== Enabling remote notifications ===');
        await NotificarePush.enableRemoteNotifications();

        console.log('=== Enabling remote notifications finished ===');
        addToastInfoMessage({
          message: 'Enabled remote notifications successfully.',
          type: 'success',
        });

        return;
      }
    } catch (e) {
      console.log('=== Error enabling remote notifications ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error enabling remote notifications.',
        type: 'error',
      });
    }

    setHasNotificationsEnabled(false);
  }

  async function ensureNotificationsPermission(): Promise<boolean> {
    let status = await NotificarePush.checkPermissionStatus();
    if (status === PushPermissionStatus.GRANTED) return true;

    status = await NotificarePush.requestPermission();

    if (status == PushPermissionStatus.PERMANENTLY_DENIED) {
      // TODO: Show some informational UI, educating the user to change the permission via the Settings app.
      await NotificarePush.openAppSettings();
      return false;
    }

    return status === PushPermissionStatus.GRANTED;
  }

  async function showNotificationsStatusInfo() {
    try {
      const allowedUi = await NotificarePush.allowedUI();
      const hasRemoteNotificationsEnabled = await NotificarePush.hasRemoteNotificationsEnabled();
      const transport = await NotificarePush.getTransport();
      const subscription = await NotificarePush.getSubscription();
      const infoMessage = `allowedUi: ${allowedUi} <br> enabled: ${hasRemoteNotificationsEnabled} <br> transport: ${transport} <br> token: ${subscription?.token}`;

      setCurrentAlertDialog({ title: 'Notifications Status', message: infoMessage });
    } catch (e) {
      console.log('=== Error getting allowedUi / hasRemoteNotificationsEnabled / transport / subscriptionId ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error getting allowedUi / hasRemoteNotificationsEnabled / transport / subscriptionId.',
        type: 'error',
      });
    }
  }

  function onInboxClicked() {
    history.push('/inbox');
  }

  function onTagsClicked() {
    history.push('/tags');
  }

  return (
    <div className="margin-top">
      <div className="section-title-row">
        <IonText className="section-title">Notifications</IonText>

        <button className="info-button" onClick={showNotificationsStatusInfo}>
          <IonIcon icon={informationCircleOutline} size="small" />
        </button>
      </div>

      <IonCard className="ion-card-margin">
        <IonItem detail={false} lines="none">
          <IonIcon icon={notificationsOutline} size="small" />

          <IonLabel className="label-with-icon">Notifications</IonLabel>

          <IonToggle
            slot="end"
            checked={hasNotificationsEnabled}
            onIonChange={(e) => updateNotificationsStatus(e.detail.checked)}
          />
        </IonItem>

        <div className="divider-horizontal-margin" />

        <IonItem detail={true} lines="none" button onClick={onInboxClicked}>
          <IonIcon icon={fileTrayOutline} size="small" />

          <IonLabel className="label-with-icon">Inbox</IonLabel>

          {badge > 0 && (
            <IonBadge className="badge" slot="end">
              {badge}
            </IonBadge>
          )}
        </IonItem>

        <div className="divider-horizontal-margin" />

        <IonItem detail={true} lines="none" button onClick={onTagsClicked}>
          <IonIcon icon={pricetagOutline} size="small" />

          <IonLabel className="label-with-icon">Tags</IonLabel>
        </IonItem>
      </IonCard>
    </div>
  );
};
