import { IonItem, IonLabel } from '@ionic/react';
import type { FC } from 'react';
import './data_field_style.css';

export const DataFieldView: FC<{ label: string; value: string | null | undefined; removeDivider?: boolean }> = (props: {
  label: string;
  value: string | undefined | null;
  removeDivider?: boolean;
}) => {
  return (
    <IonItem lines={props.removeDivider ? 'none' : 'inset'}>
      <IonLabel>{props.label}</IonLabel>

      <IonLabel color="medium" className="data-field-value">
        {props.value ?? '-'}
      </IonLabel>
    </IonItem>
  );
};
