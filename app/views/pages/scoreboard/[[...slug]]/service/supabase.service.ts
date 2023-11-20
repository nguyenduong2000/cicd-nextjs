import { supabaseAdmin } from '@/utils/supabase-admin';

// [GET]
export const getBrokerAccount = async (userId: string) => {
  const accountResponse = await supabaseAdmin
    .from('broker_accounts')
    .select('*,brokers(name),portfolios(*)')
    .eq('user_id', userId);
  return accountResponse;
};
// [GET]
export const getPortfolios = async (portfolioId: string) => {
  const portfoliosResponse = await supabaseAdmin
    .from('portfolio_trades')
    .select('*')
    .eq('portfolio_id', portfolioId);
  return portfoliosResponse;
};

export const getSecuritySymbol = async (limit = 8) => {
  const securitySymbolResponse = await supabaseAdmin
    .from('security_symbols')
    .select(
      `*,
    portfolio_trades(*)`
    )
    .limit(limit);
  return securitySymbolResponse;
};
