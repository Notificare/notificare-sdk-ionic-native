import { IonCard, IonIcon, IonItem, IonLabel, IonText, IonToggle } from '@ionic/react';
import { NotificareGeo, PermissionGroup, PermissionStatus } from 'capacitor-notificare-geo';
import { informationCircleOutline, locationOutline, radioOutline } from 'ionicons/icons';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import '../../../styles/index.css';
import { useHistory } from 'react-router';

import { mainContext } from '../../../app';

export const GeoCardView: FC = () => {
  const history = useHistory();
  const addToastInfoMessage = useContext(mainContext).addToastInfoMessage;
  const setInfoAlert = useContext(mainContext).setInfoAlert;
  const [hasLocationEnabled, setHasLocationEnabled] = useState(false);
  const [statusLoaded, setStatusLoaded] = useState(false);

  useEffect(function loadInitialData() {
    (async () => {
      await checkLocationStatus();
    })();
  }, []);

  async function checkLocationStatus() {
    try {
      const status = await NotificareGeo.checkPermissionStatus(PermissionGroup.LOCATION_WHEN_IN_USE);

      const enabled = (await NotificareGeo.hasLocationServicesEnabled()) && status === PermissionStatus.GRANTED;

      setHasLocationEnabled(enabled);
    } catch (e) {
      console.log('=== Error checking location status ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error checking location status.',
        type: 'error',
      });
    }

    setStatusLoaded(true);
  }

  async function updateLocationStatus(enabled: boolean) {
    if (!statusLoaded) return;

    setHasLocationEnabled(enabled);

    if (!enabled) {
      try {
        await NotificareGeo.disableLocationUpdates();
        console.log('=== Disabled location updates successfully ===');

        addToastInfoMessage({
          message: 'Disabled location update successfully.',
          type: 'success',
        });
      } catch (e) {
        console.log('=== Error disabling location updates ===');
        console.log(JSON.stringify(e));

        addToastInfoMessage({
          message: 'Error disabling location updates.',
          type: 'error',
        });
      }

      return;
    }

    try {
      if (await ensureForegroundLocationPermission()) {
        await NotificareGeo.enableLocationUpdates();
        console.log('=== Enabled location updates successfully ===');

        addToastInfoMessage({
          message: 'Enabled location updates successfully successfully.',
          type: 'success',
        });
      } else {
        setHasLocationEnabled(false);

        return;
      }
    } catch (e) {
      console.log('=== Error enabling foreground location updates ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error enabling foreground location updates.',
        type: 'error',
      });
    }

    try {
      if (await ensureBackgroundLocationPermission()) {
        await ensureBluetoothScanPermission();
        await NotificareGeo.enableLocationUpdates();
        console.log('=== Enabled background location updates successfully ===');

        addToastInfoMessage({
          message: 'Enabled background location updates successfully.',
          type: 'success',
        });
      }
    } catch (e) {
      console.log('=== Error enabling background location updates  ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error enabling background location updates.',
        type: 'error',
      });
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

  async function showLocationInfo() {
    try {
      const hasLocationServicesEnabled = await NotificareGeo.hasLocationServicesEnabled();
      const hasBluetoothEnabled = await NotificareGeo.hasBluetoothEnabled();
      const infoMessage = `hasLocationEnabled: ${hasLocationServicesEnabled} <br> hasBluetoothEnabled: ${hasBluetoothEnabled}`;

      setInfoAlert({ title: 'Location Status', message: infoMessage });
    } catch (e) {
      console.log('=== Error getting hasLocationServicesEnabled / hasBluetoothEnabled ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error getting hasLocationServicesEnabled / hasBluetoothEnabled.',
        type: 'error',
      });
    }
  }

  function onBeaconsClicked() {
    history.push('/beacons');
  }

  return (
    <div className="margin-top">
      <div className="section-title-row">
        <IonText className="section-title">Geo</IonText>

        <button className="info-button" onClick={showLocationInfo}>
          <IonIcon icon={informationCircleOutline} size="small" />
        </button>
      </div>

      <IonCard className="ion-card-margin">
        <IonItem detail={false} lines="none">
          <IonIcon icon={locationOutline} size="small" />

          <IonLabel className="label-with-icon">Location</IonLabel>

          <IonToggle
            slot="end"
            checked={hasLocationEnabled}
            onIonChange={(e) => updateLocationStatus(e.detail.checked)}
          />
        </IonItem>

        <div className="divider-horizontal-margin" />

        <IonItem detail={true} lines="none" button onClick={onBeaconsClicked}>
          <IonIcon icon={radioOutline} size="small" />

          <IonLabel className="label-with-icon">Beacons</IonLabel>
        </IonItem>
      </IonCard>
    </div>
  );
};
