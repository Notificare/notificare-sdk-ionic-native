import { IonItem, IonLabel } from '@ionic/react';
import type { FC } from 'react';
import React from 'react';
import './asset-url-content-field-style.css';

type AssetUrlContentFieldProps = {
  label: string;
  url: string | undefined | null;
};

export const AssetUrlContentFieldView: FC<AssetUrlContentFieldProps> = ({ label, url }) => {
  return (
    <IonItem>
      <IonLabel>{label}</IonLabel>

      {url !== undefined && url !== null ? (
        <Attachment url={url} />
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
