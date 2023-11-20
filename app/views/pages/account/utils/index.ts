export const options = {
  TdAmeritrade: ['td_account_id', 'td_account_key', 'td_account_token'],
  'Interactive Brokers': ['ib_username', 'ib_userid', 'ib_password'],
  'Paper Money': ['amount']
} as const;

export const handleTestRequired = (
  name: string,
  condition: boolean,
  message: string = 'Please input this field'
) => {
  return {
    name,
    message,
    test: (value: string) => {
      return !condition || (condition && value !== '' && value !== undefined);
    }
  };
};

export const brokerAccountType = [
  {
    value: 'paper',
    label: 'Paper'
  },
  {
    value: 'money',
    label: 'Money'
  }
];

export const defaultBrokerAccount = {
  id: null,
  broker_id: null,
  type: null,
  amout: 0,
  amount: '',
  ib_password: '',
  ib_userid: '',
  ib_username: '',
  td_account_id: '',
  td_account_key: '',
  td_account_token: ''
} as any;
