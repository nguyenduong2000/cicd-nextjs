import { supabaseAdmin } from '@/utils/supabase-admin';
import { IStrategies } from '../[...slug]/utils/yupStrategies';

// [GET]
export const getStrategy = async (userId: string) => {
  const strategyResponse = await supabaseAdmin
    .from('strategy_settings')
    .select('*,broker_accounts(type)')
    .eq('user_id', userId);
  return strategyResponse;
};

// [GET]
export const getAccount = async (userId: string) => {
  const accountResponse = await supabaseAdmin
    .from('broker_accounts')
    .select('*,brokers(supported_types,name)')
    .eq('user_id', userId);
  return accountResponse;
};

// [POST]
export const createStrategy = async (formData: Partial<IStrategies>) => {
  const accountResponse = await supabaseAdmin
    .from('strategy_settings')
    .insert(formData);
  return accountResponse;
};

// [POST]
export const updateStrategy = async (
  formData: Partial<IStrategies>,
  strategyId: string
) => {
  const accountResponse = await supabaseAdmin
    .from('strategy_settings')
    .update(formData)
    .eq('id', strategyId);
  return accountResponse;
};

// [GET]
export const getOneStrategy = async (id: string) => {
  const strategyResponse = await supabaseAdmin
    .from('strategy_settings')
    .select('*')
    .eq('id', id)
    .single();
  return strategyResponse;
};

// [GET]
export const getRangeTrades = async (
  portfolioId: string,
  start: number,
  end: number
) => {
  const tradesResponse = await supabaseAdmin
    .from('portfolio_trades')
    .select('*,security_symbols(ticker)')
    .eq('portfolio_id', portfolioId)
    .gte('timestamp', start)
    .lte('timestamp', end);
  return tradesResponse;
};
