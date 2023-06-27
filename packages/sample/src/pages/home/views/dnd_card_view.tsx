import { IonCard, IonIcon, IonItem, IonLabel, IonToggle } from '@ionic/react';
import { Notificare } from 'capacitor-notificare';
import { banOutline } from 'ionicons/icons';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import '../../../styles/index.css';

import { mainContext } from '../../../app';

export const DnDNotificationsCardView: FC = () => {
  const addToastInfoMessage = useContext(mainContext).addToastInfoMessage;
  const [hasDndEnabled, setHasDndEnabled] = useState(false);
  const [statusLoaded, setStatusLoaded] = useState(false);

  useEffect(function checkDndStatus() {
    (async () => {
      try {
        const dnd = await Notificare.device().fetchDoNotDisturb();
        setHasDndEnabled(dnd != null);
        console.log('=== DnD fetched successfully ===');
      } catch (e) {
        console.log('=== Error fetching DnD ===');
        console.log(JSON.stringify(e));

        addToastInfoMessage({
          message: 'Error fetching DnD.',
          type: 'error',
        });
      }

      setStatusLoaded(true);
    })();
  }, []);

  async function updateDndStatus(enabled: boolean) {
    if (!statusLoaded) return;

    setHasDndEnabled(enabled);

    if (!enabled) {
      try {
        await Notificare.device().clearDoNotDisturb();
        console.log('=== DnD cleared successfully ===');

        addToastInfoMessage({
          message: 'DnD cleared successfully.',
          type: 'success',
        });
      } catch (e) {
        console.log('=== Error cleaning DnD ===');
        console.log(JSON.stringify(e));

        addToastInfoMessage({
          message: 'Error cleaning DnD.',
          type: 'error',
        });
      }

      return;
    }

    try {
      await Notificare.device().updateDoNotDisturb({
        start: '23:00',
        end: '08:00',
      });
      console.log('=== DnD updated successfully ===');

      addToastInfoMessage({
        message: 'DnD updated successfully.',
        type: 'success',
      });

      return;
    } catch (e) {
      console.log('=== Error updating DnD ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error updating DnD.',
        type: 'error',
      });
    }
  }

  return (
    <IonCard className="ion-card-margin">
      <IonItem detail={false} lines="none">
        <IonIcon icon={banOutline} size="small" />

        <IonLabel className="label-with-icon">Do Not Disturb</IonLabel>

        <IonToggle slot="end" checked={hasDndEnabled} onIonChange={(e) => updateDndStatus(e.detail.checked)} />
      </IonItem>
    </IonCard>
  );
};
