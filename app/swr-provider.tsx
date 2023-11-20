'use client';
import { SWRConfig } from 'swr';

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig value={{ errorRetryCount: 1, errorRetryInterval: 3000 }}>
      {children}
    </SWRConfig>
  );
};
