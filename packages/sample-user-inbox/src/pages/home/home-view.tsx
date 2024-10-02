import { useAuth0 } from '@auth0/auth0-react';
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { Notificare } from 'capacitor-notificare';
import { NotificarePush } from 'capacitor-notificare-push';
import { NotificareUserInbox } from 'capacitor-notificare-user-inbox';
import React, { useEffect, useRef, useState } from 'react';
import '../../styles/index.css';
import type { FC } from 'react';

import { useToastContext } from '../../contexts/toast';
import {
  getUserInboxResponse,
  registerDeviceAsAnonymous,
  registerDeviceWithUser,
} from '../../network/user-inbox-request';

import { AuthenticationCardView } from './views/authentication-card-view';
import { DnDNotificationsCardView } from './views/dnd-card-view';
import { LaunchFlowCardView } from './views/launch-flow-card-view';
import { RemoteNotificationsCardView } from './views/remote-notifications-card-view';

export const HomeView: FC = () => {
  const domain = process.env.REACT_APP_USER_INBOX_CLIENT_DOMAIN;

  const { error, isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout, handleRedirectCallback } =
    useAuth0();

  const { addToastInfoMessage } = useToastContext();
  const [isReady, setIsReady] = useState(false);
  const [badge, setBadge] = useState(0);
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    // Auth0: Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    CapApp.addListener('appUrlOpen', async ({ url }) => {
      console.log('=== "appUrlOpen" event ===');

      if (url.includes('state') && (url.includes('code') || url.includes('error'))) {
        try {
          await handleRedirectCallback(url);
        } catch (e) {
          console.log('=== Failed to handleRedirectCallback ===');
          console.log(JSON.stringify((e as Error).message || e));

          addToastInfoMessage({
            message: 'Failed to handleRedirectCallback.',
            type: 'error',
          });
        }
      }

      await Browser.close();
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      // Ignore the first render
      isFirstRender.current = false;
      return;
    }

    if (isAuthenticated) {
      continueLoginFlow();
      return;
    }

    continueLogoutFlow();
  }, [isAuthenticated]);

  useEffect(function setupListeners() {
    const listeners = [
      Notificare.onReady(async (_) => {
        setIsReady(true);
      }),

      Notificare.onUnlaunched(() => {
        setIsReady(false);
      }),

      NotificarePush.onNotificationOpened(async (_) => {
        await refreshBadge();
      }),

      NotificarePush.onNotificationInfoReceived(async (_) => {
        await refreshBadge();
      }),
    ];

    return () => {
      Promise.all(listeners).then((subscriptions) => subscriptions.forEach((s) => s.remove()));
    };
  }, []);

  useIonViewWillEnter(() => {
    refreshBadge();
  });

  async function refreshBadge() {
    try {
      console.log(`=== Refresh badge start ===`);

      const accessToken = await getAccessTokenSilently();
      console.log(`=== Got access token===`);

      const requestResponseStr = await getUserInboxResponse(accessToken);
      const userInboxResponse = await NotificareUserInbox.parseResponseFromString(requestResponseStr);

      setBadge(userInboxResponse.unread);

      console.log('=== Badge refreshed successfully ===');
      addToastInfoMessage({
        message: 'Badge refreshed successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Failed to refresh badge===');
      console.log(JSON.stringify((e as Error).message || e));

      addToastInfoMessage({
        message: 'Failed to refresh badge.',
        type: 'error',
      });
    }
  }

  async function startLoginFlow() {
    console.log('=== Login flow start ===');

    await loginWithRedirect({
      async openUrl(url) {
        // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: '_self',
        });
      },
    });
  }

  async function continueLoginFlow() {
    console.log('=== Login flow continue ===');

    try {
      if (error) {
        throw error;
      }

      const accessToken = await getAccessTokenSilently();
      console.log('=== Get credentials success ===');

      await registerDeviceWithUser(accessToken);
      setIsDeviceRegistered(true);
      console.log('=== Register device success ===');

      await refreshBadge();

      console.log('=== Login flow success ===');
      addToastInfoMessage({
        message: 'Login flow success.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Login flow failed ===');
      console.log(JSON.stringify((e as Error).message || e));

      addToastInfoMessage({
        message: 'Login flow failed .',
        type: 'error',
      });
    }
  }

  async function startLogoutFlow() {
    try {
      console.log(`=== Start logout flow ===`);

      const accessToken = await getAccessTokenSilently();
      console.log('=== Got access token to register device as anonymous ===');

      await registerDeviceAsAnonymous(accessToken);
      setIsDeviceRegistered(false);
      console.log('=== Device registered as anonymous ===');

      await logout({
        logoutParams: {
          returnTo: `re.notifica.sample.user.inbox.app.dev://${domain!}/capacitor/re.notifica.sample.user.inbox.app.dev/callback`,
        },
        async openUrl(url) {
          // Redirect using Capacitor's Browser plugin
          await Browser.open({
            url,
            windowName: '_self',
          });
        },
      });
    } catch (e) {
      console.log('=== Failed to logout ===');
      console.log(JSON.stringify((e as Error).message || e));

      addToastInfoMessage({
        message: 'Failed to logout.',
        type: 'error',
      });
    }
  }

  async function continueLogoutFlow() {
    console.log('=== Logout flow continue ===');

    try {
      if (error) {
        throw error;
      }

      setBadge(0);

      console.log('=== Logout flow success ===');
      addToastInfoMessage({
        message: 'Logout success.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Logout flow failed ===');
      console.log(JSON.stringify((e as Error).message || e));

      addToastInfoMessage({
        message: 'Logout flow failed .',
        type: 'error',
      });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sample</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sample</IonTitle>
          </IonToolbar>
        </IonHeader>

        <section className="main-container">
          <LaunchFlowCardView isReady={isReady} />

          {isReady && (
            <>
              <AuthenticationCardView
                isAuthenticated={isAuthenticated}
                isDeviceRegistered={isDeviceRegistered}
                startLoginFLow={startLoginFlow}
                startLogoutFlow={startLogoutFlow}
              />

              <RemoteNotificationsCardView badge={badge} isAuthenticated={isAuthenticated} />

              <DnDNotificationsCardView />
            </>
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};
