import { getSession, getSubscription } from '@/app/supabase-server';
import Card from '../Card/Card';
import ManageSubscriptionButton from '../ManageSubscriptionButton/ManageSubscriptionButton';
import Link from 'next/link';

async function TabBilling() {
  const subscription = await getSubscription();
  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);
  return (
    <section>
      <div className="p-2 sm:p-4 sm:pt-10">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-xl font-bold text-white sm:text-center sm:text-6xl">
            Billing
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="p-4">
        <Card
          title="Your Plan"
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : 'You are not currently subscribed to any plan.'
          }
          footer={<ManageSubscriptionButton />}
        >
          <div className="mt-8 mb-4 text-xl font-semibold text-white">
            {subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/">Choose your plan</Link>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}

export default TabBilling;
