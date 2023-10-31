'use client';
import { AlertContext, AlertType } from '@/context/AlertContext';
import cn from 'classnames';
import { ReactNode, useContext } from 'react';
import s from './AlertBanner.module.scss';

type AlertBannerProps = {
  children: React.ReactNode;
  type?: AlertType;
};

export default function AlertBanner({ children, type }: AlertBannerProps) {
  const context = useContext(AlertContext);
  context?.setAlertType(type ?? 'neutral');
  context?.setAlertChildren(children);
  return null;
}

export function AlertUI({
  children,
  type,
}: {
  children: ReactNode;
  type?: AlertType;
}) {
  return (
    <div className={cn(s.alert, type ? s?.[type] : undefined)}>{children}</div>
  );
}
