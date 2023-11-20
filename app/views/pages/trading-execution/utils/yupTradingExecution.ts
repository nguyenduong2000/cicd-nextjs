import * as yup from 'yup';

const yupTradingExecution = yup.object().shape({
  strategy_name: yup
    .string()
    .required('Please enter strategy name.')
    .default(''),
  start_time: yup.mixed().required('Please enter start time.'),
  active_status: yup.boolean(),
  fund_amount: yup.number().required('Please enter fund amount.'),
  fund_source: yup.string().required('Please enter fund source')
});

export type ITradingExecution = yup.InferType<typeof yupTradingExecution>;

export { yupTradingExecution };
