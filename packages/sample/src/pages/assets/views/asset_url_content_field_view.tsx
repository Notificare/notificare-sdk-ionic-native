import { IonItem, IonLabel } from '@ionic/react';
import type { FC } from 'react';
import React from 'react';
import './asset_url_content_field_style.css';

export const AssetUrlContentFieldView: FC<{ label: string; url: string | undefined | null }> = (props: {
  label: string;
  url: string | undefined | null;
}) => {
  return (
    <IonItem>
      <IonLabel>{props.label}</IonLabel>

      {props.url !== undefined && props.url !== null ? (
        <Attachment url={props.url} />
      ) : (
        <IonLabel color="medium" className="asset-empty-url">
          -
        </IonLabel>
      )}
    </IonItem>
  );
};

const Attachment: React.FC<{ url: string }> = (props) => {
  return <img className="asset-attachment" src={props.url} alt="Url Content" width={96} height={64} />;
};
