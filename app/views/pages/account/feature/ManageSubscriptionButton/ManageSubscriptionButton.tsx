'use client';

import { useSupabase } from '@/app/supabase-provider';
import Button from '@/components/ui/Button/Button';
import { postData } from '@/utils/helpers';
import { useRouter } from 'next/navigation';

export default function ManageSubscriptionButton() {
  const {
    appState: { isAuthenticated }
  } = useSupabase();
  const router = useRouter();
  const redirectToCustomerPortal = async () => {
    try {
      const { url } = await postData({
        url: '/api/create-portal-link'
      });
      router.push(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <p className="pb-4 sm:pb-0">Manage your subscription on Stripe.</p>
      <Button
        variant="slim"
        disabled={!isAuthenticated}
        onClick={redirectToCustomerPortal}
      >
        Open customer portal
      </Button>
    </div>
  );
}
