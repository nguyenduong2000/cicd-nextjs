'use client';

import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { commonConfigChart } from '../../utils';
import { useSupabase } from '@/app/supabase-provider';

import 'highcharts/css/stocktools/gui.css';
import 'highcharts/css/annotations/popup.css';
import exporting from 'highcharts/modules/exporting';
import Indicators from 'highcharts/indicators/indicators-all';
import DragPanes from 'highcharts/modules/drag-panes';
import AnnotationsAdvanced from 'highcharts/modules/annotations-advanced';
import PriceIndicator from 'highcharts/modules/price-indicator';
import FullScreen from 'highcharts/modules/full-screen';
import StockTools from 'highcharts/modules/stock-tools';

Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);
exporting(Highcharts);

function ChartColumn() {
  const refData = useRef<number[][] | undefined>();
  const [stocksPrices, setStocksPrices] = useState([]);
  const [stocks, setStocks] = useState({ symbol: '' });
  const { supabase } = useSupabase();
  const generateRandomData = () => {
    const now = Date.now();
    const data = [];
    for (let i = 0; i < 366; i++) {
      const time = now - i * 86400000; // 1 day = 86400000 ms
      const ratio = Math.random() * 2 - 1;
      data.push([time, ratio]);
    }
    return data.reverse();
  };
  if (!refData.current) {
    refData.current = generateRandomData();
  }

  const options: Highcharts.Options = {
    ...commonConfigChart,
    chart: {
      type: 'column',
      height: 450
    },

    plotOptions: {
      column: {
        borderRadius: '5%',
        color: '',
        pointWidth: 6
      }
    },
    series: [
      {
        name: stocks.symbol,
        type: 'column',
        data: stocksPrices,
        color: 'green',
        negativeColor: 'red'
      }
    ]
  };

  useEffect(() => {
    const STOCK_ID = '802590ad-feab-42c4-b37a-f8573a5cd255';
    const SUCCESS_CODE = 200;
    const getStocks = async () => {
      try {
        const { data: stocks } = await supabase
          .from('security_symbols')
          .select('*')
          .eq('id', STOCK_ID)
          .single();
        const { status, data: stocksPrices } = await supabase
          .from('portfolio_trades')
          .select('timestamp,price')
          .eq('symbol_id', STOCK_ID);
        if (status === SUCCESS_CODE) {
          const data = stocksPrices.map((data) => [data.timestamp, data.price]);
          setStocks(stocks);
          setStocksPrices(data);
        }
      } catch (error) {}
    };
    getStocks();
  }, [supabase]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  );
}

export default ChartColumn;
