import { IonAlert, IonApp, IonRouterOutlet, IonToast, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Notificare } from 'capacitor-notificare';
import { NotificareGeo } from 'capacitor-notificare-geo';
import { NotificareInAppMessaging } from 'capacitor-notificare-in-app-messaging';
import { NotificareInbox } from 'capacitor-notificare-inbox';
import { NotificareMonetize } from 'capacitor-notificare-monetize';
import { NotificarePush } from 'capacitor-notificare-push';
import { NotificarePushUI } from 'capacitor-notificare-push-ui';
import { NotificareScannables } from 'capacitor-notificare-scannables';
import type { FC } from 'react';
import { createContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AssetsView } from './pages/assets/assets_view';
import { Beacons } from './pages/beacons/beacons_view';
import { DeviceView } from './pages/device/device_view';
import { CustomEventView } from './pages/events/custom_event_view';
import { HomeView } from './pages/home/home_view';
import { InboxView } from './pages/inbox/inbox_view';
import { MonetizeView } from './pages/monetize/monetize_view';
import { MonetizeProductsView } from './pages/monetize/views/monetize_products_view';
import { MonetizePurchasesView } from './pages/monetize/views/monetize_purchases_view';
import { ScannablesView } from './pages/scannables/scannables_view';
import { TagsView } from './pages/tags/tags_view';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

export const mainContext = createContext({
  isReady: false,
  notificationsSettingsGranted: false,
  badge: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  setInfoAlert: (_info: InformationalAlert) => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  addToastInfoMessage: (_info: ToastInfo) => {},
});

