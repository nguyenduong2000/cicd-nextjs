import { Collapse } from 'antd';
import './TableCollapse.css';
import { formatDecimalNumber } from '@/lib/utils';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { FormatNumberAndColor } from '@/components/ui/FormatNumberAndColor';
import { IPortfolioTrades } from '../../utils/types';
import dayjs from 'dayjs';
import { getRangeTrades } from '@/app/views/pages/setup/service/supabase.service';
import useSWR from 'swr';
import { getWeek, tradesActions } from '../../utils';
interface Props {
  portfolioId: string;
}
function TableCollapse({ portfolioId }: Props) {
  const { data: dataTable } = useSWR(
    portfolioId ? 'api/getPortfolioTrades' : null,
    async () => {
      const { endDate, startDate } = getWeek();
      const groupedData = new Map();
      const { data, error } = await getRangeTrades(
        portfolioId,
        startDate.getTime(),
        endDate.getTime()
      );
      if (error) throw error;
      if (data) {
        data.forEach((portfolio: IPortfolioTrades) => {
          const { timestamp } = portfolio;
          const date = new Date(timestamp);
          const dateKey = dayjs(date).format('ddd, MMM YY'); // get day 'ddd, MMM YY'
          // create key with day
          if (!groupedData.has(dateKey)) {
            groupedData.set(dateKey, []);
          }
          // add timestamp fit day
          const newTimestamp = dayjs(date).format('HH:mm:ss');
          groupedData
            .get(dateKey)
            .push({ ...portfolio, timestamp: newTimestamp });
        });
      }
      const obj = Object.fromEntries(groupedData);
      const dataTable: [string, IPortfolioTrades][] = Object.entries(obj);
      // handle group data
      const dataTableFormat = dataTable.map(([date, portfolioTrades]) => {
        const totalTrades = portfolioTrades[0] || {};
        return {
          date,
          totalTrades,
          portfolioTrades
        };
      });
      return dataTableFormat;
    }
  );

  const [buyAction, sellShortAction] = tradesActions;
  return (
    <div className="table-trades">
      <h2 className="text-[25px] text-gray-900 font-semibold mb-4">Trades</h2>
      <div className="grid grid-cols-8 text-gray-600 font-semibold text-[18px] border-b-[#ccc] border-b-[1px] p-3 ">
        <p className="uppercase col-span-3">Date</p>
        <p className="uppercase col-span-1">Gain %</p>
        <p className="uppercase col-span-2">Gain</p>
        <p className="uppercase col-span-2">Traded fund</p>
      </div>
      <div className="overflow-auto">
        {dataTable instanceof Array &&
          dataTable.map((trades, index) => {
            const { portfolioTrades, totalTrades, date } = trades;
            return (
              <Collapse
                defaultActiveKey={['0']}
                key={index}
                bordered={false}
                className="wrap-collapse"
                expandIconPosition="end"
                expandIcon={({ isActive }) =>
                  isActive ? (
                    <UpOutlined style={{ fontSize: '20px' }} />
                  ) : (
                    <DownOutlined style={{ fontSize: '20px' }} />
                  )
                }
                items={[
                  {
                    key: index,
                    label: (
                      <div className="grid grid-cols-8 text-gray-600 text-[18px] font-semibold">
                        <p className="col-span-3">{date}</p>
                        <div className="col-span-1">
                          <FormatNumberAndColor
                            value={totalTrades?.traded_fund / totalTrades?.gain}
                            className="font-bold"
                            after="%"
                          />
                        </div>
                        <div className="col-span-2">
                          <FormatNumberAndColor
                            value={totalTrades?.gain}
                            before="$"
                          />
                        </div>
                        <p className="col-span-2 text-black">
                          ${formatDecimalNumber(totalTrades?.traded_fund)}
                        </p>
                      </div>
                    ),
                    children: (
                      <div>
                        <div className="grid grid-cols-8 text-[17px] uppercase px-3 font-semibold">
                          <p data-testid="time-collapse">time</p>
                          <p>symbol</p>
                          <p>action</p>
                          <p>qty</p>
                          <p>price</p>
                          <p>value</p>
                          <p>gain</p>
                          <p>gain %</p>
                        </div>
                        {portfolioTrades.map((portfolio_trades: any) => {
                          const {
                            id,
                            security_symbols,
                            price,
                            quantity,
                            gain,
                            current_value,
                            timestamp,
                            action
                          } = portfolio_trades;
                          const isHiddenGain =
                            action === buyAction || action === sellShortAction;
                          return (
                            <div
                              key={id}
                              className="grid grid-cols-8 text-[18px] border-t-[1px] border-t-[#ccc] hover:bg-[#efefef] px-4"
                            >
                              <p className="py-2">{timestamp}</p>
                              <p className="py-2">{security_symbols?.ticker}</p>
                              <p className="py-2">{action}</p>
                              <p className="py-2">
                                {formatDecimalNumber(quantity, 0)}
                              </p>
                              <p className="py-2">
                                ${formatDecimalNumber(price)}
                              </p>
                              <p className="py-2">
                                ${formatDecimalNumber(current_value)}
                              </p>
                              <div className="py-2">
                                {!isHiddenGain && (
                                  <FormatNumberAndColor
                                    value={gain}
                                    className="font-semibold"
                                    before="$"
                                  />
                                )}
                              </div>
                              <div className="py-2">
                                {!isHiddenGain && (
                                  <FormatNumberAndColor
                                    value={gain}
                                    className="font-semibold"
                                    after="%"
                                    decimalAmount={0}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )
                  }
                ]}
              />
            );
          })}
      </div>
    </div>
  );
}

export default TableCollapse;
