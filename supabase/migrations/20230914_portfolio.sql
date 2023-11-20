-- step 1
create table
  public.brokers (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    name character varying null,
    supported_types character varying null,
    constraint brokers_pkey primary key (id)
  ) tablespace pg_default;
    alter table brokers enable row level security;
    CREATE POLICY "Enable read access for all users" ON public.brokers
    AS PERMISSIVE FOR ALL
    TO authenticated
    USING (true)

-- step 2.1
  insert into vault.secrets (secret)
  values ('s3kre3t_k3y') returning *;
-- step 2.2
create table
  public.broker_accounts (
   id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    user_id uuid null default auth.uid (),
    broker_id uuid null,
    type character varying null,
    settings text null,
    key_id uuid not null default 'get key from step 2.1'::uuid,
    nonce bytea default pgsodium.crypto_aead_det_noncegen(),
    amount numeric null,
    constraint broker_accounts_pkey primary key (id),
    constraint broker_accounts_broker_id_fkey foreign key (broker_id) references brokers (id)
  ) tablespace pg_default;
    alter table broker_accounts enable row level security;
    
    CREATE POLICY "Can view own user data." ON public.broker_accounts for select using (auth.uid() = user_id);
    CREATE POLICY "Can update own user data." ON public.broker_accounts for update using (auth.uid() = user_id);

  security label for pgsodium
    on column broker_accounts.settings
    is 'ENCRYPT WITH KEY COLUMN key_id ASSOCIATED (broker_id) NONCE nonce';

-- step 3
create table
  public.security_symbols (
    id uuid not null default gen_random_uuid (),
    ticker character varying null,
    exchange character varying null,
    price double precision null,
    constraint stock_company_pkey primary key (id)
  ) tablespace pg_default;
    alter table security_symbols enable row level security;
    CREATE POLICY "Can view own user data." ON public.security_symbols for select using (auth.uid() = id);
    CREATE POLICY "Can update own user data." ON public.security_symbols for update using (auth.uid() = id);

-- step 4
create table
  public.portfolios (
    id uuid not null default gen_random_uuid (),
    created_at timestamp with time zone not null default now(),
    today double precision null,
    overall_return double precision null,
    market_value double precision null,
    portfolio_cost double precision null,
    today_volumn real null,
    overall_volumn real null,
    user_id uuid null default auth.uid (),
    account_id uuid null,
    constraint overview_trading_pkey primary key (id),
    constraint portfolios_account_id_fkey foreign key (account_id) references broker_accounts (id)
  ) tablespace pg_default;
    alter table portfolios enable row level security;
    CREATE POLICY "Can view own user data." ON public.portfolios for select using (auth.uid() = user_id);
    CREATE POLICY "Can update own user data." ON public.portfolios for update using (auth.uid() = user_id);

-- step 5
create table
  public.portfolio_trades (
    id uuid not null default gen_random_uuid (),
    symbol_id uuid null,
    last_price double precision null,
    last_price_change double precision null,
    price double precision null,
    percent_change double precision null,
    change double precision null,
    shares double precision null,
    market_value double precision null,
    gain double precision null,
    day_gain double precision null,
    return double precision null,
    amount_today double precision null,
    percent_today double precision null,
    total double precision null,
    total_percent double precision null,
    current_value double precision null,
    percent_account double precision null,
    quantity double precision null,
    average_cost double precision null,
    total_cost double precision null,
    amount_today_note character varying null,
    percent_today_note character varying null,
    timestamp double precision null,
    fees double precision null,
    side double precision null,
    current_price double precision null,
    user_id uuid null default auth.uid (),
    portfolio_id uuid null,
    traded_fund double precision null,
    action text null,
    constraint stock_price_table_pkey primary key (id),
    constraint portfolio_trades_portfolio_id_fkey foreign key (portfolio_id) references portfolios (id),
    constraint portfolio_trades_symbol_id_fkey foreign key (symbol_id) references security_symbols (id)
  ) tablespace pg_default;
    alter table portfolio_trades enable row level security;
    CREATE POLICY "Can view own user data." ON public.portfolio_trades for select using (auth.uid() = user_id);
    CREATE POLICY "Can update own user data." ON public.portfolio_trades for update using (auth.uid() = user_id);

