import { IonAlert } from '@ionic/react';
import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

const AlertDialogContext = createContext<AlertDialogContextProps | undefined>(undefined);

interface AlertDialogContextProps {
  currentAlertDialog: AlertDialog | undefined;
  setCurrentAlertDialog: (AlertDialog: AlertDialog) => void;
}

export function useAlertDialogContext(): AlertDialogContextProps {
  const context = useContext(AlertDialogContext);

  if (!context) {
    throw new Error('Unable to find the AlertDialogProvider in the component tree.');
  }

  return context;
}

export function AlertDialogProvider({ children }: AlertDialogProviderProps): JSX.Element {
  const [currentAlertDialog, setCurrentAlertDialog] = useState<AlertDialog>();

  return (
    <AlertDialogContext.Provider value={{ currentAlertDialog, setCurrentAlertDialog }}>
      {children}

      <IonAlert
        isOpen={currentAlertDialog !== undefined}
        header={currentAlertDialog?.title ?? ''}
        message={currentAlertDialog?.message ?? ''}
        buttons={['OK']}
        onDidDismiss={() => setCurrentAlertDialog(undefined)}
      ></IonAlert>
    </AlertDialogContext.Provider>
  );
}

type AlertDialogProviderProps = {
  children: ReactNode;
};

export interface AlertDialog {
  title: string;
  message: string;
}
