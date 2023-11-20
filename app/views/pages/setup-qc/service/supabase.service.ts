import { supabaseAdmin } from '@/utils/supabase-admin';
import { ISetup } from '../utils/yupSetup';

// [GET]
export const getSetup = async (user_id: string) => {
  const portfoliosResponse = await supabaseAdmin
    .from('decrypted_qc_secrets')
    .select('*')
    .eq('user_id', user_id)
    .single();
  return portfoliosResponse;
};
// [PUT]
export const updateSetup = async ({ id, ...body }: ISetup) => {
  const portfoliosResponse = await supabaseAdmin
    .from('qc_secrets')
    .update(body)
    .eq('id', id);
  return portfoliosResponse;
};
// [PUT]
export const createSetup = async ({ id: _, ...body }: ISetup) => {
  const portfoliosResponse = await supabaseAdmin
    .from('qc_secrets')
    .insert(body);
  return portfoliosResponse;
};
