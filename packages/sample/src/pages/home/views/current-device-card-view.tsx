import { IonCard, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { phonePortraitOutline } from 'ionicons/icons';
import type { FC } from 'react';
import { useHistory } from 'react-router';
import '../../../styles/index.css';

export const CurrentDeviceCardView: FC = () => {
  const history = useHistory();

  function onCurrentDeviceClicked() {
    history.push('/device');
  }
  return (
    <>
      <div className="section-title-row">
        <IonText className="section-title">Device</IonText>
      </div>

      <IonCard className="ion-card-margin">
        <IonItem detail={true} lines="none" button onClick={onCurrentDeviceClicked}>
          <IonIcon icon={phonePortraitOutline} size="small" />

          <IonLabel className="label-with-icon">Current Device</IonLabel>
        </IonItem>
      </IonCard>
    </>
  );
};
