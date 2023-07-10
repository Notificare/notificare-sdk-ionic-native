import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import type { NotificareAsset } from 'capacitor-notificare-assets';
import { NotificareAssets } from 'capacitor-notificare-assets';
import type { FC } from 'react';
import { useState } from 'react';
import '../../styles/index.css';

import { useToastContext } from '../../contexts/toast';

import { AssetDetailsView } from './views/asset-details-view';

export const AssetsView: FC = () => {
  const { addToastInfoMessage } = useToastContext();
  const [assetsGroup, setAssetsGroup] = useState('');
  const [assets, setAssets] = useState<NotificareAsset[]>([]);

  async function fetchAssets() {
    if (assets.length > 0) {
      setAssets([]);
    }

    try {
      const result = await NotificareAssets.fetch(assetsGroup);
      setAssets(result);
      setAssetsGroup('');
      console.log('=== Fetched assets successfully ===');

      addToastInfoMessage({
        message: 'Fetched assets successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error fetching assets ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error fetching assets.',
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

          <IonTitle>Assets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <section className="main-container">
          <IonCard className="margin-top">
            <IonItem detail={false} lines="full">
              <IonInput
                placeholder="Asset group"
                value={assetsGroup}
                onIonChange={(e) => setAssetsGroup(e.detail.value ?? '')}
              ></IonInput>
            </IonItem>

            <IonItem
              disabled={assetsGroup.length === 0}
              className="sample-button"
              detail={false}
              lines="none"
              button
              onClick={fetchAssets}
            >
              <IonLabel>Search</IonLabel>
            </IonItem>
          </IonCard>

          {Object.values(assets).map((asset) => {
            return <AssetDetailsView key={asset.title} asset={asset} />;
          })}
        </section>
      </IonContent>
    </IonPage>
  );
};
