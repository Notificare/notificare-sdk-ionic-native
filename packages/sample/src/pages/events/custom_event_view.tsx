import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Notificare } from 'capacitor-notificare';
import type { FC } from 'react';
import { useContext, useState } from 'react';
import '../../styles/index.css';

import { mainContext } from '../../app';

export const CustomEventView: FC = () => {
  const addToastInfoMessage = useContext(mainContext).addToastInfoMessage;
  const [eventName, setEventName] = useState('');
  const [shouldIncludeDataFields, setShouldIncludeDataFields] = useState(false);
  const dataFields = {
    key_one: 'value_one',
    key_two: 'value_two',
  };

  async function registerCustomEvent() {
    try {
      if (shouldIncludeDataFields) {
        await Notificare.events().logCustom(eventName, dataFields);

        setShouldIncludeDataFields(false);
      } else {
        await Notificare.events().logCustom(eventName);
      }

      setEventName('');

      console.log('=== Logged custom event successfully ===');

      addToastInfoMessage({
        message: 'Logged custom event successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error logging custom event ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error logging custom event.',
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

          <IonTitle>Custom Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <section className="main-container">
          <IonCard className="margin-top">
            <IonItem detail={false} lines="full">
              <IonInput
                placeholder="Event name"
                value={eventName}
                onIonChange={(e) => setEventName(e.detail.value ?? '')}
              ></IonInput>
            </IonItem>

            <IonItem
              disabled={eventName.length === 0}
              className="sample-button"
              detail={false}
              lines="none"
              button
              onClick={registerCustomEvent}
            >
              <IonLabel>Register</IonLabel>
            </IonItem>
          </IonCard>

          <IonItem lines="none">
            <IonLabel slot="end">Include data fields</IonLabel>
            <IonCheckbox
              slot="end"
              checked={shouldIncludeDataFields}
              onIonChange={() => setShouldIncludeDataFields(!shouldIncludeDataFields)}
            ></IonCheckbox>
          </IonItem>
        </section>
      </IonContent>
    </IonPage>
  );
};
