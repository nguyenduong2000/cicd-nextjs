import Highcharts from 'highcharts/highstock';

export const commonConfigChart: Highcharts.Options = {
  navigator: {
    enabled: false
  },
  scrollbar: {
    enabled: false
  },
  xAxis: {
    type: 'datetime',
    tickInterval: 30 * 24 * 3600 * 1000
  },
  yAxis: [
    {
      offset: 20,

      labels: {
        x: -15,
        style: {
          color: '#000',
          position: 'absolute'
        },
        align: 'left'
      }
    }
  ],
  tooltip: {
    shared: true,
    headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
  },
  rangeSelector: {
    inputEnabled: false,
    buttons: [
      {
        type: 'day',
        count: 1,
        text: '1D'
      },
      {
        type: 'day',
        count: 6,
        text: '7D'
      },
      {
        type: 'week',
        count: 4,
        text: '1M'
      },
      {
        type: 'month',
        count: 3,
        text: '3M'
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
        type: 'all',
        text: 'All'
      }
    ],
    selected: 2
  },
  stockTools: {
    gui: {
      enabled: true,
      buttons: [
        'fullScreen',
        'separator',
        'currentPriceIndicator',
        'lines',
        'crookedLines',
        'measure',
        'advanced',
        'toggleAnnotations',
        'simpleShapes',
        'separator',
        'verticalLabels',
        'flags'
      ]
    }
  }
};

export const charts = [
  {
    label: 'Area',
    value: 'area'
  },
  {
    label: 'Line',
    value: 'line'
  }
];

export const getWeek = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const startDate = new Date(now);
  const endDate = new Date(now);
  // compute start date (from monday current week)
  startDate.setDate(now.getDate() - (currentDay - 1));
  startDate.setHours(0, 0, 0, 0);
  // compute end date (from friday current week)
  endDate.setDate(now.getDate() - (currentDay - 5));
  endDate.setHours(23, 59, 59, 999);
  return {
    startDate,
    endDate
  };
};

export const tradesActions = [
  'BUY',
  'SELL SHORT',
  'SELL',
  'BUY COVER'
] as const;
