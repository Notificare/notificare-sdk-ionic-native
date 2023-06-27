import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import type { NotificarePurchase } from 'capacitor-notificare-monetize';
import { NotificareMonetize } from 'capacitor-notificare-monetize';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import '../../../styles/index.css';

import { mainContext } from '../../../app';
import { DataFieldView } from '../../../components/data-field/data_field_view';

export const MonetizePurchasesView: FC = () => {
  const addToastInfoMessage = useContext(mainContext).addToastInfoMessage;
  const [purchases, setPurchases] = useState<NotificarePurchase[]>([]);

  useEffect(function loadInitialData() {
    (async () => {
      await getPurchases();
    })();
  }, []);

  async function getPurchases() {
    try {
      const result = await NotificareMonetize.getPurchases();
      setPurchases(result);
      console.log('=== Got purchases successfully ===');

      addToastInfoMessage({
        message: 'Got purchases successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error getting purchases ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error getting purchases.',
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

          <IonTitle>Purchases</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <section className="main-container">
          {purchases.length === 0 ? (
            <IonCard className="margin-top">
              <IonItem detail={false} lines="none">
                <IonLabel>No purchases found</IonLabel>
              </IonItem>
            </IonCard>
          ) : (
            <>
              {purchases.map((purchase) => {
                return (
                  <div key={purchase.id}>
                    <IonCard className="margin-top">
                      <DataFieldView label={'ID'} value={purchase.id} />

                      <DataFieldView label={'Name'} value={purchase.productIdentifier} />

                      <DataFieldView label={'Type'} value={purchase.time} />
                    </IonCard>
                  </div>
                );
              })}
            </>
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};
