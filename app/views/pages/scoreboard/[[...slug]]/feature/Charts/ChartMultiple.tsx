'use client';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { commonConfigChart } from '../../utils';
// import ControllerSelect from '@/components/ui/FormController/ControllerSelect';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/app/supabase-provider';

function ChartMultiple() {
  const [stocksPricesV1, setStocksV1Prices] = useState([]);
  const [stocksPricesV2, setStocksV2Prices] = useState([]);
  const [stocksPricesV3, setStocksV3Prices] = useState([]);

  const [stocksV1, setStocksV1] = useState({ symbol: '' });
  const [stocksV2, setStocksV2] = useState({ symbol: '' });
  const [stocksV3, setStocksV3] = useState({ symbol: '' });

  const { supabase } = useSupabase();

  const { watch } = useForm({
    defaultValues: { chartType: 'area' }
  });

  const options: Highcharts.Options = {
    ...commonConfigChart,
    tooltip: {
      shape: 'rect',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6
      }
    },
    chart: {
      height: 450
    },
    series: [
      {
        type: watch('chartType') as any,
        name: stocksV3.symbol,
        color: '#00b061',
        data: stocksPricesV3
      },
      {
        type: 'column',
        color: '#8f684c',
        name: stocksV2.symbol,
        data: stocksPricesV2
      },
      {
        type: 'line',
        name: stocksV1.symbol,
        data: stocksPricesV1
      }
    ]
  };
  useEffect(() => {
    const stocksParams = [
      /*v1*/ 'fb889902-973f-4e64-8831-8c83ce0c91ff',
      /*v2*/ '9b62756f-6f6b-41b8-893c-d00afec9e221',
      /*v3*/ 'b317d1aa-c401-40fa-b38e-152b6f5f1aaa'
    ];

    const SUCCESS_CODE = 200;
    const getStocks = async (stock_id: string) => {
      try {
        const { data: stocks } = await supabase
          .from('security_symbols')
          .select('*')
          .eq('id', stock_id)
          .single();
        const { status, data: stocksPrices } = await supabase
          .from('portfolio_trades')
          .select('timestamp,price')
          .eq('symbol_id', stock_id);
        if (status === SUCCESS_CODE) {
          const data = stocksPrices.map((data) => [data.timestamp, data.price]);
          return { stocks, data };
        }
      } catch (error) {}
    };
    const promise = stocksParams.map((param) => getStocks(param));
    Promise.all(promise).then((values) => {
      const [stock1, stock2, stock3] = values;
      setStocksV1Prices(stock1.data);
      setStocksV1(stock1.stocks);
      setStocksV2Prices(stock2.data);
      setStocksV2(stock2.stocks);
      setStocksV3Prices(stock3.data);
      setStocksV3(stock3.stocks);
    });
  }, [supabase]);

  return (
    <>
      {/* <div className="px-2 pt-2 w-[120px] ">
        <ControllerSelect
          className="p-1"
          bordered
          control={control}
          name="chartType"
          options={charts}
        />
      </div> */}
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </>
  );
}

export default ChartMultiple;
