'use client';

import { notification } from 'antd';
import { IconType } from 'antd/es/notification/interface';
import { PropsWithChildren, createContext, useContext } from 'react';

interface ToastContextType {
  openNotification: (message: string, messageStatus: IconType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    message: string,
    messageStatus: IconType = 'success'
  ) => {
    api[messageStatus]({
      message,
      placement: 'topRight'
    });
  };

  return (
    <ToastContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </ToastContext.Provider>
  );
};

export const useToastMessage = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastMessage should be used within <ToastProvider>');
  }
  return context;
};
