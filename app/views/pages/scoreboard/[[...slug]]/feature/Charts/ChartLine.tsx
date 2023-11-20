'use client';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { formatDecimalNumber } from '@/lib/utils';
import { IPortfolioTrades } from '../../utils/types';
import { memo } from 'react';

interface Props {
  portfolioTrades: IPortfolioTrades[];
}
function ChartLine({ portfolioTrades }: Props) {
  const trades = portfolioTrades
    ? portfolioTrades.map((price) => {
        return [price.timestamp, price.price];
      })
    : [];

  const getPlotsBands = (timestamp: number[][]) => {
    const plotBands: { color: string; from: number; to: number }[] = [];
    timestamp.forEach((data) => {
      const date = new Date(data[0]);
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        plotBands.push({
          color: 'rgba(130, 130, 130, 0.1)',
          from: data[0],
          to: data[0] + 60 * 60 * 1000
        });
      }
    });
    return plotBands;
  };
  const plotBands = getPlotsBands(trades);

  const options: Highcharts.Options = {
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      tickInterval: 7 * 24 * 3600 * 1000 * 4,
      plotBands
    },

    rangeSelector: {
      inputEnabled: false,
      buttonSpacing: 25,
      buttonTheme: {
        states: {
          select: {
            fill: 'white',
            style: {
              color: '#333',
              fontWeight: 'bold',
              textDecoration: 'underline'
            }
          }
        },
        fill: 'white',
        style: {
          color: 'black',
          fontSize: '18px',
          textDecoration: 'none'
        }
      },

      buttons: [
        {
          type: 'day',
          count: 1,
          text: '1D'
        },
        {
          type: 'day',
          count: 5,
          text: '5D'
        },
        {
          type: 'month',
          count: 1,
          text: '1M'
        },
        {
          type: 'month',
          count: 6,
          text: '6M'
        },
        {
          type: 'ytd',
          count: 1,
          text: 'YTD'
        },
        {
          type: 'year',
          count: 1,
          text: '1Y'
        },
        {
          type: 'year',
          count: 5,
          text: '5Y'
        },
        {
          type: 'all',
          text: 'MAX'
        }
      ],
      selected: 1
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6
      }
    },
    yAxis: [
      {
        opposite: false,
        offset: 75,
        labels: {
          x: 0,
          style: {
            color: '#000',
            position: 'absolute',
            fontSize: '18px'
          },
          align: 'left',
          formatter: function () {
            return formatDecimalNumber(this.value as number, 0);
          }
        }
      }
    ],
    chart: {
      height: 600
    },
    series: [
      {
        name: 'name',
        type: 'line',
        lineWidth: 2,
        color: 'black',
        connectNulls: true,
        marker: {
          symbol: 'diamond'
        },
        data: trades,
        pointInterval: 24 * 3600 * 1000,
        tooltip: {
          valueDecimals: 2,
          headerFormat:
            '<span style="font-size:12px"><b>{point.key}</b></span><br>'
        }
      }
    ]
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={options}
    />
  );
}

export default memo(ChartLine);
