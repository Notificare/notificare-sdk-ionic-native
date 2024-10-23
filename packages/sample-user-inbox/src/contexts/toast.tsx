import type { Color } from '@ionic/core';
import { IonToast } from '@ionic/react';
import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

interface ToastContextProps {
  currentToast: Toast | undefined;
  addToastInfoMessage: (Toast: Toast) => void;
}

export function useToastContext(): ToastContextProps {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('Unable to find the ToastProvider in the component tree.');
  }

  return context;
}

export function ToastProvider({ children }: ToastProviderProps): JSX.Element {
  const [currentToast, setCurrentToast] = useState<Toast>();
  const [ToastQueue, setToastQueue] = useState<Toast[]>([]);

  const addToastInfoMessage = useCallback((Toast: Toast) => {
    setToastQueue((prevState) => [...prevState, Toast]);
  }, []);

  useEffect(
    function processQueue() {
      if (currentToast) {
        return;
      }

      if (!ToastQueue.length) {
        return;
      }

      const Toast = ToastQueue[0];
      setCurrentToast(Toast);
      setToastQueue((prevState) => prevState.slice(1));
    },
    [currentToast, ToastQueue]
  );

  function getToastColor(Toast: Toast): Color {
    switch (Toast.type) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'standard':
      default:
        return 'dark';
    }
  }

  function getToastDuration(Toast: Toast): number {
    switch (Toast.type) {
      case 'error':
        return 3000;
      case 'standard':
        return 1000;
      case 'success':
        return 1500;
      default:
        return 1000;
    }
  }

  return (
    <ToastContext.Provider value={{ currentToast, addToastInfoMessage }}>
      {children}

      <IonToast
        isOpen={currentToast !== undefined}
        message={currentToast?.message}
        duration={currentToast ? getToastDuration(currentToast) : 1000}
        color={currentToast ? getToastColor(currentToast) : 'dark'}
        onDidDismiss={() => setCurrentToast(undefined)}
      ></IonToast>
    </ToastContext.Provider>
  );
}

type ToastProviderProps = {
  children: ReactNode;
};

export interface Toast {
  message: string;
  type?: 'standard' | 'success' | 'error';
}
