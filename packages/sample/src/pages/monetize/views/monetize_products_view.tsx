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
import type { NotificareProduct } from 'capacitor-notificare-monetize';
import { NotificareMonetize } from 'capacitor-notificare-monetize';
import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import '../../../styles/index.css';

import { mainContext } from '../../../app';
import { DataFieldView } from '../../../components/data-field/data_field_view';

export const MonetizeProductsView: FC = () => {
  const addToastInfoMessage = useContext(mainContext).addToastInfoMessage;
  const [products, setProducts] = useState<NotificareProduct[]>([]);

  useEffect(function loadInitialData() {
    (async () => {
      await getProducts();
    })();
  }, []);

  async function getProducts() {
    try {
      const result = await NotificareMonetize.getProducts();

      setProducts(result);
      console.log('=== Got products successfully ===');

      addToastInfoMessage({
        message: 'Got products successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error getting product ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error getting product.',
        type: 'error',
      });
    }
  }

  async function purchase(product: NotificareProduct) {
    try {
      await NotificareMonetize.startPurchaseFlow(product);
      console.log('=== Product purchased successfully ===');

      addToastInfoMessage({
        message: 'Product purchased successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error purchasing product ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error purchasing product.',
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

          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <section className="main_container">
          {products.length === 0 ? (
            <IonCard className="margin-top">
              <IonItem detail={true} lines="none">
                <IonLabel>No products found</IonLabel>
              </IonItem>
            </IonCard>
          ) : (
            <>
              {products.map((product) => {
                return (
                  <div key={product.id}>
                    <IonCard className="margin-top">
                      <DataFieldView label={'ID'} value={product.id} />

                      <DataFieldView label={'Name'} value={product.name} />

                      <DataFieldView label={'Type'} value={product.type} />

                      <DataFieldView label={'Identifier'} value={product.identifier} />

                      <DataFieldView label={'Price'} value={product.storeDetails?.price.toString()} />

                      <IonItem
                        className="sample-button"
                        detail={false}
                        lines="none"
                        button
                        onClick={() => purchase(product)}
                      >
                        <IonLabel>Buy</IonLabel>
                      </IonItem>
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
