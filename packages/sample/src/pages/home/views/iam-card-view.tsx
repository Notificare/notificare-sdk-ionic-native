import { IonCard, IonIcon, IonItem, IonLabel, IonText, IonToggle } from '@ionic/react';
import { NotificareInAppMessaging } from 'capacitor-notificare-in-app-messaging';
import { chatboxEllipsesOutline, cloudOfflineOutline } from 'ionicons/icons';
import type { FC } from 'react';
import { useState } from 'react';
import '../../../styles/index.css';

import { useToastContext } from '../../../contexts/toast';

export const InAppMessagingCardView: FC = () => {
  const { addToastInfoMessage } = useToastContext();
  const [evaluateContext, setEvaluateContext] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  async function updateSuppressMessagesStatus(enabled: boolean) {
    setSuppressed(enabled);

    try {
      await NotificareInAppMessaging.setMessagesSuppressed(enabled, evaluateContext);
      console.log('=== IAM Suppress status updated successfully ===');

      addToastInfoMessage({
        message: 'IAM Suppress status updated successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error updating IAM suppress status ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error updating IAM suppress status.',
        type: 'error',
      });
    }
  }

  return (
    <div className="margin-top">
      <div className="section-title-row">
        <IonText>In App Messaging</IonText>
      </div>

      <IonCard className="ion-card-margin">
        <IonItem detail={false} lines="none">
          <IonIcon icon={chatboxEllipsesOutline} size="small" />

          <IonLabel className="label-with-icon">Evaluate Context</IonLabel>

          <IonToggle slot="end" checked={evaluateContext} onIonChange={(e) => setEvaluateContext(e.detail.checked)} />
        </IonItem>

        <div className="divider-horizontal-margin"></div>

        <IonItem detail={false} lines="none">
          <IonIcon icon={cloudOfflineOutline} size="small" />

          <IonLabel className="label-with-icon">Suppressed</IonLabel>

          <IonToggle
            slot="end"
            checked={suppressed}
            onIonChange={(e) => updateSuppressMessagesStatus(e.detail.checked)}
          />
        </IonItem>
      </IonCard>
    </div>
  );
};
