'use client';
import { useToastMessage } from '@/components/ui/ToastMessage';
import { supabaseAdmin } from '@/utils/supabase-admin';
import { useEffect, useRef, useState } from 'react';
import { tradesActions } from '../../../scoreboard/[[...slug]]/utils';

const genarateRadom = () => {
  // Sinh số ngẫu nhiên từ 0 đến (độ dài của mảng - 1)
  const randomIndex = Math.floor(Math.random() * tradesActions.length);

  return {
    last_price: Math.floor(Math.random() * 9000),
    last_price_change: Math.floor(Math.random() * 2000),
    percent_change: Math.floor(Math.random() * 2000) - 100,
    change: Math.floor(Math.random() * 20000) - 1000,
    shares: Math.floor(Math.random() * 10),
    market_value: Math.floor(Math.random() * 4000),
    gain: Math.floor(Math.random() * 200000) - 10000,
    day_gain: Math.floor(Math.random() * 200000) - 10000,
    return: Math.floor(Math.random() * 20000) - 100,
    amount_today: Math.floor(Math.random() * 40000),
    percent_today: Math.floor(Math.random() * 20000) - 1000,
    total: Math.floor(Math.random() * 30000),
    total_cost: Math.floor(Math.random() * 80000),
    total_percent: Math.floor(Math.random() * 200000) - 1000,
    current_value: Math.floor(Math.random() * 100000),
    current_price: Math.floor(Math.random() * 100000),
    percent_account: Math.floor(Math.random() * 20000) - 100,
    quantity: Math.floor(Math.random() * 90000),
    average_cost: Math.floor(Math.random() * 70000),
    traded_fund: Math.floor(Math.random() * 70000),
    action: tradesActions[randomIndex],
    amount_today_note: 'Morbi vel lectus in quam fringilla rhoncus.',
    percent_today_note: 'In hac habitasse platea dictumst.'
  };
};

interface Props {
  userId: string;
}
function GenerateTrades({ userId }: Props) {
  const { openNotification } = useToastMessage();
  const refSymbolId = useRef<string | null>(null);
  const [tradesData, setTradesData] = useState([]);
  const user_id = userId;

  const onSubmit = async () => {
    const { error } = await supabaseAdmin
      .from('portfolio_trades')
      .upsert(tradesData)
      .eq('symbol_id', refSymbolId.current);
    if (error) {
      openNotification(error?.message, 'error');
      return;
    }
    openNotification('Generate success', 'success');
  };
  useEffect(() => {
    const getSymbols = async () => {
      const { data } = await supabaseAdmin
        .from('security_symbols')
        .select('id');
      if (data) {
        refSymbolId.current = data[data.length - 1].id;
      }
    };
    getSymbols();
  }, []);
  useEffect(() => {
    function createData(portfolio_id: number) {
      const data = [];
      const currentDate = new Date();

      for (let day = 0; day < 100; day++) {
        currentDate.setHours(0, 0, 0, 0);
        let valueForWeekend = null;

        if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
          valueForWeekend = data[data.length - 1].price;
        } else {
          valueForWeekend = null;
        }

        for (let hour = 0; hour < 24; hour++) {
          const timestamp = currentDate.getTime() + hour * 3600 * 1000;
          const price: number =
            valueForWeekend !== null
              ? valueForWeekend
              : Math.floor(Math.random() * (100001 - 70000) + 70000);
          const listRadom = genarateRadom();
          data.push({
            ...listRadom,
            timestamp,
            symbol_id: refSymbolId.current,
            user_id,
            price,
            portfolio_id
          });
        }
        currentDate.setDate(currentDate.getDate() + 1); // next day
      }
      return data;
    }
    const getPortfolios = async () => {
      const { data } = await supabaseAdmin
        .from('portfolios')
        .select('id')
        .eq('user_id', user_id);
      const tradeData = data.map(({ id }) => {
        return createData(id);
      });
      const flattenedArray = tradeData.reduce(
        (acc: any, curr) => acc.concat(curr),
        []
      );
      setTradesData(flattenedArray);
    };
    user_id && getPortfolios();
  }, [user_id]);

  return (
    <div className="">
      <button onClick={onSubmit} className=" bg-pink-500 my-2 p-2">
        Generate Portfolio Trades
      </button>
    </div>
  );
}

export default GenerateTrades;
