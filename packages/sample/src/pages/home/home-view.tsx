import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Notificare } from 'capacitor-notificare';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import '../../styles/index.css';

import { CurrentDeviceCardView } from './views/current-device-card-view';
import { DnDNotificationsCardView } from './views/dnd-card-view';
import { GeoCardView } from './views/geo-card-view';
import { InAppMessagingCardView } from './views/iam-card-view';
import { LaunchFlowCardView } from './views/launch-flow-card-view';
import { OtherFeaturesCardView } from './views/other-features-card-view';
import { RemoteNotificationsCardView } from './views/remote-notifications-card-view';

export const HomeView: FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(function setupNotificareStatusListeners() {
    const subscriptions = [
      Notificare.onReady(() => setIsReady(true)),

      Notificare.onUnlaunched(() => setIsReady(false)),
    ];

    return () => subscriptions.forEach((s) => s.remove());
  }, []);

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
              <CurrentDeviceCardView />

              <RemoteNotificationsCardView />

              <DnDNotificationsCardView />

              <GeoCardView />

              <InAppMessagingCardView />

              <OtherFeaturesCardView />
            </>
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};
