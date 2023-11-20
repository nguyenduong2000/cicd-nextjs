import { formatDecimalNumber } from '@/lib/utils';
import { Popover } from 'antd';
import './Table.css';
import { IPortfolioTrades } from '../../utils/types';
import { useEffect, useState } from 'react';
import { useSupabase } from '@/app/supabase-provider';
import Table from '@/components/ui/Table';
import { getSecuritySymbol } from '../../service/supabase.service';

const TableChart = () => {
  const { supabase } = useSupabase();
  const [dataTable, setDataTable] = useState([]);

  const columns: any = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.ticker.localeCompare(b.ticker),
      render: (_text: any, record: IPortfolioTrades) => (
        <>
          <div className={'font-bold'}>{record.ticker}</div>
          <div className={'text-xs text-gray-500'}>{record.exchange}</div>
        </>
      )
    },
    {
      title: 'Last Price',
      dataIndex: 'last_price',
      key: 'last_price',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.last_price - b.last_price,
      render: (text: any) => (text ? `$${formatDecimalNumber(text)}` : 'n/a')
    },
    {
      title: 'Last Price Change',
      dataIndex: 'last_price_change',
      key: 'last_price_change',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.last_price_change - b.last_price_change,
      render: (text: any) =>
        text ? (
          <div className={`${text >= 0 ? 'text-[#5BB981]' : 'text-[#D94159]'}`}>
            {text >= 0
              ? `+$${formatDecimalNumber(text)}`
              : `-$${formatDecimalNumber(text)}`}
          </div>
        ) : (
          'n/a'
        )
    },
    {
      title: "$ Today's Gain/Loss",
      dataIndex: 'amount_today',
      key: 'amount_today',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.amount_today - b.amount_today,
      render: (text: any, record: IPortfolioTrades) =>
        renderCell$WithNote(text, record.amount_today_note)
    },
    {
      title: "% Today's Gain/Loss",
      dataIndex: 'percent_today',
      key: 'percent_today',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.percent_today - b.percent_today,
      render: (text: any, record: IPortfolioTrades) =>
        renderCell$WithNote(text, record.percent_today_note)
    },
    {
      title: '$ Total Gain/Loss',
      dataIndex: 'total',
      key: 'total',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) => a.total - b.total,
      render: (text: any) =>
        text ? (
          <div className={`${text >= 0 ? 'text-[#5BB981]' : 'text-[#D94159]'}`}>
            {text >= 0
              ? `+$${formatDecimalNumber(text)}`
              : `-$${formatDecimalNumber(text)}`}
          </div>
        ) : (
          'n/a'
        )
    },
    {
      title: '% Total Gain/Loss',
      dataIndex: 'total_percent',
      key: 'total_percent',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.total_percent - b.total_percent,
      render: (text: any) =>
        text ? (
          <div className={`${text >= 0 ? 'text-[#5BB981]' : 'text-[#D94159]'}`}>
            {text >= 0
              ? `+${formatDecimalNumber(text)}%`
              : `-${formatDecimalNumber(text)}%`}
          </div>
        ) : (
          'n/a'
        )
    },
    {
      title: 'Current Value',
      dataIndex: 'current_value',
      key: 'current_value',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.current_value - b.current_value,
      render: (text: any) => (text ? `$${formatDecimalNumber(text)}` : 'n/a')
    },
    {
      title: '% of Account',
      dataIndex: 'percent_account',
      key: 'percent_account',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.percent_account - b.percent_account,
      render: (text: any) => (text ? `${formatDecimalNumber(text)}%` : 'n/a')
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.quantity - b.quantity
    },
    {
      title: 'Average Cost Basis',
      dataIndex: 'average_cost',
      key: 'average_cost',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.average_cost - b.average_cost,
      render: (text: any) => (text ? `$${formatDecimalNumber(text)}` : 'n/a')
    },
    {
      title: 'Cost Basis Total',
      dataIndex: 'total_cost',
      key: 'total_cost',
      align: 'right',
      width: '8%',
      sorter: (a: IPortfolioTrades, b: IPortfolioTrades) =>
        a.total_cost - b.total_cost,
      render: (text: any) => (text ? `$${formatDecimalNumber(text)}` : 'n/a')
    }
  ];

  const renderCell$WithNote = (text: any, note: string) => {
    if (note) {
      return text ? (
        <Popover
          content={note}
          title={'Note'}
          placement={'topRight'}
          trigger={'hover'}
        >
          <div
            className={`cell-noted ${
              text >= 0 ? 'text-[#5BB981]' : 'text-[#D94159]'
            }`}
          >
            {text >= 0
              ? `+$${formatDecimalNumber(text)}`
              : `-$${formatDecimalNumber(text)}`}
          </div>
        </Popover>
      ) : (
        'n/a'
      );
    } else {
      return text ? (
        <div className={`${text >= 0 ? 'text-[#5BB981]' : 'text-[#D94159]'}`}>
          {text >= 0
            ? `+$${formatDecimalNumber(text)}`
            : `-$${formatDecimalNumber(text)}`}
        </div>
      ) : (
        'n/a'
      );
    }
  };

  useEffect(() => {
    const getDataTable = async () => {
      const { data } = await getSecuritySymbol();
      if (data?.length) {
        const dataTableFormat = data.map((item) => {
          const rowTable = {
            ...item,
            id_company: item.id,
            ...item.portfolio_trades[0]
          };
          delete rowTable.portfolio_trades;
          return rowTable;
        });
        setDataTable(dataTableFormat);
      }
    };
    getDataTable();
  }, [supabase]);

  return (
    <div className={'p-2'}>
      <div className={'w-full bg-white'}>
        <Table
          columns={columns}
          dataSource={dataTable}
          pagination={false}
          className={'chart-table-2'}
          rowKey={'id_company'}
          scroll={{ x: 1400 }}
        />
      </div>
    </div>
  );
};

export default TableChart;
