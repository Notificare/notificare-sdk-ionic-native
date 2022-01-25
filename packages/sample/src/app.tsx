import { IonApp, IonRouterOutlet, setupIonicReact, useIonToast } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Notificare } from 'capacitor-notificare';
import type { FC } from 'react';
import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { Home } from './pages/home';

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

const TOAST_DURATION = 500;

export const App: FC = () => {
  const [toast] = useIonToast();

  useEffect(function launch() {
    (async () => {
      // await NotificarePush.setPresentationOptions(['banner', 'badge', 'sound']);
      await Notificare.launch();
    })();
  }, []);

  useEffect(function setupListeners() {
    const subscriptions = [
      //
      // Notificare events
      //
      Notificare.onReady(async (application) => {
        console.log('=== ON READY ===');
        console.log(JSON.stringify(application, null, 2));

        await toast(`Notificare is ready: ${application.name}`, TOAST_DURATION);

        // if (await NotificarePush.hasRemoteNotificationsEnabled()) {
        //   await NotificarePush.enableRemoteNotifications();
        // }
        //
        // if (await NotificareGeo.hasLocationServicesEnabled()) {
        //   await NotificareGeo.enableLocationUpdates();
        // }
      }),
      Notificare.onUnlaunched(async () => {
        console.log('=== ON UNLAUNCHED ===');

        await toast('Notificare has finished un-launching.', TOAST_DURATION);
      }),
      Notificare.onDeviceRegistered(async (device) => {
        console.log('=== DEVICE REGISTERED ===');
        console.log(JSON.stringify(device, null, 2));

        await toast(`Device registered: ${device.id}`, TOAST_DURATION);
      }),
      Notificare.onUrlOpened(async (url) => {
        console.log('=== URL OPENED ===');
        console.log(JSON.stringify(url, null, 2));

        await toast(`URL opened: ${url}`, TOAST_DURATION);
      }),
    ];

    return () => subscriptions.forEach((s) => s.remove());
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};
