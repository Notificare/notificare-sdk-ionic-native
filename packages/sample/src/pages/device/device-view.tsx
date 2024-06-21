import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Notificare } from 'capacitor-notificare';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import '../../styles/index.css';

import { DataFieldView } from '../../components/data-field/data-field-view';
import { useToastContext } from '../../contexts/toast';

export const DeviceView: FC = () => {
  const { addToastInfoMessage } = useToastContext();
  const [deviceData, setDeviceData] = useState<Record<string, string>>({});
  const [userData, setUserData] = useState<Record<string, string>>({});

  const loadDeviceData = useCallback(async () => {
    try {
      const currentDevice = await Notificare.device().getCurrentDevice();
      if (currentDevice == null) {
        return;
      }

      const preferredLanguage = await Notificare.device().getPreferredLanguage();
      const userDataResult = await Notificare.device().fetchUserData();

      const currentDeviceData: Record<string, string> = {};
      currentDeviceData.ID = currentDevice.id;
      currentDeviceData['User Name'] = currentDevice.userName ?? '-';
      currentDeviceData.DnD = currentDevice.dnd != null ? `${currentDevice.dnd.start} : ${currentDevice.dnd.end}` : '-';
      currentDeviceData['Preferred Language'] = preferredLanguage ?? '-';

      setDeviceData(currentDeviceData);
      setUserData(userDataResult);
    } catch (e) {
      console.log('=== Error getting device data ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error getting device data.',
        type: 'error',
      });
    }
  }, [addToastInfoMessage]);

  useEffect(
    function loadInitialData() {
      (async () => {
        await loadDeviceData();
      })();
    },
    [loadDeviceData]
  );

  async function updateUser() {
    try {
      await Notificare.device().updateUser('Notificarista@notifica.re', 'Notificarista');
      console.log('=== Updated user as Notificarista successfully ===');

      addToastInfoMessage({
        message: 'Updated user as Notificarista successfully.',
        type: 'success',
      });

      await loadDeviceData();
    } catch (e) {
      console.log('=== Error updating user as Notificarista ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error updating user as Notificarista',
        type: 'error',
      });
    }
  }

  async function updateUserAsAnonymous() {
    try {
      await Notificare.device().updateUser(null, null);
      console.log('=== Updated user as anonymous successfully ===');

      addToastInfoMessage({
        message: 'Updated user as anonymous successfully.',
        type: 'success',
      });

      await loadDeviceData();
    } catch (e) {
      console.log('=== Error updating user as anonymous ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error updating user as anonymous.',
        type: 'error',
      });
    }
  }

  async function updatePreferredLanguage() {
    try {
      await Notificare.device().updatePreferredLanguage('nl-NL');
      console.log('=== Updated preferred language successfully ===');

      addToastInfoMessage({
        message: 'Updated preferred language successfully.',
        type: 'success',
      });

      await loadDeviceData();
    } catch (e) {
      console.log('=== Error updating preferred language ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error updating preferred language.',
        type: 'error',
      });
    }
  }

  async function clearPreferredLanguage() {
    try {
      await Notificare.device().updatePreferredLanguage(null);
      console.log('=== Cleared preferred language successfully ===');

      addToastInfoMessage({
        message: 'Cleared preferred language successfully.',
        type: 'success',
      });

      await loadDeviceData();
    } catch (e) {
      console.log('=== Error cleaning preferred language ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error cleaning preferred language.',
        type: 'error',
      });
    }
  }

  async function updateUserData() {
    try {
      await Notificare.device().updateUserData({
        firstName: 'FirstNameExample',
        lastName: 'LastNameExample',
      });
      console.log('=== Updated user data successfully ===');

      addToastInfoMessage({
        message: 'Updated user data successfully.',
        type: 'success',
      });

      await loadDeviceData();
    } catch (e) {
      console.log('=== Error updating user data ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error updating user data.',
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

          <IonTitle>Device</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <section className="main-container">
          <div className="section-title-row">
            <IonText className="section-title">Current Device</IonText>
          </div>

          <IonCard className="ion-card-margin">
            {Object.entries(deviceData).map(([label, value], index) => {
              return (
                <DataFieldView
                  key={label}
                  label={label}
                  value={value}
                  removeDivider={index + 1 === Object.entries(deviceData).length}
                />
              );
            })}
          </IonCard>

          <div className="section-title-row">
            <IonText className="section-title">User Data</IonText>
          </div>

          {Object.keys(userData).length === 0 ? (
            <IonCard className="ion-card-margin">
              <IonItem detail={false} lines="none">
                <IonLabel>No data</IonLabel>
              </IonItem>
            </IonCard>
          ) : (
            <IonCard className="ion-card-margin">
              {Object.entries(userData).map(([label, value], index) => {
                return (
                  <DataFieldView
                    key={label}
                    label={label}
                    value={value}
                    removeDivider={index + 1 === Object.entries(userData).length}
                  />
                );
              })}
            </IonCard>
          )}

          <div className="section-title-row">
            <IonText className="section-title">Register Device</IonText>
          </div>

          <IonCard className="ion-card-margin">
            <IonItem className="sample-button" detail={false} lines="full" button onClick={updateUser}>
              <IonLabel>Update User</IonLabel>
            </IonItem>

            <IonItem className="sample-button" detail={false} lines="none" button onClick={updateUserAsAnonymous}>
              <IonLabel>Update User as Anonymous</IonLabel>
            </IonItem>
          </IonCard>

          <div className="section-title-row">
            <IonText className="section-title">Language</IonText>
          </div>

          <IonCard className="ion-card-margin">
            <IonItem className="sample-button" detail={false} lines="full" button onClick={updatePreferredLanguage}>
              <IonLabel>Update preferred language</IonLabel>
            </IonItem>

            <IonItem className="sample-button" detail={false} lines="none" button onClick={clearPreferredLanguage}>
              <IonLabel>Clear preferred language</IonLabel>
            </IonItem>
          </IonCard>

          <div className="section-title-row">
            <IonText className="section-title">User Data</IonText>
          </div>

          <IonCard className="ion-card-margin">
            <IonItem className="sample-button" detail={false} lines="none" button onClick={updateUserData}>
              <IonLabel>Update user data</IonLabel>
            </IonItem>
          </IonCard>
        </section>
      </IonContent>
    </IonPage>
  );
};
