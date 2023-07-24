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
import { useEffect, useState } from 'react';
import '../../../styles/index.css';

import { DataFieldView } from '../../../components/data-field/data-field-view';
import { useToastContext } from '../../../contexts/toast';

export const MonetizeProductsView: FC = () => {
  const { addToastInfoMessage } = useToastContext();
  const [products, setProducts] = useState<NotificareProduct[]>([]);

  useEffect(
    function loadProducts() {
      (async () => {
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
      })();
    },
    [addToastInfoMessage]
  );

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
