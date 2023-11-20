'use client';
import { useToastMessage } from '@/components/ui/ToastMessage';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { useCallback, useEffect, useState } from 'react';

interface Props {
  userId: string;
}

const genarateRadom = () => {
  return {
    market_value: (Math.random() * 10).toFixed(2),
    overall_return: (Math.random() * 60).toFixed(2),
    portfolio_cost: (Math.random() * 2 - 10).toFixed(2),
    overall_volumn: (Math.random() * 20 - 100).toFixed(2),
    today: (Math.random() * 1 - 2).toFixed(2),
    today_volumn: (Math.random() * 40).toFixed(2)
  };
};

function GeneratePortfolio({ userId }: Props) {
  const [portfolios, setPortfolios] = useState([]);
  const { openNotification } = useToastMessage();
  const getBrokerAccount = useCallback(async () => {
    const { data } = await supabaseAdmin
      .from('decrypted_broker_accounts')
      .select('id')
      .eq('user_id', userId);
    const list =
      data &&
      data.map(({ id }) => {
        const item = { account_id: id, ...genarateRadom(), user_id: userId };
        return item;
      });
    setPortfolios(list);
    return data || [];
  }, [userId]);

  const onGeneratePortfolio = async () => {
    const { error } = await supabaseAdmin.from('portfolios').upsert(portfolios);
    if (error) {
      openNotification(error?.message, 'error');
      return;
    }
    openNotification('Generate success', 'success');
  };
  useEffect(() => {
    userId && getBrokerAccount();
  }, [getBrokerAccount, userId]);
  return (
    <div>
      <button onClick={onGeneratePortfolio} className=" bg-pink-500 my-2 p-2">
        Generate Portfolio
      </button>
    </div>
  );
}

export default GeneratePortfolio;
