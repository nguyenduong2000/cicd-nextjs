'use client';

import Breadcrumbs from './feature/Breadcumbs/Breadcrumbs';
import ChartLine from './feature/Charts/ChartLine';
import OverviewTrading from './feature/OverviewTrading/OverviewTrading';
import TableCollapse from './feature/TableCollapse/TableCollapse';
import { useSupabase } from '@/app/supabase-provider';
import { IBrokerAccount, IPortfolioTrades } from './utils/types';
import useSWR from 'swr';
import * as supabasePortfolios from './service/supabase.service';

function Portfolio({ params: { slug } }: { params: { slug: string[] } }) {
  const [account_id] = slug || [];
  const {
    session: { user }
  } = useSupabase();
  const { data: brokerAccount } = useSWR<IBrokerAccount[]>(
    user.id ? '/api/broker_accounts/' : null,
    async () => {
      const { data, error } = await supabasePortfolios.getBrokerAccount(
        user.id
      );
      if (error) throw error;
      return data;
    },
    {
      fallbackData: []
    }
  );
  const hasAccount = brokerAccount.find((account) => account.id === account_id);
  const currentAccount = hasAccount ? hasAccount : brokerAccount[0];
  const portfolioId = currentAccount ? currentAccount.portfolios[0]?.id : '';

  const { data: portfolioTrades } = useSWR<IPortfolioTrades[]>(
    portfolioId ? '/api/portfolio_trades' : null,
    async () => {
      const { data, error } = await supabasePortfolios.getPortfolios(
        portfolioId
      );
      if (error) throw error;
      return data;
    }
  );

  return (
    <div className="bg-white min-h-[calc(100dvh-4rem)] md:min-h[calc(100dvh-5rem)] p-3 md:p-8">
      <div className="max-w-6xl px-3 md:px-6 mx-auto ">
        <Breadcrumbs />
        <div className="mt-3 md:mt-8">
          <OverviewTrading
            brokerAccount={brokerAccount}
            currentAccount={currentAccount}
          />
          {/* <div className="min-h-[600px]">
            {portfolioTrades && <ChartLine portfolioTrades={portfolioTrades} />}
          </div> */}
        </div>
        <div className="mt-5 md:mt-7">
          {portfolioId && <TableCollapse portfolioId={portfolioId} />}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
