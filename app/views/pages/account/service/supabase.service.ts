import { supabaseAdmin } from '@/utils/supabase-admin';
import { IBrokerAccount } from '../../scoreboard/[[...slug]]/utils/types';

export const getBroker = async () => {
  const responseBrokers = await supabaseAdmin.from('brokers').select('*');
  return responseBrokers;
};

// [GET]
export const getBrokerAccount = async (userId: string) => {
  const data = await supabaseAdmin
    .from('decrypted_broker_accounts')
    .select('*,brokers(supported_types,name)')
    .eq('user_id', userId);
  return data;
};

// [GET] or [POST]
export const initBrokerAccount = async (userId: string) => {
  const supabaseResponse = await getBrokerAccount(userId);
  const { data } = supabaseResponse;
  if (data && data.length > 0) {
    return supabaseResponse;
  }
  // if not have broker account, init new broker account with default value
  const { data: broker } = await supabaseAdmin
    .from('brokers')
    .select('id')
    .eq('name', 'Paper Money')
    .single();
  const initData = {
    amount: 100000,
    broker_id: broker.id,
    type: 'paper',
    user_id: userId
  };
  await supabaseAdmin.from('broker_accounts').insert(initData);
  const accountResponse = await getBrokerAccount(userId);
  return accountResponse;
};

// [POST]
export const updateBrokerAccount = async (
  formData: Partial<IBrokerAccount>,
  id: string
) => {
  const accountResponse = await supabaseAdmin
    .from('broker_accounts')
    .update(formData)
    .eq('id', id);
  return accountResponse;
};

// [POST]
export const createBrokerAccount = async (
  formData: Partial<IBrokerAccount>
) => {
  const accountResponse = await supabaseAdmin
    .from('broker_accounts')
    .upsert(formData, { onConflict: 'id' });
  return accountResponse;
};
