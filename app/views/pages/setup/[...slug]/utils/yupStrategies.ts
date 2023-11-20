import * as yup from 'yup';

const yupStrategies = yup.object().shape({
  timeframe: yup.number().required('Please enter timeframe.'),
  risk_ratio: yup.number().required('Please enter risk ratio.'),
  max_profit: yup.number().required('Please enter max profit.'),
  max_range: yup.number().required('Please enter max range.'),
  min_range: yup.number().required('Please enter min range.'),
  min_daily: yup.number().required('Please enter min daily profit.'),
  min_win_rate: yup.number().required('Please enter min win rate.'),
  strategy_group: yup
    .string()
    .required('Please choose strategy group.')
    .default(''),
  strategy_name: yup
    .string()
    .required('Please enter strategy name.')
    .default(''),
  close_time: yup.string().required('Please enter closing time.').default(''),
  backtest_timeframes: yup
    .array()
    .min(1, 'Please choose backtest timeframes.')
    .default([]),
  exclude_symbols: yup.array().default([]),
  include_symbols: yup.array().default([]),
  type: yup.boolean().required('Please choose use win rate.'),
  is_started: yup.boolean().nullable().default(false),
  id: yup.string(),
  account_id: yup.string().nullable().default(''),
  user_id: yup.string().nullable(),
  last_modified: yup.string().nullable().default('')
});

export type IStrategies = yup.InferType<typeof yupStrategies>;

export { yupStrategies };
