import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import type { NotificareBeacon, NotificareRegion } from 'capacitor-notificare-geo';
import { NotificareGeo } from 'capacitor-notificare-geo';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { Beacon } from '../../components/beacon';

import './index.css';

export const Beacons: FC = () => {
  const [data, setData] = useState<{ region: NotificareRegion; beacons: NotificareBeacon[] }>();

  useEffect(function setupListeners() {
    const subscriptions = [NotificareGeo.onBeaconsRanged(setData)];
    return () => subscriptions.forEach((s) => s.remove());
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Beacons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Beacons</IonTitle>
          </IonToolbar>
        </IonHeader>

        {(data == null || data.beacons.length === 0) && (
          <section className="empty-state-container">
            <p>No beacons in range</p>
          </section>
        )}

        {data != null && data.beacons.length > 0 && (
          <IonList>
            {data.beacons.map((beacon) => (
              <IonItem key={beacon.id}>
                <Beacon beacon={beacon} />
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};
