import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import type { NotificareBeacon, NotificareRegion } from 'capacitor-notificare-geo';
import { NotificareGeo } from 'capacitor-notificare-geo';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import '../../styles/index.css';

import { BeaconView } from '../../components/beacon/beacon-view';

export const Beacons: FC = () => {
  const [data, setData] = useState<{ region: NotificareRegion; beacons: NotificareBeacon[] }>();

  useEffect(function setupListeners() {
    const listeners = [NotificareGeo.onBeaconsRanged(setData)];

    return () => {
      Promise.all(listeners).then((subscriptions) => subscriptions.forEach((s) => s.remove()));
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonTitle>Beacons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {(data == null || data.beacons.length === 0) && (
          <section className="no-data-container">
            <p>No beacons in range</p>
          </section>
        )}

        {data != null && data.beacons.length > 0 && (
          <IonList>
            {data.beacons.map((beacon) => (
              <IonItem lines="full" key={beacon.id}>
                <BeaconView beacon={beacon} />
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};
