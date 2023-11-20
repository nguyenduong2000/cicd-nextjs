'use client';

import './Table.css';
import * as yup from 'yup';

import { default as TableComponent } from '@/components/ui/Table';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useSupabase } from '@/app/supabase-provider';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import Button from '@/components/ui/Button';
import { EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import ControllerInput from '@/components/ui/FormController/ControllerInput';
import { useForm } from 'react-hook-form';
import ControllerSelect from '@/components/ui/FormController/ControllerSelect';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToastMessage } from '@/components/ui/ToastMessage';
import { cn, formatDecimalNumber } from '@/lib/utils';
import { optionsBrokerAccountSetting } from '../../utils/options';
import ControllerNumber from '@/components/ui/FormController/ControllerNumber';
import useSWR from 'swr';
import * as supabaseAccount from '../../service/supabase.service';
import {
  brokerAccountType,
  defaultBrokerAccount,
  handleTestRequired,
  options
} from '../../utils';
import {
  IBrokerAccount,
  IBrokers
} from '../../../scoreboard/[[...slug]]/utils/types';

interface IBrokerAndBrokerAccount {
  brokers: IBrokers[];
  brokerAccount: IBrokerAccount[];
}

function Table() {
  const {
    session: { user }
  } = useSupabase();
  const [open, setOpen] = useState(false);
  const [brokerName, setBrokerName] = useState('');
  const { openNotification } = useToastMessage();

  const isIB = brokerName === 'Interactive Brokers';
  const isTD = brokerName === 'TdAmeritrade';
  const isPaperMoney = brokerName === 'Paper Money';

  const yupBrokerAccount = yup.object().shape({
    broker_id: yup.string().required('Please select broker.'),
    type: yup.string().required('Please select type.'),
    account_amount: yup.number().required('Please input amount.'),
    ib_password: yup
      .string()
      .test(handleTestRequired('ib_password', isIB))
      .trim('Please remove the space')
      .strict(),
    ib_userid: yup
      .string()
      .test(handleTestRequired('ib_userid', isIB))
      .trim('Please remove the space')
      .strict(),
    ib_username: yup
      .string()
      .test(handleTestRequired('ib_username', isIB))
      .trim('Please remove the space')
      .strict(),
    td_account_id: yup
      .string()
      .test(handleTestRequired('td_account_id', isTD))
      .trim('Please remove the space')
      .strict(),
    td_account_key: yup
      .string()
      .test(handleTestRequired('td_account_key', isTD))
      .trim('Please remove the space')
      .strict(),
    td_account_token: yup
      .string()
      .test(handleTestRequired('td_account_token', isTD))
      .trim('Please remove the space')
      .strict(),
    amount: yup
      .string()
      .test(handleTestRequired('amount', isPaperMoney))
      .trim('Please remove the space')
      .strict(),
    id: yup.string().nullable()
  });

  const { control, reset, handleSubmit, watch, unregister, register } = useForm(
    {
      resolver: yupResolver(yupBrokerAccount),
      mode: 'onChange'
    }
  );
  type IBrokerAccOptional = yup.InferType<typeof yupBrokerAccount>;
  type IBrokerAccountYDto = Required<IBrokerAccOptional>;

  const {
    data: { brokers, brokerAccount },
    mutate
  } = useSWR<IBrokerAndBrokerAccount>(
    'api/broker-broker_account',
    async () => {
      const { data: brokers, error: errorBroker } =
        await supabaseAccount.getBroker();

      const { data: brokerAccount, error: errorAccount } =
        await supabaseAccount.initBrokerAccount(user.id);

      if (errorAccount || errorBroker) {
        throw errorAccount || errorBroker;
      }
      const extendBrokerAccount = brokerAccount.map((brokerAccount) => {
        const settings = JSON.parse(brokerAccount.decrypted_settings);
        return { ...brokerAccount, settings };
      });
      return {
        brokerAccount: extendBrokerAccount,
        brokers
      };
    },
    {
      fallbackData: {
        brokers: [],
        brokerAccount: []
      }
    }
  );

  const showModal = useCallback(
    async (brokerId?: string) => {
      if (brokerId) {
        const { broker_id, type, id, settings, amount, brokers } =
          brokerAccount.find((broker) => broker.id === brokerId);
        const resetData = {
          broker_id,
          type,
          id,
          account_amount: amount,
          ...settings
        };
        reset(resetData);
        setBrokerName(brokers.name);
      } else {
        reset(defaultBrokerAccount);
      }
      setOpen(true);
    },
    [brokerAccount, reset]
  );

  const onSubmit = async (data: IBrokerAccountYDto) => {
    const { broker_id, id, type, account_amount, ...rest } = data;
    const settings = JSON.stringify(rest);
    const formData: Partial<IBrokerAccount> = {
      broker_id,
      type,
      amount: account_amount,
      settings: settings as any,
      user_id: user.id
    };
    if (id) {
      //update
      const { error } = await supabaseAccount.updateBrokerAccount(formData, id);
      if (error) {
        openNotification('Update broker error', 'error');
        return;
      }
      openNotification('Update broker success', 'success');
    } else {
      //create
      const { error } = await supabaseAccount.createBrokerAccount(formData);
      if (error) {
        openNotification('Update broker error', 'error');
        return;
      }
      openNotification('Create broker success', 'success');
    }
    mutate();
    handleCancel();
  };

  const handleCancel = () => {
    setOpen(false);
    setBrokerName('');
  };

  const columns: ColumnsType<IBrokerAccount> = useMemo(
    () => [
      {
        title: 'Broker Type',
        dataIndex: 'type',
        key: 'type',
        render: (_text, record) => (
          <p className={'text-lg text-zinc-300'}>{record.type}</p>
        )
      },
      {
        title: 'Broker Name',
        dataIndex: 'brokers',
        key: 'brokers',
        render: (_text, record) => (
          <p className={'text-lg text-zinc-300'}>{record.brokers.name}</p>
        )
      },
      {
        title: 'Supported Type',
        dataIndex: 'brokers',
        key: 'brokers',
        render: (_text, record) => (
          <p className={'text-lg text-zinc-300'}>
            {record.brokers.supported_types}
          </p>
        )
      },
      {
        title: 'Settings',
        dataIndex: 'settings',
        key: 'settings',
        render: (_text, record) => {
          return optionsBrokerAccountSetting(record.brokers.name, record);
        }
      },
      {
        title: 'Amount',
        dataIndex: 'brokers',
        key: 'amout',
        render: (_text, record) => (
          <p className={'text-lg text-zinc-300'}>
            {record.amount && '$' + formatDecimalNumber(record.amount, 0)}
          </p>
        )
      },
      {
        title: 'Create At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (_text, record) => {
          const date = new Date(record.created_at);
          const createAt = dayjs(date).format('DD-MM-YYYY');
          return <p className={'text-lg text-zinc-300'}>{createAt}</p>;
        }
      },
      {
        title: 'Actions',
        key: 'action',
        render: (_text, record) => {
          return (
            <div className={'text-lg text-zinc-300'}>
              <Button
                variant="slim"
                onClick={() => showModal(record.id)}
                style={{ padding: '6px 12px' }}
              >
                <div className="flex gap-2">
                  Edit <EditOutlined />
                </div>
              </Button>
            </div>
          );
        }
      }
    ],
    [showModal]
  );

  const broker_id = watch('broker_id');
  // unregister unused data fields
  useEffect(() => {
    const broker = brokers.find((broker) => broker.id === broker_id);
    if (broker) {
      type KeyType = keyof typeof options;
      const keys = Object.keys(options) as Array<KeyType>;
      keys.forEach((key) => {
        if (key !== broker.name) {
          options[key].forEach((value) => {
            unregister(value);
          });
        } else {
          options[key].forEach((value) => {
            register(value);
          });
        }
      });
      setBrokerName(broker.name);
    }
  }, [brokers, register, unregister, broker_id]);

  return (
    <div className="mt-8 p-4">
      <div className="flex justify-end mb-6">
        <Button
          disabled={brokerAccount.length >= 6}
          onClick={() => showModal()}
          variant="slim"
          className="text-lg"
        >
          Create Broker Account
        </Button>
      </div>
      <div className="border border-zinc-700 broker-account-table">
        <TableComponent
          columns={columns}
          dataSource={brokerAccount}
          pagination={false}
          rowKey={'id'}
          scroll={{ x: 1000 }}
        />
        <Modal
          title="Save Broker Account"
          centered
          open={open}
          onCancel={handleCancel}
          maskClosable={false}
          width={900}
          footer={[]}
        >
          <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <WrapperForm name="Broker Account Type">
              <ControllerSelect
                control={control}
                name="type"
                placeholder="Select Type"
                data-testid="broker_type"
                options={brokerAccountType}
              />
            </WrapperForm>
            <WrapperForm name="Amount">
              <ControllerNumber
                control={control}
                name="account_amount"
                numericFormat={{
                  placeholder: 'Input Amount',
                  prefix: '$',
                  thousandSeparator: '.',
                  decimalSeparator: ',',
                  suffix: ''
                }}
              />
            </WrapperForm>
            <WrapperForm name="Brokers">
              <ControllerSelect
                control={control}
                name="broker_id"
                placeholder="Select Broker"
                options={brokers}
                pathLabel="name"
                pathValue="id"
                data-testid="brokers"
              />
            </WrapperForm>
            <div
              className={cn('invisible h-0', {
                'visible h-auto': brokerName === 'TdAmeritrade'
              })}
            >
              <WrapperForm name="TD Account ID">
                <ControllerInput
                  control={control}
                  placeholder="Input Account ID"
                  name="td_account_id"
                />
              </WrapperForm>
              <WrapperForm name="Account Key">
                <ControllerInput
                  control={control}
                  placeholder="Input Account Key"
                  name="td_account_key"
                />
              </WrapperForm>
              <WrapperForm name="Account Token">
                <ControllerInput
                  control={control}
                  placeholder="Input Account Token"
                  name="td_account_token"
                />
              </WrapperForm>
            </div>
            <div
              className={cn('invisible h-0', {
                'visible h-auto': brokerName === 'Interactive Brokers'
              })}
            >
              <WrapperForm name="IB User Name">
                <ControllerInput
                  control={control}
                  placeholder="Input User Name"
                  name="ib_username"
                />
              </WrapperForm>
              <WrapperForm name="IB User ID">
                <ControllerInput
                  control={control}
                  placeholder="Input User ID"
                  name="ib_userid"
                />
              </WrapperForm>
              <WrapperForm name="IB Password">
                <ControllerInput
                  control={control}
                  placeholder="Input IB Password"
                  name="ib_password"
                />
              </WrapperForm>
            </div>
            <div
              className={cn('invisible h-0', {
                'visible h-auto': brokerName === 'Paper Money'
              })}
            >
              <WrapperForm name="Amount">
                <ControllerInput
                  control={control}
                  placeholder="Input Amount"
                  name="amount"
                />
              </WrapperForm>
            </div>
            <div className="flex justify-end mt-5">
              <button
                onClick={handleCancel}
                type="button"
                className="w-24 min-w-0 mr-3 rounded border-none p-2 text-base font-normal text-white bg-gray-500 hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-24 min-w-0 rounded border-none p-2 text-base font-normal text-white bg-blue-700 hover:bg-blue-500"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}

interface IWrapperForm {
  name: string;
  children: ReactNode;
}

export const WrapperForm = ({ name, children }: IWrapperForm) => {
  return (
    <div className="grid grid-cols-12 items-center justify-between mt-2">
      <div className="col-span-12 lg:col-span-5">
        <h4 className="text-black text-lg">{name}</h4>
      </div>
      <div className="col-span-12 lg:col-span-7">{children}</div>
    </div>
  );
};

export default Table;
