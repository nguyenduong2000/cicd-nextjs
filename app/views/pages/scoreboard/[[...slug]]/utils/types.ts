export interface IPortfolioTrades {
  [x: string]: any;
  timestamp: number;
  ticker?: string;
  exchange?: string;
  name?: string;
  company_name?: string;
  price?: number;
  percent_change?: number;
  change?: number;
  shares?: number;
  average_cost?: number;
  total_cost?: number;
  market_value?: number;
  gain?: number;
  day_gain?: number;
  return?: number;
  last_price?: number;
  last_price_change?: number;
  amount_today?: number;
  amount_today_note?: string;
  percent_today?: number;
  percent_today_note?: string;
  total?: number;
  total_percent?: number;
  current_value?: number;
  percent_account?: number;
  quantity?: number;
  fees?: number;
  side?: number;
  traded_fund: number;
}

export interface IBrokerAccount {
  id: string;
  created_at: string;
  user_id: string;
  broker_id: string;
  amount: number;
  brokers: {
    name: string;
    supported_types: string;
  };
  settings: {
    td_account_id?: string;
    td_account_key?: string;
    td_account_token?: string;
    ib_username?: string;
    ib_userid?: string;
    ib_password?: string;
    amount?: string;
  };
  portfolios: IPortfolios[];
  type: string;
}

export interface IBrokers {
  id: string;
  created_at: string;
  supported_types: string;
  name: string;
}

export interface IPortfolios {
  id?: string;
  market_value: number;
  overall_return: number;
  overall_volumn: number;
  portfolio_cost: number;
  today: number;
  today_volumn: number;
  account_id: number;
  user_id: string;
}
