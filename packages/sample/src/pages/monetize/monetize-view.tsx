import {
  IonLabel,
  IonPage,
  IonCard,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import type { FC } from 'react';
import { useHistory } from 'react-router';
import '../../styles/index.css';

export const MonetizeView: FC = () => {
  const history = useHistory();

  function onProductsClicked() {
    history.push('/monetize/products');
  }

  function onPurchasesClicked() {
    history.push('/monetize/purchases');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonTitle>Monetize</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <section className="main-container">
          <IonCard className="margin-top">
            <IonItem detail={true} lines="full" button onClick={onProductsClicked}>
              <IonLabel>Products</IonLabel>
            </IonItem>

            <IonItem detail={true} lines="none" button onClick={onPurchasesClicked}>
              <IonLabel>Purchases</IonLabel>
            </IonItem>
          </IonCard>
        </section>
      </IonContent>
    </IonPage>
  );
};
