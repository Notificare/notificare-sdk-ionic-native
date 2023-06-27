import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { NotificareScannables } from 'capacitor-notificare-scannables';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import '../../styles/index.css';

import { mainContext } from '../../app';

export const ScannablesView: FC = () => {
  const addToastInfoMessage = useContext(mainContext).addToastInfoMessage;
  const [isNfcAvailable, setIsNfcAvailable] = useState(false);

  useEffect(function loadInitialData() {
    (async () => {
      try {
        const canStartNfc = await NotificareScannables.canStartNfcScannableSession();
        setIsNfcAvailable(canStartNfc);
      } catch (e) {
        console.log('=== Error checking NFC availability ===');
        console.log(JSON.stringify(e));
      }
    })();
  }, []);

  async function startQrCodeScannableSession() {
    try {
      await NotificareScannables.startQrCodeScannableSession();
    } catch (e) {
      console.log('=== Error starting QR Code scannable session ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error starting QR Code scannable session.',
        type: 'error',
      });
    }
  }

  async function startNfcScannableSession() {
    try {
      await NotificareScannables.startNfcScannableSession();
    } catch (e) {
      console.log('=== Error starting NFC scannable session ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error starting NFC scannable session.',
        type: 'error',
      });
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonTitle>Scannables</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <section className="main-container">
          <IonCard className="margin-top">
            <IonItem className="sample-button" detail={false} lines="full" button onClick={startQrCodeScannableSession}>
              <IonLabel>QR Code Scannable Session</IonLabel>
            </IonItem>

            <IonItem
              disabled={!isNfcAvailable}
              className="sample-button"
              detail={false}
              lines="none"
              button
              onClick={startNfcScannableSession}
            >
              <IonLabel>NFC Scannable Session</IonLabel>
            </IonItem>
          </IonCard>
        </section>
      </IonContent>
    </IonPage>
  );
};
