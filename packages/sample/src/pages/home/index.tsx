import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { Notificare } from 'capacitor-notificare';
import { NotificareAssets } from 'capacitor-notificare-assets';
import { NotificareAuthentication } from 'capacitor-notificare-authentication';
import { NotificareGeo, PermissionGroup, PermissionStatus } from 'capacitor-notificare-geo';
import { NotificareLoyalty } from 'capacitor-notificare-loyalty';
import { NotificarePush } from 'capacitor-notificare-push';
import { NotificareScannables } from 'capacitor-notificare-scannables';
import type { FC } from 'react';
import { useHistory } from 'react-router';

import './index.css';

const TOAST_DURATION = 1000;

export const Home: FC = () => {
  const [toast] = useIonToast();
  const history = useHistory();

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

  // region Notificare Assets

  async function onFetchAssetsClicked() {
    try {
      const assets = await NotificareAssets.fetch('LANDSCAPES');
      await toast({ message: JSON.stringify(assets), duration: TOAST_DURATION });

      console.log('=== FETCH ASSETS ===');
      console.log(JSON.stringify(assets, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  // endregion

  // region Notificare Push

  async function onHasRemoteNotificationEnabledClicked() {
    try {
      const enabled = await NotificarePush.hasRemoteNotificationsEnabled();
      await toast({ message: JSON.stringify(enabled), duration: TOAST_DURATION });

      console.log('=== REMOTE NOTIFICATIONS ENABLED ===');
      console.log(JSON.stringify(enabled, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onAllowedUIClicked() {
    try {
      const allowedUI = await NotificarePush.allowedUI();
      await toast({ message: JSON.stringify(allowedUI), duration: TOAST_DURATION });

      console.log('=== ALLOWED UI ===');
      console.log(JSON.stringify(allowedUI, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onEnableRemoteNotificationsClicked() {
    try {
      await NotificarePush.enableRemoteNotifications();
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onDisableRemoteNotificationsClicked() {
    try {
      await NotificarePush.disableRemoteNotifications();
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  // endregion

  // region Notificare Geo

  async function onLocationServicesEnabledClicked() {
    try {
      const enabled = await NotificareGeo.hasLocationServicesEnabled();
      await toast({ message: JSON.stringify(enabled), duration: TOAST_DURATION });

      console.log('=== LOCATION SERVICES ENABLED ===');
      console.log(JSON.stringify(enabled, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onBluetoothEnabledClicked() {
    try {
      const enabled = await NotificareGeo.hasBluetoothEnabled();
      await toast({ message: JSON.stringify(enabled), duration: TOAST_DURATION });

      console.log('=== BLUETOOTH ENABLED ===');
      console.log(JSON.stringify(enabled, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onEnableLocationUpdatesClicked() {
    try {
      const hasFullCapabilities =
        (await ensureForegroundLocationPermission()) &&
        (await ensureBackgroundLocationPermission()) &&
        (await ensureBluetoothScanPermission());

      // Calling enableLocationUpdates() will evaluate the given permissions, if any, and enable the available capabilities.
      await NotificareGeo.enableLocationUpdates();
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function ensureForegroundLocationPermission(): Promise<boolean> {
    const status = await NotificareGeo.checkPermissionStatus(PermissionGroup.LOCATION_WHEN_IN_USE);
    if (status == PermissionStatus.GRANTED) return true;

    if (status == PermissionStatus.PERMANENTLY_DENIED) {
      // TODO: Show some informational UI, educating the user to change the permission via the Settings app.
      await NotificareGeo.openAppSettings();
      return false;
    }

    if (await NotificareGeo.shouldShowPermissionRationale(PermissionGroup.LOCATION_WHEN_IN_USE)) {
      await NotificareGeo.presentPermissionRationale(PermissionGroup.LOCATION_WHEN_IN_USE, {
        title: 'Sample',
        message: 'We need access to foreground location in order to show relevant content.',
      });
    }

    return (await NotificareGeo.requestPermission(PermissionGroup.LOCATION_WHEN_IN_USE)) == PermissionStatus.GRANTED;
  }

  async function ensureBackgroundLocationPermission(): Promise<boolean> {
    const status = await NotificareGeo.checkPermissionStatus(PermissionGroup.LOCATION_ALWAYS);
    if (status == PermissionStatus.GRANTED) return true;

    if (status == PermissionStatus.PERMANENTLY_DENIED) {
      // TODO: Show some informational UI, educating the user to change the permission via the Settings app.
      await NotificareGeo.openAppSettings();
      return false;
    }

    if (await NotificareGeo.shouldShowPermissionRationale(PermissionGroup.LOCATION_ALWAYS)) {
      await NotificareGeo.presentPermissionRationale(PermissionGroup.LOCATION_ALWAYS, {
        title: 'Sample',
        message: 'We need access to background location in order to show relevant content.',
      });
    }

    return (await NotificareGeo.requestPermission(PermissionGroup.LOCATION_ALWAYS)) == PermissionStatus.GRANTED;
  }

  async function ensureBluetoothScanPermission(): Promise<boolean> {
    const status = await NotificareGeo.checkPermissionStatus(PermissionGroup.BLUETOOTH_SCAN);
    if (status == PermissionStatus.GRANTED) return true;

    if (status == PermissionStatus.PERMANENTLY_DENIED) {
      // TODO: Show some informational UI, educating the user to change the permission via the Settings app.
      await NotificareGeo.openAppSettings();
      return false;
    }

    if (await NotificareGeo.shouldShowPermissionRationale(PermissionGroup.BLUETOOTH_SCAN)) {
      await NotificareGeo.presentPermissionRationale(PermissionGroup.BLUETOOTH_SCAN, {
        title: 'Sample',
        message: 'We need access to bluetooth scan in order to show relevant content.',
      });
    }

    return (await NotificareGeo.requestPermission(PermissionGroup.BLUETOOTH_SCAN)) == PermissionStatus.GRANTED;
  }

  async function onDisableLocationUpdatesClicked() {
    try {
      await NotificareGeo.disableLocationUpdates();
      await toast({ message: 'Done.', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onRangingBeaconsClicked() {
    history.push('/beacons');
  }

  // endregion

  // region Notificare Inbox

  async function onInboxClicked() {
    history.push('/inbox');
  }

  // endregion

  // region Notificare Loyalty

  async function onFetchPassClicked() {
    try {
      const pass = await NotificareLoyalty.fetchPassBySerial('520d974e-b3d5-4d30-93b4-259f9d4bfa1d');
      await toast({ message: JSON.stringify(pass), duration: TOAST_DURATION });

      console.log('=== FETCH PASS ===');
      console.log(JSON.stringify(pass, null, 2));

      await NotificareLoyalty.present(pass);
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  // endregion

  // region Notificare Scannables

  async function onStartScannableSessionClicked() {
    try {
      // await NotificareScannables.startScannableSession();

      if (await NotificareScannables.canStartNfcScannableSession()) {
        await NotificareScannables.startNfcScannableSession();
      } else {
        await NotificareScannables.startQrCodeScannableSession();
      }
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  // endregion

  // region Notificare Authentication

  async function onIsLoggedInClicked() {
    try {
      const result = await NotificareAuthentication.isLoggedIn();
      await toast({ message: JSON.stringify(result), duration: TOAST_DURATION });

      console.log('=== IS LOGGED IN ===');
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onCreateAccountClicked() {
    try {
      await NotificareAuthentication.createAccount('helder+4@notifica.re', '123456', 'Helder Pinhal');
      await toast({ message: 'Done', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onLoginClicked() {
    try {
      await NotificareAuthentication.login('helder@notifica.re', '123456');
      await toast({ message: 'Done', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onLogoutClicked() {
    try {
      await NotificareAuthentication.logout();
      await toast({ message: 'Done', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onFetchUserDetailsClicked() {
    try {
      const result = await NotificareAuthentication.fetchUserDetails();
      await toast({ message: JSON.stringify(result), duration: TOAST_DURATION });

      console.log('=== FETCH USER DETAILS ===');
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onFetchUserPreferencesClicked() {
    try {
      const result = await NotificareAuthentication.fetchUserPreferences();
      await toast({ message: JSON.stringify(result), duration: TOAST_DURATION });

      console.log('=== FETCH USER PREFERENCES ===');
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onFetchUserSegmentsClicked() {
    try {
      const result = await NotificareAuthentication.fetchUserSegments();
      await toast({ message: JSON.stringify(result), duration: TOAST_DURATION });

      console.log('=== FETCH USER SEGMENTS ===');
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onSendPasswordResetClicked() {
    try {
      await NotificareAuthentication.sendPasswordReset('helder@notifica.re');
      await toast({ message: 'Done', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onResetPasswordClicked() {
    try {
      await NotificareAuthentication.resetPassword('helder@notifica.re', '---');
      await toast({ message: 'Done', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onChangePasswordClicked() {
    try {
      await NotificareAuthentication.changePassword('123456');
      await toast({ message: 'Done', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onValidateUserClicked() {
    try {
      await NotificareAuthentication.validateUser('---');
      await toast({ message: 'Done', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onGeneratePushEmailClicked() {
    try {
      const result = await NotificareAuthentication.generatePushEmailAddress();
      await toast({ message: JSON.stringify(result), duration: TOAST_DURATION });

      console.log('=== GENERATE PUSH EMAIL ===');
      console.log(JSON.stringify(result, null, 2));
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onAddUserSegmentClicked() {
    try {
      const segments = await NotificareAuthentication.fetchUserSegments();

      await NotificareAuthentication.addUserSegment(segments[0]);
      await toast({ message: 'Done', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onRemoveUserSegmentClicked() {
    try {
      const segments = await NotificareAuthentication.fetchUserSegments();

      await NotificareAuthentication.removeUserSegment(segments[0]);
      await toast({ message: 'Done', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onAddUserSegmentToPreferenceClicked() {
    try {
      const preferences = await NotificareAuthentication.fetchUserPreferences();

      const preference = preferences[0];
      const option = preference.options[0];

      await NotificareAuthentication.addUserSegmentToPreference(preference, option);
      await toast({ message: 'Done', duration: TOAST_DURATION });
    } catch (e) {
      await toast({ message: JSON.stringify(e), duration: TOAST_DURATION });
    }
  }

  async function onRemoveUserSegmentFromPreferenceClicked() {
    try {
      const preferences = await NotificareAuthentication.fetchUserPreferences();

      const preference = preferences[0];
      const option = preference.options[0];

      await NotificareAuthentication.removeUserSegmentFromPreference(preference, option);
      await toast({ message: 'Done', duration: TOAST_DURATION });
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
        <section id="push">
          <p className="section-title">Push</p>
          <IonButton expand="full" fill="clear" onClick={onHasRemoteNotificationEnabledClicked}>
            Check remote notifications enabled
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onAllowedUIClicked}>
            Check allowed UI
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onEnableRemoteNotificationsClicked}>
            Enable remote notifications
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onDisableRemoteNotificationsClicked}>
            Disable remote notifications
          </IonButton>
        </section>
        <section id="geo">
          <p className="section-title">Geo</p>
          <IonButton expand="full" fill="clear" onClick={onLocationServicesEnabledClicked}>
            Check location services enabled
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onBluetoothEnabledClicked}>
            Check bluetooth enabled
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onEnableLocationUpdatesClicked}>
            Enable location updates
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onDisableLocationUpdatesClicked}>
            Disable location updates
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onRangingBeaconsClicked}>
            View ranging beacons
          </IonButton>
        </section>
        <section id="inbox">
          <p className="section-title">Inbox</p>
          <IonButton expand="full" fill="clear" onClick={onInboxClicked}>
            Open inbox
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
        <section id="assets">
          <p className="section-title">Assets</p>
          <IonButton expand="full" fill="clear" onClick={onFetchAssetsClicked}>
            Fetch assets
          </IonButton>
        </section>
        <section id="loyalty">
          <p className="section-title">Loyalty</p>
          <IonButton expand="full" fill="clear" onClick={onFetchPassClicked}>
            Fetch pass
          </IonButton>
        </section>
        <section id="scannables">
          <p className="section-title">Scannables</p>
          <IonButton expand="full" fill="clear" onClick={onStartScannableSessionClicked}>
            Start scannable session
          </IonButton>
        </section>
        <section id="authentication">
          <p className="section-title">Authentication</p>
          <IonButton expand="full" fill="clear" onClick={onIsLoggedInClicked}>
            Am I logged in?
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onCreateAccountClicked}>
            Create an account
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onLoginClicked}>
            Login
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onLogoutClicked}>
            Logout
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onFetchUserDetailsClicked}>
            Fetch user details
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onFetchUserPreferencesClicked}>
            Fetch user preferences
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onFetchUserSegmentsClicked}>
            Fetch user segments
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onSendPasswordResetClicked}>
            Send password reset
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onResetPasswordClicked}>
            Reset password
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onChangePasswordClicked}>
            Change password
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onValidateUserClicked}>
            Validate user
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onGeneratePushEmailClicked}>
            Generate push email
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onAddUserSegmentClicked}>
            Add user segment
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onRemoveUserSegmentClicked}>
            Remove user segment
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onAddUserSegmentToPreferenceClicked}>
            Add user segment to preference
          </IonButton>
          <IonButton expand="full" fill="clear" onClick={onRemoveUserSegmentFromPreferenceClicked}>
            Remove user segment from preference
          </IonButton>
        </section>
      </IonContent>
    </IonPage>
  );
};
