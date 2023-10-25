'use client';
import { AlertUI } from '@/components/alertBanner/AlertBanner';
import { ReactNode, createContext, useState } from 'react';

export type AlertType = 'error' | 'success' | 'neutral';

export const AlertContext = createContext<
  | {
      setAlertChildren: (children: ReactNode) => void;
      alertChildren: ReactNode;
      alertType?: AlertType;
      setAlertType: (type: AlertType) => void;
    }
  | undefined
>(undefined);

type AlertProviderProps = {
  children: ReactNode;
};

export function AlertProvider({ children }: AlertProviderProps) {
  const [alertChildren, setAlertChildren] = useState<ReactNode>(null);
  const [alertType, setAlertType] = useState<AlertType>();

  const value = {
    setAlertChildren,
    alertChildren,
    alertType,
    setAlertType,
  };

  return (
    <AlertContext.Provider value={value}>
      {alertChildren && <AlertUI type={alertType}>{alertChildren}</AlertUI>}
      {children}
    </AlertContext.Provider>
  );
}
