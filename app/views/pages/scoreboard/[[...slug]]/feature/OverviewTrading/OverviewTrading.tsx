'use client';

import { FormatNumberAndColor } from '@/components/ui/FormatNumberAndColor';
import { cn, formatDecimalNumber } from '@/lib/utils';
import { IBrokerAccount } from '../../utils/types';
import { useRouter } from 'next/navigation';

interface Props {
  brokerAccount: IBrokerAccount[];
  currentAccount: IBrokerAccount;
}
function OverviewTrading({ brokerAccount, currentAccount }: Props) {
  const router = useRouter();
  const pofolios = currentAccount ? currentAccount.portfolios : [];
  const [overviewTrading] = pofolios;

  const handleSetCurrentAccount = async (accountId: string) => {
    router.push(`/views/pages/scoreboard/${accountId}`);
  };

  return (
    <div>
      <div className="flex gap-5">
        {brokerAccount.map((account) => {
          return (
            <button
              onClick={() => handleSetCurrentAccount(account.id)}
              key={account.id}
              className={cn(
                'focus:ring-0 hover:bg-[#efefef] w-[200px] max-w-full border-2 border-gray-400 text-gray-900 min-h-[40px] rounded-[6px] text-[18px]',
                { 'bg-[#efefef]': currentAccount.id === account.id }
              )}
            >
              {account.brokers.name}
            </button>
          );
        })}
      </div>
      <div className="flex gap-[60px] my-10">
        <h2 className="text-[25px] text-gray-900 font-semibold">
          $ {formatDecimalNumber(overviewTrading?.portfolio_cost)}
        </h2>
        <div className="flex gap-5">
          <FormatNumberAndColor
            value={overviewTrading?.overall_volumn}
            after="%"
            className="text-[21px] bg-[#d9ead3] font-bold rounded-[6px] text-[#38761d] py-1 px-3"
          />
          <FormatNumberAndColor
            value={overviewTrading?.today}
            after="M"
            className="text-[21px] font-bold text-[#38761d] py-1 px-3"
          />
        </div>
      </div>
    </div>
  );
}

export default OverviewTrading;
