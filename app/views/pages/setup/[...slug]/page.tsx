'use client';

import Setup from './feature/Setup/Setup';
import SymbolPicking from './feature/SymbolPicking/SymbolPicking';
import { groups } from './utils';
import { IStrategies, yupStrategies } from './utils/yupStrategies';
import { useSupabase } from '@/app/supabase-provider';
import ControllerInput from '@/components/ui/FormController/ControllerInput';
import ControllerSelect from '@/components/ui/FormController/ControllerSelect';
import { useToastMessage } from '@/components/ui/ToastMessage';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UPDATE } from '../utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  updateStrategy,
  createStrategy,
  getOneStrategy
} from '../service/supabase.service';
import useSWR from 'swr';

const Strategy = ({ params }: { params: { slug: string[] } }) => {
  const router = useRouter();
  const [type, id] = params.slug;
  const isUpdate = type === UPDATE;
  const { openNotification } = useToastMessage();
  const {
    session: { user }
  } = useSupabase();

  const form = useForm({
    resolver: yupResolver(yupStrategies),
    mode: 'onChange'
  });
  const handleFinish = async ({ account_id, ...strategy }: IStrategies) => {
    const last_modified = new Date().toISOString();
    const body = { ...strategy, last_modified };

    try {
      // create
      if (!isUpdate) {
        const formData = { user_id: user.id, ...body };
        const { error } = await createStrategy(formData);
        if (error) {
          openNotification(error.message, 'error');
          return;
        }
        // update
      } else {
        const { error } = await updateStrategy(body, id);
        if (error) {
          openNotification(error.message, 'error');
          return;
        }
      }
      openNotification('Save strategies success', 'success');
      router.push('/views/pages/setup');
    } catch (error) {}
  };
  useSWR(id ? 'api/getStrategy' : null, async () => {
    const { data, error } = await getOneStrategy(id);
    if (error) throw error;
    form.reset(data);
  });

  return (
    <div className="max-w-6xl px-3 md:px-6 mx-auto my-4 bg-white mt-4 strategy_add">
      <form
        className="p-3 md:px-9 md:py-7"
        onSubmit={form.handleSubmit(handleFinish)}
      >
        <div className="border-2 border-[#b3b3b3] p-3 md:px-9 md:py-7">
          <div>
            <div className="mb-4">
              <h2 className="border-b-2 border-[#2a2a2a] text-lg font-medium text-black">
                Strategy
              </h2>
            </div>
            <div className="lg:pl-3">
              <div className="grid grid-cols-12 items-center justify-between">
                <p className="text-black col-span-12 lg:col-span-5">Group</p>
                <div className="col-span-12 lg:col-span-7">
                  <div className="w-full text-black bg-transparent outline-none">
                    <ControllerSelect
                      options={groups}
                      control={form.control}
                      placeholder="Select strategy group"
                      name="strategy_group"
                      data-testid="strategy_group"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 items-center justify-between mt-2">
                <p className="text-black col-span-12 lg:col-span-5">Name</p>
                <div className="col-span-12 lg:col-span-7">
                  <ControllerInput
                    control={form.control}
                    name="strategy_name"
                  />
                </div>
              </div>
            </div>
          </div>
          <Setup form={form} />
          <SymbolPicking form={form} />
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
    </div>
  );
};

export default Strategy;
