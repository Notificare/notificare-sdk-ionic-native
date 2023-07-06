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

import { useToastContext } from '../../contexts/toast';

export const TagsView: FC = () => {
  const { addToastInfoMessage } = useToastContext();
  const [tags, setTags] = useState<string[]>([]);

  const fetchTags = useCallback(async () => {
    try {
      const result = await Notificare.device().fetchTags();
      setTags(result);
      console.log('=== Tags fetched successfully ===');

      addToastInfoMessage({
        message: 'Tags fetched successfully.',
        type: 'success',
      });
    } catch (e) {
      console.log('=== Error fetching tags ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error fetching tags.',
        type: 'error',
      });
    }
  }, [addToastInfoMessage]);

  useEffect(
    function loadInitialData() {
      (async () => {
        await fetchTags();
      })();
    },
    [fetchTags]
  );

  async function addTags() {
    try {
      await Notificare.device().addTags(['react-native', 'hpinhal', 'remove-me']);
      console.log('=== Tags added successfully ===');

      addToastInfoMessage({
        message: 'Tags added successfully.',
        type: 'success',
      });

      await fetchTags();
    } catch (e) {
      console.log('=== Error adding tags ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error adding tags.',
        type: 'error',
      });
    }
  }

  async function removeTag() {
    try {
      await Notificare.device().removeTag('remove-me');
      console.log('=== Tag removed successfully ===');

      addToastInfoMessage({
        message: 'Tag removed successfully.',
        type: 'success',
      });

      await fetchTags();
    } catch (e) {
      console.log('=== Error removing tags ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error removing tags.',
        type: 'error',
      });
    }
  }

  async function clearTags() {
    try {
      await Notificare.device().clearTags();
      console.log('=== Tags cleared successfully ===');

      addToastInfoMessage({
        message: 'Tags cleared successfully.',
        type: 'success',
      });

      await fetchTags();
    } catch (e) {
      console.log('=== Error clearing tags ===');
      console.log(JSON.stringify(e));

      addToastInfoMessage({
        message: 'Error clearing tags.',
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

          <IonTitle>Tags</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <section className="main-container">
          <div className="section-title-row">
            <IonText>Device Tags</IonText>
          </div>

          {tags.length === 0 ? (
            <IonCard className="ion-card-margin">
              <IonItem>
                <IonLabel>No tags found</IonLabel>
              </IonItem>
            </IonCard>
          ) : (
            <IonCard className="ion-card-margin">
              {tags.map((tag, index) => {
                return (
                  <IonItem key={tag} lines={index + 1 === tags.length ? 'none' : 'inset'}>
                    <IonLabel>{tag}</IonLabel>
                  </IonItem>
                );
              })}
            </IonCard>
          )}

          <IonCard className="margin-top">
            <IonItem className="sample-button" detail={false} lines="full" button onClick={fetchTags}>
              <IonLabel>Fetch Tags</IonLabel>
            </IonItem>

            <IonItem className="sample-button" detail={false} lines="full" button onClick={addTags}>
              <IonLabel>Add Tags</IonLabel>
            </IonItem>

            <IonItem className="sample-button" detail={false} lines="full" button onClick={removeTag}>
              <IonLabel>Remove Tag</IonLabel>
            </IonItem>

            <IonItem className="sample-button" detail={false} lines="none" button onClick={clearTags}>
              <IonLabel>Clear Tags</IonLabel>
            </IonItem>
          </IonCard>
        </section>
      </IonContent>
    </IonPage>
  );
};
