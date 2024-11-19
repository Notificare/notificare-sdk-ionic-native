import { useAuth0 } from '@auth0/auth0-react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Notificare } from 'capacitor-notificare';
import { NotificarePush } from 'capacitor-notificare-push';
import { NotificarePushUI } from 'capacitor-notificare-push-ui';
import type { FC } from 'react';
import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { EventMonitor } from './components/event-monitor';
import { AlertDialogProvider } from './contexts/alert-dialog';
import { ToastProvider } from './contexts/toast';
import { HomeView } from './pages/home/home-view';
import { InboxView } from './pages/inbox/inbox-view';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact({
  innerHTMLTemplatesEnabled: true,
});

export const App: FC = () => {
  const { isLoading } = useAuth0();

  useEffect(function launch() {
    (async () => {
      await NotificarePush.setPresentationOptions(['banner', 'badge', 'sound']);
      await Notificare.launch();
    })();
  }, []);

  useEffect(function setupListeners() {
    const listeners = [
      NotificarePush.onNotificationOpened(async (notification) => {
        await NotificarePushUI.presentNotification(notification);
      }),

      NotificarePush.onNotificationActionOpened(async ({ notification, action }) => {
        await NotificarePushUI.presentAction(notification, action);
      }),
    ];

    return () => {
      Promise.all(listeners).then((subscriptions) => subscriptions.forEach((s) => s.remove()));
    };
  }, []);

  if (isLoading) {
    return null;
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

              <Route exact path="/inbox">
                <InboxView />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </ToastProvider>
      </AlertDialogProvider>
    </IonApp>
  );
};
