'use client';
import { useSupabase } from '@/app/supabase-provider';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}
export default function ProtectedRouter({ children }: Props) {
  const {
    appState: { isAuthenticated, isInitialized }
  } = useSupabase();

  if (!isAuthenticated && isInitialized) {
    redirect('/views/signin');
  }
  return <>{children}</>;
}
