'use client';

import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import useSWR from 'swr';
//app
import { useSupabase } from '@/app/supabase-provider';
import { useToastMessage } from '@/components/ui/ToastMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import ControllerInput from '@/components/ui/FormController/ControllerInput';
import { ISetup, yupSetup } from '../utils/yupSetup';
import * as supabaseSetup from '../service/supabase.service';
import { IResponseSetup } from '../utils/type';

function FormSetup() {
  const { openNotification } = useToastMessage();
  const hasSetup = useRef(false);
  const {
    session: { user }
  } = useSupabase();

  const form = useForm({
    resolver: yupResolver(yupSetup),
    mode: 'onChange'
  });

  const { mutate: refetchSetup } = useSWR<IResponseSetup>(
    user.id ? '/api/setup' : null,
    async () => {
      const { data, error } = await supabaseSetup.getSetup(user.id);
      if (error) throw error;
      return data;
    },
    {
      onSuccess(data) {
        hasSetup.current = true;
        form.reset({
          id: data.id,
          qc_api_token: data.decrypted_qc_api_token,
          qc_api_user_id: data.decrypted_qc_api_user_id,
          qc_project_id: data.qc_project_id
        });
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const onSubmit = async (data: ISetup) => {
    try {
      const date = new Date();
      const formData = { ...data, user_id: user.id, modified_at: date };
      if (hasSetup.current) {
        //case update
        await supabaseSetup.updateSetup(formData);
      } else {
        //case create
        await supabaseSetup.createSetup(formData);
      }
      refetchSetup();
      openNotification('Save setup success.', 'success');
    } catch (error) {
      openNotification('Save setup error, please try again.', 'error');
    }
  };

  return (
    <form
      className="p-3 md:px-9 md:py-7"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="my-2">
        <h2 className="text-lg font-medium text-black">Setup</h2>
      </div>
      <div className="border-2 border-[#b3b3b3] p-3 md:px-9 md:py-7">
        <div className="mt-3 lg:pl-3">
          <div className="grid grid-cols-12 items-center justify-between mt-2">
            <div className="col-span-12 lg:col-span-7">
              <h4 className="text-black ">Project Id</h4>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <ControllerInput
                control={form.control}
                placeholder="Enter project Id"
                name="qc_project_id"
              />
            </div>
          </div>
        </div>
        <div className="mt-3 lg:pl-3">
          <div className="grid grid-cols-12 items-center justify-between mt-2">
            <div className="col-span-12 lg:col-span-7">
              <h4 className="text-black ">Api Token</h4>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <ControllerInput
                control={form.control}
                placeholder="Enter api token"
                name="qc_api_token"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 lg:pl-3">
          <div className="grid grid-cols-12 items-center justify-between mt-2">
            <div className="col-span-12 lg:col-span-7">
              <h4 className="text-black ">Api user Id</h4>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <ControllerInput
                control={form.control}
                placeholder="Enter api user Id"
                name="qc_api_user_id"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/views/pages/setup">
            <button
              type="button"
              className="w-24 min-w-0 mr-3 rounded border-none p-2 text-base font-normal text-white bg-gray-500 hover:bg-gray-400"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="w-24 min-w-0 rounded border-none p-2 text-base font-normal text-white bg-blue-700 hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormSetup;
