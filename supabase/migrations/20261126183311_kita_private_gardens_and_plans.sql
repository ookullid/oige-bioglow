create table public.kita_gardens (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 name text not null check (char_length(btrim(name)) between 1 and 80),
 plants text[] not null default '{}' check (cardinality(plants)<=500 and array_position(plants,null) is null and char_length(array_to_string(plants,','))<=60500),
 settings jsonb not null default '{}' check (jsonb_typeof(settings)='object' and octet_length(settings::text)<=4096),
 revision integer not null default 1 check(revision>0),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 unique(id,user_id)
);
create table public.kita_garden_plans (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 garden_id uuid not null,
 name text not null check (char_length(btrim(name)) between 1 and 80),
 snapshot jsonb not null check (jsonb_typeof(snapshot)='object' and octet_length(snapshot::text)<=150000),
 created_at timestamptz not null default now(),
 foreign key(garden_id,user_id) references public.kita_gardens(id,user_id) on delete cascade
);
create index kita_gardens_owner_idx on public.kita_gardens(user_id);
create index kita_plans_owner_garden_idx on public.kita_garden_plans(user_id,garden_id);
alter table public.kita_gardens enable row level security;
alter table public.kita_garden_plans enable row level security;
revoke all on public.kita_gardens,public.kita_garden_plans from public,anon,authenticated;
grant select,insert,update,delete on public.kita_gardens to authenticated;
grant select,insert,delete on public.kita_garden_plans to authenticated;
create policy kita_gardens_select on public.kita_gardens for select to authenticated using ((select auth.uid())=user_id);
create policy kita_gardens_insert on public.kita_gardens for insert to authenticated with check ((select auth.uid())=user_id);
create policy kita_gardens_update on public.kita_gardens for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy kita_gardens_delete on public.kita_gardens for delete to authenticated using ((select auth.uid())=user_id);
create policy kita_plans_select on public.kita_garden_plans for select to authenticated using ((select auth.uid())=user_id);
create policy kita_plans_insert on public.kita_garden_plans for insert to authenticated with check ((select auth.uid())=user_id);
create policy kita_plans_delete on public.kita_garden_plans for delete to authenticated using ((select auth.uid())=user_id);
