'use client';

import './Table.css';
import Button from '@/components/ui/Button';
import {
  CloseCircleOutlined,
  EditOutlined,
  LineChartOutlined,
  LoadingOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { default as TableComponent } from '@/components/ui/Table';
import { IStrategies } from '../../[...slug]/utils/yupStrategies';
import { useSupabase } from '@/app/supabase-provider';
import Link from 'next/link';
import { UPDATE } from '../../utils';
import { useToastMessage } from '@/components/ui/ToastMessage';
import { Modal } from 'antd';
import ControllerSelect from '@/components/ui/FormController/ControllerSelect';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { IBrokerAccount } from '../../../scoreboard/[[...slug]]/utils/types';
import strategyService, { ILiveStrategy } from '../../service/strategy.service';
import useSWR from 'swr';
import * as supabaseStrategy from '../../service/supabase.service';
import { cn } from '@/lib/utils';

export interface ExtralTrategies extends IStrategies {
  broker_accounts: {
    type: string;
  };
}
function Table() {
  const {
    session: { user }
  } = useSupabase();
  const { openNotification } = useToastMessage();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [liveLoading, setLiveLoading] = useState<string | null>(null);
  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        account_id: yup.string().required('Please select broker account.'),
        strategy_id: yup.string()
      })
    )
  });

  const { data: brokerAccount } = useSWR<IBrokerAccount[]>(
    user.id ? '/api/broker_accounts' : null,
    async () => {
      const { data, error } = await supabaseStrategy.getAccount(user.id);
      if (error) throw error;
      return data;
    }
  );

  const { data: strategies, mutate: mutateStratey } = useSWR<ExtralTrategies[]>(
    user.id ? '/api/strategy_settings' : null,
    async () => {
      const { data, error } = await supabaseStrategy.getStrategy(user.id);
      if (error) throw error;
      return data;
    }
  );

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSwitch = async (id: string, rest?: IStrategies) => {
    let is_started;
    try {
      const last_modified = new Date().toISOString();
      const currentStrategy = strategies.find((strategy) => strategy.id === id);
      const {
        user_id: _,
        is_started: __,
        id: strategyId,
        ...strategy
      } = currentStrategy;

      const body: ILiveStrategy = {
        userId: user.id,
        last_modified,
        strategyId,
        ...strategy,
        ...rest
      };
      let res;
      is_started = currentStrategy.is_started;
      if (is_started) {
        res = await strategyService.stopStrategy(user.id, strategyId);
      } else {
        res = await strategyService.startStrategy(body);
      }
      await mutateStratey();
      openNotification('Save success', 'success');
    } catch (error) {
      const message = `${
        is_started ? 'Stop' : 'Start'
      } trategy error, please try later!`;
      openNotification(message, 'error');
    }
  };

  const handleOpenModalStart = async (id: string, account_id: string) => {
    setDisabled(!!account_id);
    reset({ strategy_id: id, account_id });
    setOpen(true);
  };

  const handleStop = async (id: string) => {
    setLiveLoading(id);

    await handleSwitch(id);
    setLiveLoading(null);
  };

  const handleStart = async (props: {
    account_id: string;
    strategy_id: string;
  }) => {
    const { account_id, strategy_id } = props;
    setLiveLoading(strategy_id);
    await handleSwitch(strategy_id, {
      account_id
    });
    setLiveLoading(null);
    handleCancel();
  };

  const columns: ColumnsType<ExtralTrategies> = [
    {
      title: 'Name',
      dataIndex: 'strategy_name',
      key: 'strategy_name',
      render: (_text) => <p className={'text-lg text-zinc-300'}>{_text}</p>
    },
    {
      title: 'Algorithm',
      dataIndex: 'strategy_group',
      key: 'strategy_group',
      render: (_text) => <p className={'text-lg text-zinc-300'}>{_text}</p>
    },
    {
      title: 'Broker Account',
      dataIndex: 'broker_accounts',
      key: 'broker_accounts',
      render: (_text, record) => (
        <p className={'text-lg text-zinc-300'}>
          {record.broker_accounts?.type}
        </p>
      )
    },
    {
      title: 'Last Modified',
      dataIndex: 'last_modified',
      key: 'last_modified',
      render: (_text) => (
        <p className={'text-lg text-zinc-300'}>
          {dayjs(_text).format('YYYY-MM-DD HH:mm')}
        </p>
      )
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_text, record, index) => {
        const isLoading = liveLoading === record.id;
        return (
          <div className={'text-lg flex gap-3'}>
            {!record.is_started && (
              <>
                <button
                  data-testid={index === 0 && 'btn-start'}
                  onClick={() =>
                    handleOpenModalStart(record.id, record.account_id)
                  }
                  className={cn(
                    'p-[6px_12px] bg-white text-[#19b10a] border border-[#19b10a] font-medium rounded-[4px] hover:border-white hover:bg-zinc-800 hover:text-white ',
                    {
                      'btn-start': index === 0
                    }
                  )}
                >
                  <div className="flex gap-2 ">
                    <span>Start</span> <PlayCircleOutlined />
                  </div>
                </button>
                <Link href={`/views/pages/setup/${UPDATE}/${record.id}`}>
                  <Button
                    variant="slim"
                    style={{
                      padding: '6px 12px',
                      borderRadius: '4px',
                      height: '100%'
                    }}
                  >
                    <div className="flex gap-2">
                      Edit <EditOutlined />
                    </div>
                  </Button>
                </Link>
              </>
            )}
            {record.is_started && (
              <>
                <button
                  disabled={isLoading}
                  onClick={() => handleStop(record.id)}
                  className={cn(
                    'p-[6px_12px] relative bg-white text-red-500 border border-red-500 font-medium rounded-[4px] hover:border-white hover:bg-zinc-800 hover:text-white',
                    {
                      'btn-stop': index === 0,
                      'bg-[#d9d9d9] text-[#00000040] border-gray-600 hover:text-[#00000040] hover:border-gray-600 hover:bg-[#d9d9d9] cursor-not-allowed':
                        isLoading
                    }
                  )}
                >
                  <div className="flex gap-2 items-center ">
                    {isLoading && (
                      <LoadingOutlined
                        className="absolute"
                        style={{ fontSize: '26px', color: '#000' }}
                      />
                    )}
                    <span>Stop</span> <CloseCircleOutlined />
                  </div>
                </button>
                <Link href={`/views/pages/scoreboard/${record.account_id}`}>
                  <button className="p-[6px_12px] bg-white text-[#19b10a] border border-[#19b10a] font-medium rounded-[4px] hover:border-white hover:bg-zinc-800 hover:text-white ">
                    <div className="flex gap-2 ">
                      Porfolio <LineChartOutlined />
                    </div>
                  </button>
                </Link>
              </>
            )}
          </div>
        );
      }
    }
  ];

  const currentStrategyId = watch('strategy_id');
  const isLoadingStart = liveLoading === currentStrategyId;
  return (
    <div>
      <div className="flex justify-end mb-6">
        <Link href="/views/pages/setup/add">
          <Button variant="slim" className="text-lg">
            Add Strategy
          </Button>
        </Link>
      </div>
      <div className="strategy-table border border-zinc-700">
        <TableComponent
          columns={columns}
          dataSource={strategies}
          pagination={false}
          rowKey={'id'}
          scroll={{ x: 1100 }}
        />
      </div>
      <Modal
        title="Select Broker Account"
        centered
        open={open}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[]}
      >
        <form onSubmit={handleSubmit(handleStart)}>
          <div className="my-6">
            <h2 className="font-medium text-xl">Broker Account</h2>
            <ControllerSelect
              disabled={disabled}
              control={control}
              options={brokerAccount}
              pathLabel="type"
              pathValue="id"
              name="account_id"
              data-testid="select_account"
            />
          </div>
          <div className="flex justify-end mt-5">
            <button
              disabled={isLoadingStart}
              onClick={handleCancel}
              type="button"
              className="w-24 min-w-0 mr-3 rounded border-none p-2 text-base font-normal text-white bg-gray-500 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={cn(
                'w-24 min-w-0 relative rounded border-none p-2 text-base font-normal text-white bg-blue-700 hover:bg-blue-500',
                {
                  'bg-[#d9d9d9] text-[#00000040] border-gray-600 hover:text-[#00000040] hover:border-gray-600 hover:bg-[#d9d9d9] cursor-not-allowed':
                    isLoadingStart
                }
              )}
              disabled={isLoadingStart}
            >
              {isLoadingStart && (
                <LoadingOutlined
                  className="absolute"
                  style={{ fontSize: '26px', color: '#000' }}
                />
              )}
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Table;
