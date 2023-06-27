import { IonCard, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { Notificare } from 'capacitor-notificare';
import { informationCircleOutline } from 'ionicons/icons';
import type { FC } from 'react';
import { useContext } from 'react';
import '../../../styles/index.css';

import { mainContext } from '../../../app';

export const LaunchFlowCardView: FC = () => {
  const isReady = useContext(mainContext).isReady;
  const setInfoAlert = useContext(mainContext).setInfoAlert;
  const addToastInfoMessage = useContext(mainContext).addToastInfoMessage;

  async function launchNotificare() {
    try {
      await Notificare.launch();
    } catch (e) {
      console.log('=== Error launching Notificare ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error launching Notificare.',
        type: 'error',
      });
    }
  }

  async function unlaunchNotificare() {
    try {
      await Notificare.unlaunch();
    } catch (e) {
      console.log('=== Error unlaunching Notificare ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error unlaunching Notificare.',
        type: 'error',
      });
    }
  }

  async function showLaunchFlowInfo() {
    try {
      const isConfiguredStatus = await Notificare.isConfigured();
      const isReadyStatus = await Notificare.isReady();
      const infoMessage = `isConfigured: ${isConfiguredStatus} <br> isReady: ${isReadyStatus}`;

      setInfoAlert({ title: 'Notificare Status', message: infoMessage });
    } catch (e) {
      console.log('=== Error getting isConfigured / isReady  ===');
      console.log(JSON.stringify(e));
    }
  }

  return (
    <>
      <div className="section-title-row">
        <IonText className="section-title">Launch Flow</IonText>

        <button className="info-button" onClick={showLaunchFlowInfo}>
          <IonIcon icon={informationCircleOutline} size="small" />
        </button>
      </div>

      <IonCard className="ion-card-margin">
        <div className="launch-flow-row">
          <IonItem
            className="sample-button"
            detail={false}
            lines="none"
            disabled={!isReady}
            button
            onClick={unlaunchNotificare}
          >
            <IonLabel>Unlaunch</IonLabel>
          </IonItem>

          <div className="divider-vertical"></div>

          <IonItem
            className="sample-button"
            detail={false}
            lines="none"
            disabled={isReady}
            button
            onClick={launchNotificare}
          >
            <IonLabel>Launch</IonLabel>
          </IonItem>
        </div>
      </IonCard>
    </>
  );
};
