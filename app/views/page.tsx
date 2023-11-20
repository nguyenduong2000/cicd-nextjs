'use client';

import { redirect } from 'next/navigation';
import { useSupabase } from '@/app/supabase-provider';

const View = () => {
  const {
    appState: { isInitialized, isAuthenticated }
  } = useSupabase();
  if (isAuthenticated && isInitialized) {
    return redirect('/views/pages/scoreboard');
  }
  return redirect('/views/signin');
};

export default View;
