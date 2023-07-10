import { IonItem, IonLabel } from '@ionic/react';
import type { FC } from 'react';
import './data-field-style.css';

type DataFieldProps = {
  label: string;
  value: string | null | undefined;
  removeDivider?: boolean;
};

export const DataFieldView: FC<DataFieldProps> = ({ label, value, removeDivider }) => {
  return (
    <IonItem lines={removeDivider ? 'none' : 'inset'}>
      <IonLabel>{label}</IonLabel>

      <IonLabel color="medium" className="data-field-value">
        {value ?? '-'}
      </IonLabel>
    </IonItem>
  );
};
