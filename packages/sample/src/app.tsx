import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Notificare } from 'capacitor-notificare';
import { NotificarePush } from 'capacitor-notificare-push';
import { NotificarePushUI } from 'capacitor-notificare-push-ui';
import { NotificareScannables } from 'capacitor-notificare-scannables';
import type { FC } from 'react';
import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { EventMonitor } from './components/event-monitor';
import { AlertDialogProvider } from './contexts/alert-dialog';
import { ToastProvider } from './contexts/toast';
import { AssetsView } from './pages/assets/assets-view';
import { Beacons } from './pages/beacons/beacons-view';
import { DeviceView } from './pages/device/device-view';
import { CustomEventView } from './pages/events/custom-event-view';
import { HomeView } from './pages/home/home-view';
import { InboxView } from './pages/inbox/inbox-view';
import { ScannablesView } from './pages/scannables/scannables-view';
import { TagsView } from './pages/tags/tags-view';

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

export const App: FC = () => {
  useEffect(function launch() {
    (async () => {
      await NotificarePush.setPresentationOptions(['banner', 'badge', 'sound']);
      await Notificare.launch();
    })();
  }, []);

  useEffect(function setupListeners() {
    const listeners = [
      Notificare.onReady(async () => {
        await handleDeferredLink();
      }),

      NotificarePush.onNotificationOpened(async (notification) => {
        await NotificarePushUI.presentNotification(notification);
      }),

      NotificarePush.onNotificationActionOpened(async ({ notification, action }) => {
        await NotificarePushUI.presentAction(notification, action);
      }),

      NotificareScannables.onScannableDetected(async (scannable) => {
        if (scannable.notification != null) {
          await NotificarePushUI.presentNotification(scannable.notification);
        }
      }),
    ];

    return () => {
      Promise.all(listeners).then((subscriptions) => subscriptions.forEach((s) => s.remove()));
    };
  }, []);

  async function handleDeferredLink() {
    try {
      if (!(await Notificare.canEvaluateDeferredLink())) {
        return;
      }

      const evaluated = await Notificare.evaluateDeferredLink();
      console.log(`Did evaluate deferred link: ${evaluated}`);
    } catch (e) {
      console.log('=== Error evaluating deferred link ===');
      console.log(JSON.stringify(e));
    }
  }

  return (
    <IonApp>
      <AlertDialogProvider>
        <ToastProvider>
          <EventMonitor />
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

              <Route exact path="/events">
                <CustomEventView />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </ToastProvider>
      </AlertDialogProvider>
    </IonApp>
  );
};
