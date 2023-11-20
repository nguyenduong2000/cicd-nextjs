'use client';

import type { Database } from '@/types_db';
import localStorage from '@/utils/LocalStorage';
import { appConfig } from '@/utils/app-config';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { Session, SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

type AppState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
};

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  session: Session;
  appState: AppState;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createPagesBrowserClient());
  const [session, setSession] = useState<Session | null>(null);
  const [appState, setAppState] = useState<AppState>({
    isAuthenticated: false,
    isInitialized: false
  });
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        localStorage.set(appConfig.accessTokenName, session.access_token);
        setAppState({
          isAuthenticated: true,
          isInitialized: true
        });
      } else {
        localStorage.remove(appConfig.accessTokenName);
        setAppState({
          isAuthenticated: false,
          isInitialized: true
        });
      }
      setSession(session);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase.auth]);

  return (
    <Context.Provider value={{ supabase, session, appState }}>
      {appState.isInitialized && children}
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};
