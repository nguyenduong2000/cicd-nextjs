'use client';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { commonConfigChart } from '../../utils';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/app/supabase-provider';

function ChartPercentageArea() {
  const [stockPricev1, setStockPricesV1] = useState([]);
  const [stockPricev2, setStockPricesV2] = useState([]);
  const [stockPricev3, setStockPricesV3] = useState([]);
  const [stockPricev4, setStockPricesV4] = useState([]);

  const [stocksV1, setStocksV1] = useState({ symbol: '' });
  const [stocksV2, setStocksV2] = useState({ symbol: '' });
  const [stocksV3, setStocksV3] = useState({ symbol: '' });
  const [stocksV4, setStocksV4] = useState({ symbol: '' });
  const { supabase } = useSupabase();
  const options: Highcharts.Options = {
    ...commonConfigChart,
    chart: {
      height: 450
    },
    yAxis: [
      {
        opposite: false,
        title: {
          useHTML: true,
          text: 'Market value'
        },
        offset: 25,
        labels: {
          x: 0,
          style: {
            color: '#000',
            position: 'absolute'
          },
          align: 'left'
        }
      }
    ],
    plotOptions: {
      series: {
        pointStart: 2012,
        showInNavigator: true,
        gapSize: 6
      },
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        }
      }
    },

    legend: {
      enabled: true
    },
    series: [
      {
        name: stocksV4.symbol,
        type: 'area',
        data: stockPricev4,
        color: '#3b4fb0'
      },
      {
        type: 'area',
        name: stocksV3.symbol,
        data: stockPricev3,
        color: '#2bc07b'
      },
      {
        type: 'area',
        name: stocksV2.symbol,
        data: stockPricev2,
        color: '#80bb40'
      },
      {
        type: 'area',
        name: stocksV1.symbol,
        data: stockPricev1,
        color: '#ffe834'
      }
    ]
  };

  useEffect(() => {
    const SUCCESS_CODE = 200;
    const stocksParams = [
      /*v1*/ 'ddfc08aa-7bc8-4d4b-992a-0aa9cc788d16',
      /*v2*/ '5219d2cc-676b-4fa2-a189-3eac13fa3fee',
      /*v3*/ 'b3de1e4a-47d9-450b-8819-5795f1498790',
      /*v4*/ '19e1bf17-336c-4a2a-a538-6d379f9ab1d8'
    ];
    const getStocks = async (stock_id: string) => {
      try {
        const { data: stocks } = await supabase
          .from('security_symbols')
          .select('*')
          .eq('id', stock_id)
          .single();
        const { status, data: stocksPricesV1 } = await supabase
          .from('portfolio_trades')
          .select('timestamp,price')
          .eq('symbol_id', stock_id);
        if (status === SUCCESS_CODE) {
          const data = stocksPricesV1.map((data) => [
            data.timestamp,
            data.price
          ]);
          return { stocks, data };
        }
      } catch (error) {}
    };

    const promise = stocksParams.map((param) => getStocks(param));
    Promise.all(promise).then((values) => {
      const [stock1, stock2, stock3, stock4] = values;
      setStockPricesV1(stock1.data);
      setStocksV1(stock1.stocks);
      setStockPricesV2(stock2.data);
      setStocksV2(stock2.stocks);
      setStockPricesV3(stock3.data);
      setStocksV3(stock3.stocks);
      setStockPricesV4(stock4.data);
      setStocksV4(stock4.stocks);
    });
  }, [supabase]);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  );
}

export default ChartPercentageArea;
