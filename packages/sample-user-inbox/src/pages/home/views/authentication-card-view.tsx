import { IonCard, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';
import type { FC } from 'react';
import '../../../styles/index.css';

import { useAlertDialogContext } from '../../../contexts/alert-dialog';

type AuthenticationCardViewProps = {
  isAuthenticated: boolean;
  isDeviceRegistered: boolean;
  startLoginFLow: () => void;
  startLogoutFlow: () => void;
};

export const AuthenticationCardView: FC<AuthenticationCardViewProps> = (props) => {
  const { isAuthenticated, isDeviceRegistered, startLoginFLow, startLogoutFlow } = props;
  const { setCurrentAlertDialog } = useAlertDialogContext();

  async function showAuthenticationFlowInfo() {
    const infoMessage = `isAuthenticated: ${isAuthenticated} <br> isDeviceRegistered: ${isDeviceRegistered}`;

    setCurrentAlertDialog({ title: 'Authentication Status', message: infoMessage });
  }

  return (
    <>
      <div className="section-title-row">
        <IonText className="section-title">Authentication Flow</IonText>

        <button className="info-button" onClick={showAuthenticationFlowInfo}>
          <IonIcon icon={informationCircleOutline} size="small" />
        </button>
      </div>

      <IonCard className="ion-card-margin">
        <div className="launch-flow-row">
          <IonItem
            className="sample-button"
            detail={false}
            lines="none"
            disabled={isAuthenticated}
            button
            onClick={startLoginFLow}
          >
            <IonLabel>Login</IonLabel>
          </IonItem>

          <div className="divider-vertical"></div>

          <IonItem
            className="sample-button"
            detail={false}
            lines="none"
            disabled={!isAuthenticated}
            button
            onClick={startLogoutFlow}
          >
            <IonLabel>Logout</IonLabel>
          </IonItem>
        </div>
      </IonCard>
    </>
  );
};
