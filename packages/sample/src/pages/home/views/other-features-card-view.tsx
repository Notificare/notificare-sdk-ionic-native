import { IonCard, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { bagHandleOutline, bulbOutline, folderOutline, qrCodeOutline } from 'ionicons/icons';
import type { FC } from 'react';
import '../../../styles/index.css';
import { useHistory } from 'react-router';

export const OtherFeaturesCardView: FC = () => {
  const history = useHistory();

  function onScannablesClicked() {
    history.push('/scannables');
  }

  function onAssetsClicked() {
    history.push('/assets');
  }

  function onCustomEventClicked() {
    history.push('/events');
  }

  return (
    <div className="margin-top">
      <div className="section-title-row">
        <IonText>Other Features</IonText>
      </div>

      <IonCard className="ion-card-margin">
        <IonItem detail={true} lines="none" button onClick={onScannablesClicked}>
          <IonIcon icon={qrCodeOutline} size="small" />

          <IonLabel className="label-with-icon">Scannables</IonLabel>
        </IonItem>

        <div className="divider-horizontal-margin" />

        <IonItem detail={true} lines="none" button onClick={onAssetsClicked}>
          <IonIcon icon={folderOutline} size="small" />

          <IonLabel className="label-with-icon">Assets</IonLabel>
        </IonItem>

        <div className="divider-horizontal-margin" />

        <IonItem detail={true} lines="none" button onClick={onCustomEventClicked}>
          <IonIcon icon={bulbOutline} size="small" />

          <IonLabel className="label-with-icon">Custom Event</IonLabel>
        </IonItem>
      </IonCard>
    </div>
  );
};
