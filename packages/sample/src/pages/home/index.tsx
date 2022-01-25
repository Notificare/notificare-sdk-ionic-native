import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { Notificare } from 'capacitor-notificare';
import type { FC } from 'react';

import './index.css';

const TOAST_DURATION = 1000;

export const Home: FC = () => {
  const [toast] = useIonToast();

  // region Core

  async function onLaunchClicked() {
    try {
      await Notificare.launch();
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onUnlaunchClicked() {
    try {
      await Notificare.unlaunch();
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onFetchApplicationClicked() {
    try {
      const application = await Notificare.fetchApplication();
      await toast({ message: JSON.stringify(application), duration: TOAST_DURATION });

      console.log('=== APPLICATION ===');
      console.log(JSON.stringify(application, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onCachedApplicationClicked() {
    try {
      const application = await Notificare.getApplication();
      await toast({ message: JSON.stringify(application), duration: TOAST_DURATION });

      console.log('=== APPLICATION ===');
      console.log(JSON.stringify(application, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onFetchNotificationClicked() {
    try {
      const notification = await Notificare.fetchNotification('618e4812974aab0d61ac1483');
      await toast({ message: JSON.stringify(notification), duration: TOAST_DURATION });

      console.log('=== NOTIFICATION ===');
      console.log(JSON.stringify(notification, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  // endregion

  // region Device

  async function onCurrentDeviceClicked() {
    try {
      const device = await Notificare.device().getCurrentDevice();
      await toast({ message: JSON.stringify(device), duration: TOAST_DURATION });

      console.log('=== CURRENT DEVICE ===');
      console.log(JSON.stringify(device, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onRegisterDeviceWithUserClicked() {
    try {
      await Notificare.device().register('helder@notifica.re', 'Helder Pinhal');
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onRegisterDeviceWithAnonymousUserClicked() {
    try {
      await Notificare.device().register(null, null);
      await toast({ message: 'Done.', duration: TOAST_DURATION });
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onFetchTagsClicked() {
    try {
      const tags = await Notificare.device().fetchTags();
      await toast({ message: JSON.stringify(tags), duration: TOAST_DURATION });

      console.log('=== TAGS ===');
      console.log(JSON.stringify(tags, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onAddTagsClicked() {
    try {
      await Notificare.device().addTags(['ionic-native', 'hpinhal', 'remove-me']);
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onRemoveTagsClicked() {
    try {
      await Notificare.device().removeTags(['remove-me']);
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onClearTagsClicked() {
    try {
      await Notificare.device().clearTags();
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onFetchDoNotDisturbClicked() {
    try {
      const dnd = await Notificare.device().fetchDoNotDisturb();
      await toast({ message: JSON.stringify(dnd), duration: TOAST_DURATION });

      console.log('=== DO NOT DISTURB ===');
      console.log(JSON.stringify(dnd, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onUpdateDoNotDisturbClicked() {
    try {
      await Notificare.device().updateDoNotDisturb({
        start: '23:00',
        end: '08:00',
      });
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onClearDoNotDisturbClicked() {
    try {
      await Notificare.device().clearDoNotDisturb();
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onFetchUserDataClicked() {
    try {
      const userData = await Notificare.device().fetchUserData();
      await toast({ message: JSON.stringify(userData), duration: TOAST_DURATION });

      console.log('=== USER DATA===');
      console.log(JSON.stringify(userData, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onUpdateUserDataClicked() {
    try {
      await Notificare.device().updateUserData({
        firstName: 'Helder',
        lastName: 'Pinhal',
      });
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onFetchPreferredLanguageClicked() {
    try {
      const language = await Notificare.device().getPreferredLanguage();
      await toast({ message: JSON.stringify(language), duration: TOAST_DURATION });

      console.log('=== LANGUAGE ===');
      console.log(JSON.stringify(language, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onUpdatePreferredLanguageClicked() {
    try {
      await Notificare.device().updatePreferredLanguage('nl-NL');
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onClearPreferredLanguageClicked() {
    try {
      await Notificare.device().updatePreferredLanguage(null);
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  // endregion

  // region Events

  async function onLogCustomEventClicked() {
    try {
      await Notificare.events().logCustom('CUSTOM_EVENT');

      await Notificare.events().logCustom('CUSTOM_EVENT', {
        string: 'Hello world',
        number: 10,
      });

      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  // endregion

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sample</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sample</IonTitle>
          </IonToolbar>
        </IonHeader>
        <section id="core">
          <IonButton expand="full" fill="clear" onClick={onLaunchClicked}>
            Launch
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onUnlaunchClicked}>
            Un-launch
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onCachedApplicationClicked}>
            Cached application
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onFetchApplicationClicked}>
            Fetch application
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onFetchNotificationClicked}>
            Fetch notification
          </IonButton>
        </section>
        <section id="device">
          <p className="section-title">Device</p>
          <IonButton expand="full" fill="clear" onClick={onCurrentDeviceClicked}>
            Current device
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onRegisterDeviceWithUserClicked}>
            Register device with user
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onRegisterDeviceWithAnonymousUserClicked}>
            Register device with anonymous user
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onFetchTagsClicked}>
            Fetch tags
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onAddTagsClicked}>
            Add tags
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onRemoveTagsClicked}>
            Remove tags
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onClearTagsClicked}>
            Clear tags
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onFetchDoNotDisturbClicked}>
            Fetch do not disturb
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onUpdateDoNotDisturbClicked}>
            Update do not disturb
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onClearDoNotDisturbClicked}>
            Clear do not disturb
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onFetchUserDataClicked}>
            Fetch user data
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onUpdateUserDataClicked}>
            Update user data
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onFetchPreferredLanguageClicked}>
            Fetch preferred language
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onUpdatePreferredLanguageClicked}>
            Update preferred language
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onClearPreferredLanguageClicked}>
            Clear preferred language
          </IonButton>
        </section>
        <section id="events">
          <p className="section-title">Events</p>
          <IonButton expand="full" fill="clear" onClick={onLogCustomEventClicked}>
            Log custom event
          </IonButton>
        </section>
      </IonContent>
    </IonPage>
  );
};
