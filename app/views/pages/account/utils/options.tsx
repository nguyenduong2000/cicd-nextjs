import { IBrokerAccount } from '../../scoreboard/[[...slug]]/utils/types';

/**
 * @key Pass in the key of the option object (TdAmeritrade | Interactive Brokers | Paper Money)
 * @returns JSX
 */
export const optionsBrokerAccountSetting = (
  key: string,
  record: IBrokerAccount
) => {
  const option = {
    TdAmeritrade: (
      <>
        <div className={'text-md text-zinc-300'}>
          <span className="min-w-[110px] inline-block">TD Account ID:</span>
          <span className="text-sm text-zinc-500">
            {record.settings?.td_account_id}
          </span>
        </div>
        <div className={'text-md text-zinc-300'}>
          <span className="min-w-[110px] inline-block">Account Key:</span>
          <span className="text-sm text-zinc-500">
            {record.settings?.td_account_key}
          </span>
        </div>
        <div className={'text-md text-zinc-300'}>
          <span className="min-w-[110px] inline-block">Account Token:</span>
          <span className="text-sm text-zinc-500">
            {record.settings?.td_account_token}
          </span>
        </div>
      </>
    ),
    'Interactive Brokers': (
      <>
        <div className={'text-md text-zinc-300'}>
          <span className="min-w-[110px] inline-block">IB User Name:</span>
          <span className="text-sm text-zinc-500">
            {record.settings?.ib_username}
          </span>
        </div>
        <div className={'text-md text-zinc-300'}>
          <span className="min-w-[110px] inline-block">IB User ID:</span>
          <span className="text-sm text-zinc-500">
            {record.settings?.ib_userid}
          </span>
        </div>
        <div className={'text-md text-zinc-300'}>
          <span className="min-w-[110px] inline-block">IB Password:</span>
          <span className="text-sm text-zinc-500">
            {record.settings?.ib_password}
          </span>
        </div>
      </>
    ),
    'Paper Money': (
      <p className={'text-md text-zinc-300'}>
        <span className="min-w-[110px] inline-block"> Amount:</span>
        <span className="text-sm  text-zinc-500">
          {record.settings?.amount}
        </span>
      </p>
    ),
    default: <></>
  } as const;
  if (key in option && record.settings) {
    const newKey = key as keyof typeof option;
    return option[newKey];
  }
  return option['default'];
};
