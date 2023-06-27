import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import type { FC } from 'react';
import { useContext } from 'react';
import '../../styles/index.css';

import { mainContext } from '../../app';

import { CurrentDeviceCardView } from './views/current_device_card_view';
import { DnDNotificationsCardView } from './views/dnd_card_view';
import { GeoCardView } from './views/geo_card_view';
import { InAppMessagingCardView } from './views/iam_card_view';
import { LaunchFlowCardView } from './views/launch_flow_card_view';
import { OtherFeaturesCardView } from './views/other_features_card_view';
import { RemoteNotificationsCardView } from './views/remote_notifications_card_view';

export const HomeView: FC = () => {
  const isReady = useContext(mainContext).isReady;

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
          <LaunchFlowCardView />

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