export const App: FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [notificationsSettingsGranted, setNotificationsSettingsGranted] = useState(false);
  const [badge, setBadge] = useState(0);
  const [infoAlert, setInfoAlert] = useState<InformationalAlert | null>(null);
  const [toastInfo, setToastInfo] = useState<ToastInfo>({
    type: 'idle',
  });
  const [toastInfoMessages, setToastInfoMessages] = useState<ToastInfo[]>([]);

  useEffect(function launch() {
    (async () => {
      await NotificarePush.setPresentationOptions(['banner', 'badge', 'sound']);
      await Notificare.launch();
    })();
  }, []);

  useEffect(function setupListeners() {
    const subscriptions = [
      // region Notificare events

      Notificare.onReady(async (application) => {
        setIsReady(true);
        setBadge(await NotificareInbox.getBadge());

        console.log('=== ON READY ===');
        console.log(JSON.stringify(application, null, 2));

        addToastInfoMessage({ type: 'idle', message: `Notificare is ready: ${application.name}` });

        if (await NotificarePush.hasRemoteNotificationsEnabled()) {
          await NotificarePush.enableRemoteNotifications();
        }

        if (await NotificareGeo.hasLocationServicesEnabled()) {
          await NotificareGeo.enableLocationUpdates();
        }
      }),
      Notificare.onUnlaunched(async () => {
        setIsReady(false);
        console.log('=== ON UNLAUNCHED ===');

        addToastInfoMessage({ type: 'idle', message: 'Notificare has finished un-launching.' });
      }),
      Notificare.onDeviceRegistered(async (device) => {
        console.log('=== DEVICE REGISTERED ===');
        console.log(JSON.stringify(device, null, 2));

        addToastInfoMessage({ type: 'idle', message: `Device registered: ${device.id}` });
      }),
      Notificare.onUrlOpened(async (url) => {
        console.log('=== URL OPENED ===');
        console.log(JSON.stringify(url, null, 2));

        addToastInfoMessage({ type: 'idle', message: `URL opened: ${url}` });
      }),

      // endregion

      // region Notificare Push events

      NotificarePush.onNotificationReceived((notification) => {
        console.log('=== NOTIFICATION RECEIVED ===');
        console.log(JSON.stringify(notification, null, 2));
      }),
      NotificarePush.onSystemNotificationReceived((notification) => {
        console.log('=== SYSTEM NOTIFICATION RECEIVED ===');
        console.log(JSON.stringify(notification, null, 2));
      }),
      NotificarePush.onUnknownNotificationReceived((notification) => {
        console.log('=== UNKNOWN NOTIFICATION RECEIVED ===');
        console.log(JSON.stringify(notification, null, 2));
      }),
      NotificarePush.onNotificationOpened(async (notification) => {
        console.log('=== NOTIFICATION OPENED ===');
        console.log(JSON.stringify(notification, null, 2));

        await NotificarePushUI.presentNotification(notification);
      }),
      NotificarePush.onNotificationActionOpened(async ({ notification, action }) => {
        console.log('=== NOTIFICATION ACTION OPENED ===');
        console.log(JSON.stringify({ notification, action }, null, 2));

        await NotificarePushUI.presentAction(notification, action);
      }),
      NotificarePush.onUnknownNotificationOpened((notification) => {
        console.log('=== UNKNOWN NOTIFICATION OPENED ===');
        console.log(JSON.stringify(notification, null, 2));
      }),
      NotificarePush.onUnknownNotificationActionOpened(({ notification, action, responseText }) => {
        console.log('=== UNKNOWN NOTIFICATION ACTION OPENED ===');
        console.log(JSON.stringify({ notification, action, responseText }, null, 2));
      }),
      NotificarePush.onNotificationSettingsChanged((granted) => {
        setNotificationsSettingsGranted(granted);

        console.log('=== NOTIFICATION SETTINGS CHANGED ===');
        console.log(JSON.stringify(granted, null, 2));
      }),
      NotificarePush.onShouldOpenNotificationSettings((notification) => {
        console.log('=== SHOULD OPEN NOTIFICATION SETTINGS ===');
        console.log(JSON.stringify(notification, null, 2));
      }),
      NotificarePush.onFailedToRegisterForRemoteNotifications((error) => {
        console.log('=== FAILED TO REGISTER FOR REMOTE NOTIFICATIONS ===');
        console.log(JSON.stringify(error, null, 2));
      }),

      // endregion

      // region Notificare Push UI events

      NotificarePushUI.onNotificationWillPresent((notification) => {
        console.log('=== NOTIFICATION WILL PRESENT ===');
        console.log(JSON.stringify(notification, null, 2));
      }),
      NotificarePushUI.onNotificationPresented((notification) => {
        console.log('=== NOTIFICATION PRESENTED ===');
        console.log(JSON.stringify(notification, null, 2));
      }),
      NotificarePushUI.onNotificationFinishedPresenting((notification) => {
        console.log('=== NOTIFICATION FINISHED PRESENTING ===');
        console.log(JSON.stringify(notification, null, 2));
      }),
      NotificarePushUI.onNotificationFailedToPresent((notification) => {
        console.log('=== NOTIFICATION FAILED TO PRESENT ===');
        console.log(JSON.stringify(notification, null, 2));
      }),
      NotificarePushUI.onNotificationUrlClicked(({ notification, url }) => {
        console.log('=== NOTIFICATION URL CLICKED ===');
        console.log(JSON.stringify({ notification, url }, null, 2));
      }),
      NotificarePushUI.onActionWillExecute(({ notification, action }) => {
        console.log('=== ACTION WILL EXECUTE ===');
        console.log(JSON.stringify({ notification, action }, null, 2));
      }),
      NotificarePushUI.onActionExecuted(({ notification, action }) => {
        console.log('=== ACTION EXECUTED ===');
        console.log(JSON.stringify({ notification, action }, null, 2));
      }),
      NotificarePushUI.onActionNotExecuted(({ notification, action }) => {
        console.log('=== ACTION NOT EXECUTED ===');
        console.log(JSON.stringify({ notification, action }, null, 2));
      }),
      NotificarePushUI.onActionFailedToExecute(({ notification, action, error }) => {
        console.log('=== ACTION FAILED TO EXECUTE ===');
        console.log(JSON.stringify({ notification, action, error }, null, 2));
      }),
      NotificarePushUI.onCustomActionReceived(({ notification, action, url }) => {
        console.log('=== CUSTOM ACTION RECEIVED ===');
        console.log(JSON.stringify({ notification, action, url }, null, 2));
      }),

      // endregion

      // region Notificare Inbox events

      NotificareInbox.onInboxUpdated((items) => {
        console.log('=== INBOX UPDATED ===');
        console.log(JSON.stringify(items, null, 2));
      }),
      NotificareInbox.onBadgeUpdated((badge) => {
        setBadge(badge);

        console.log('=== BADGE UPDATED ===');
        console.log(JSON.stringify(badge, null, 2));
      }),

      // endregion

      // region Notificare Geo events

      NotificareGeo.onLocationUpdated((location) => {
        console.log('=== LOCATION UPDATED ===');
        console.log(JSON.stringify(location, null, 2));
      }),
      NotificareGeo.onRegionEntered((region) => {
        console.log('=== REGION ENTERED ===');
        console.log(JSON.stringify(region, null, 2));
      }),
      NotificareGeo.onRegionExited((region) => {
        console.log('=== REGION EXITED ===');
        console.log(JSON.stringify(region, null, 2));
      }),
      NotificareGeo.onBeaconEntered((beacon) => {
        console.log('=== BEACON ENTERED ===');
        console.log(JSON.stringify(beacon, null, 2));
      }),
      NotificareGeo.onBeaconEntered((beacon) => {
        console.log('=== BEACON EXITED ===');
        console.log(JSON.stringify(beacon, null, 2));
      }),
      NotificareGeo.onBeaconsRanged(({ region, beacons }) => {
        console.log('=== BEACONS RANGED ===');
        console.log(JSON.stringify({ region, beacons }, null, 2));
      }),
      NotificareGeo.onHeadingUpdated((heading) => {
        console.log('=== HEADING UPDATED ===');
        console.log(JSON.stringify(heading, null, 2));
      }),
      NotificareGeo.onVisit((visit) => {
        console.log('=== VISIT ===');
        console.log(JSON.stringify(visit, null, 2));
      }),

      // endregion

      // region Notificare Scannables

      NotificareScannables.onScannableDetected(async (scannable) => {
        console.log('=== SCANNABLE DETECTED ===');
        console.log(JSON.stringify(scannable, null, 2));

        if (scannable.notification != null) {
          await NotificarePushUI.presentNotification(scannable.notification);
        }
      }),
      NotificareScannables.onScannableSessionFailed((error) => {
        console.log('=== SCANNABLE SESSION FAILED ===');
        console.log(JSON.stringify(error, null, 2));
      }),

      // endregion

      // region Notificare Monetize

      NotificareMonetize.onBillingSetupFinished(() => {
        console.log('=== BILLING SETUP FINISHED ===');
      }),
      NotificareMonetize.onBillingSetupFailed(({ code, message }) => {
        console.log('=== BILLING SETUP FAILED ===');
        console.log(JSON.stringify({ code, message }, null, 2));
      }),
      NotificareMonetize.onProductsUpdated((products) => {
        console.log('=== PRODUCTS UPDATED ===');
        console.log(JSON.stringify(products, null, 2));
      }),
      NotificareMonetize.onPurchasesUpdated((purchases) => {
        console.log('=== PURCHASES UPDATED ===');
        console.log(JSON.stringify(purchases, null, 2));
      }),
      NotificareMonetize.onPurchaseFinished((purchase) => {
        console.log('=== PURCHASE FINISHED ===');
        console.log(JSON.stringify(purchase, null, 2));
      }),
      NotificareMonetize.onPurchaseRestored((purchase) => {
        console.log('=== PURCHASE RESTORED ===');
        console.log(JSON.stringify(purchase, null, 2));
      }),
      NotificareMonetize.onPurchaseCanceled(() => {
        console.log('=== PURCHASE CANCELED ===');
      }),
      NotificareMonetize.onPurchaseFailed(({ code, message, errorMessage }) => {
        console.log('=== PURCHASE FAILED ===');
        console.log(JSON.stringify({ code, message, errorMessage }, null, 2));
      }),

      // endregion

      // region Notificare In-App Messaging

      NotificareInAppMessaging.onMessagePresented((message) => {
        console.log('=== MESSAGE PRESENTED ===');
        console.log(JSON.stringify(message, null, 2));
      }),
      NotificareInAppMessaging.onMessageFinishedPresenting((message) => {
        console.log('=== MESSAGE FINISHED PRESENTING ===');
        console.log(JSON.stringify(message, null, 2));
      }),
      NotificareInAppMessaging.onMessageFailedToPresent((message) => {
        console.log('=== MESSAGE FAILED TO PRESENT ===');
        console.log(JSON.stringify(message, null, 2));
      }),
      NotificareInAppMessaging.onActionExecuted(({ message, action }) => {
        console.log('=== ACTION EXECUTED ===');
        console.log(JSON.stringify({ message, action }, null, 2));
      }),
      NotificareInAppMessaging.onActionFailedToExecute(({ message, action, error }) => {
        console.log('=== ACTION FAILED TO EXECUTE ===');
        console.log(JSON.stringify({ message, action, error }, null, 2));
      }),

      // endregion
    ];

    return () => subscriptions.forEach((s) => s.remove());
  }, []);

  useEffect(
    function processActionStatusMessages() {
      if (toastInfoMessages.length > 0 && toastInfo.message === undefined) {
        setToastInfo(toastInfoMessages[0]);
      }
    },
    [toastInfoMessages]
  );

  function addToastInfoMessage(info: ToastInfo) {
    if (toastInfoMessages.length > 0) {
      toastInfoMessages.push(info);

      return;
    }

    setToastInfoMessages((prevState) => [...prevState, info]);
  }

  function removeToastInfoMessages() {
    setToastInfoMessages((prevState) => prevState.slice(1));
  }

  function resetToast() {
    setToastInfo({ type: 'idle' });

    setTimeout(() => {
      removeToastInfoMessages();
    }, 500);
  }

  return (
    <IonApp>
      <mainContext.Provider
        value={{
          isReady,
          notificationsSettingsGranted,
          badge,
          setInfoAlert,
          addToastInfoMessage,
        }}
      >
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>

            <Route exact path="/home">
              <HomeView />
            </Route>

            <Route exact path="/device">
              <DeviceView />
            </Route>

            <Route exact path="/inbox">
              <InboxView />
            </Route>

            <Route exact path="/tags">
              <TagsView />
            </Route>

            <Route exact path="/beacons">
              <Beacons />
            </Route>

            <Route exact path="/scannables">
              <ScannablesView />
            </Route>

            <Route exact path="/assets">
              <AssetsView />
            </Route>

            <Route exact path="/monetize">
              <MonetizeView />
            </Route>

            <Route exact path="/monetize/products">
              <MonetizeProductsView />
            </Route>

            <Route exact path="/monetize/purchases">
              <MonetizePurchasesView />
            </Route>

            <Route exact path="/events">
              <CustomEventView />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </mainContext.Provider>

      <IonAlert
        isOpen={infoAlert !== null}
        header={infoAlert?.title ?? ''}
        message={infoAlert?.message ?? ''}
        buttons={['OK']}
        onDidDismiss={() => setInfoAlert(null)}
      ></IonAlert>

      <IonToast
        isOpen={toastInfo.message !== undefined}
        message={toastInfo.message}
        onDidDismiss={resetToast}
        duration={2000}
        color={toastInfo.type === 'error' ? 'danger' : toastInfo.type === 'success' ? 'success' : 'dark'}
      ></IonToast>
    </IonApp>
  );
};

interface InformationalAlert {
  title: string;
  message: string;
}

interface ToastInfo {
  message?: string;
  type: 'idle' | 'success' | 'error';
}
