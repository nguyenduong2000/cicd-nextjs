'use client';

import {
  ITradingExecution,
  yupTradingExecution
} from './utils/yupTradingExecution';
import { useSupabase } from '@/app/supabase-provider';
import { useToastMessage } from '@/components/ui/ToastMessage';
// import { supabaseAdmin } from '@/utils/supabase-admin';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import ControllerInput from '@/components/ui/FormController/ControllerInput';
import ControllerDatePicker from '@/components/ui/FormController/ControllerDatePicker';
import ControllerRadioGroup from '@/components/ui/FormController/ControllerRadioGroup';
import { typeActiveStatus } from '@/app/views/pages/trading-execution/utils';
import ControllerNumber from '@/components/ui/FormController/ControllerNumber';

const TradingExecution = () => {
  const { openNotification } = useToastMessage();
  const { supabase } = useSupabase();
  const refUserId = useRef<string | undefined>(undefined);
  const refIsUpdate = useRef<boolean>(false);
  const refCallAPI = useRef<boolean>(false);

  const form = useForm<ITradingExecution>({
    resolver: yupResolver(yupTradingExecution),
    mode: 'onChange'
  });

  const handleFinish = async (body: ITradingExecution) => {
    const formatedData: any = {
      ...body,
      start_time: dayjs(body.start_time.toString()).format(
        'YYYY-MM-DD HH:mm:ssZ'
      )
      // end_time: dayjs(body.start_time.toString()).format('YYYY-MM-DD HH:mm:ssZ')
    };
    try {
      if (!refIsUpdate.current) {
        alert(JSON.stringify(formatedData, null, 2));
        // create
      } else {
        // update
      }
    } catch (error) {}
  };
  useEffect(() => {
    const getUserAndTrategy = async () => {
      if (!refCallAPI.current) {
        try {
          const res = await supabase.auth.getUser();
          const userId = res.data.user?.id;
          refUserId.current = userId;
          const strategyData = await supabase
            .from('strategy_settings')
            .select('strategy_name')
            .eq('user_id', userId)
            .single();
          if (strategyData.data) {
            // refIsUpdate.current = true;
            form.setValue('strategy_name', strategyData.data.strategy_name);
          } else {
            const { error } = strategyData;
            openNotification(error.message, 'error');
          }
        } catch (error) {}
      }
    };
    getUserAndTrategy();
    refCallAPI.current = true;
  }, [form, openNotification, supabase]);

  return (
    <div className="max-w-6xl px-3 md:px-6 mx-auto my-4 bg-white mt-4">
      <form
        className="p-3 md:px-9 md:py-7"
        onSubmit={form.handleSubmit(handleFinish)}
      >
        <div className="border-2 border-[#b3b3b3] p-3 md:px-9 md:py-7">
          <>
            <div className="my-4">
              <h2 className="border-b-2 border-[#2a2a2a] text-lg font-medium text-black">
                Trading Execution
              </h2>
            </div>

            <div className="mt-3 lg:pl-3">
              <div className="grid grid-cols-12 items-center justify-between mt-2">
                <div className="col-span-12 lg:col-span-7">
                  <h4 className="text-black ">Trading Strategy</h4>
                </div>
                <div className="col-span-12 lg:col-span-5">
                  <ControllerInput
                    control={form.control}
                    placeholder="Enter trading strategy"
                    name="strategy_name"
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 lg:pl-3">
              <div className="grid grid-cols-12 items-center justify-between mt-2">
                <div className="col-span-12 lg:col-span-7">
                  <h4 className="text-black col-span-12 lg:col-span-7">
                    Start time
                  </h4>
                </div>
                <div className="col-span-12 lg:col-span-5">
                  <ControllerDatePicker
                    control={form.control}
                    name="start_time"
                    classInput="py-1 px-2 w-full"
                    placeholder="Select start time"
                    showTime
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 lg:pl-3">
              <div className="grid grid-cols-12 items-center justify-between mt-2">
                <div className="col-span-12 lg:col-span-7">
                  <h4 className="text-black col-span-12 lg:col-span-7">
                    Active status
                  </h4>
                </div>
                <div className="col-span-12 lg:col-span-5">
                  <ControllerRadioGroup
                    control={form.control}
                    options={typeActiveStatus}
                    name="active_status"
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 lg:pl-3">
              <div className="grid grid-cols-12 items-center justify-between mt-2">
                <div className="col-span-12 lg:col-span-7">
                  <h4 className="text-black col-span-12 lg:col-span-7">
                    Fund amount
                  </h4>
                </div>
                <div className="col-span-12 lg:col-span-5">
                  <ControllerNumber
                    control={form.control}
                    name="fund_amount"
                    inputProps={{ placeholder: 'Enter fund amount' }}
                    numericFormat={{ suffix: '' }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-3 lg:pl-3">
              <div className="grid grid-cols-12 items-center justify-between mt-2">
                <div className="col-span-12 lg:col-span-7">
                  <h4 className="text-black">Source of fund</h4>
                </div>
                <div className="col-span-12 lg:col-span-5">
                  <ControllerInput
                    control={form.control}
                    placeholder="Enter source of fund"
                    name="fund_source"
                  />
                </div>
              </div>
            </div>
          </>
          <div className="flex justify-center mt-4">
            <button
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
        </div>
      </form>
    </div>
  );
};

export default TradingExecution;
