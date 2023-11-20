/**
* Note: This table contains strategy settings.
* Users should only be able to view and update their own data.
*/

create table
  public.strategy_settings (
    created_at timestamp with time zone not null default now(),
    strategy_name character varying null,
    timeframe bigint null,
    risk_ratio real null,
    max_profit real null,
    max_range real null,
    close_time time without time zone null,
    backtest_timeframes json null,
    min_range real null,
    min_daily real null,
    min_win_rate real null,
    type boolean null,
    exclude_symbols json null,
    include_symbols json null,
    strategy_group character varying null,
    user_id uuid not null default auth.uid (),
    id uuid not null default gen_random_uuid (),
    is_started boolean null,
    account_id uuid null,
    last_modified timestamp without time zone null,
    constraint strategies_pkey primary key (id),
    constraint strategy_settings_account_id_fkey foreign key (account_id) references broker_accounts (id)
  ) tablespace pg_default;

alter table strategy_settings enable row level security;
create policy "Can view own user data." on public.strategy_settings for select using (auth.uid() = user_id);
create policy "Can update own user data." on public.strategy_settings for update using (auth.uid() = user_id);