-- ============================================================
-- NutriPlan Tracker — esquema inicial
-- Ejecutar en SQL editor de Supabase (proyecto vacío).
-- ============================================================

-- Extensiones
create extension if not exists "pgcrypto";

-- ============================================================
-- TABLAS
-- ============================================================

-- Perfil (1:1 con auth.users)
create table if not exists public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text,
  display_name    text,
  role            text not null default 'user' check (role in ('user','master')),
  age             int,
  sex             text check (sex in ('male','female','other')),
  height_cm       numeric,
  weight_kg       numeric,
  activity_level  text check (activity_level in ('sedentary','light','moderate','active','very_active')),
  goal            text check (goal in ('lose','maintain','gain')),
  target_kcal     int,
  active_plan_id  uuid,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Alimentos (admin master; semilla desde data/seedFoods.js)
create table if not exists public.foods (
  id               uuid primary key default gen_random_uuid(),
  emoji            text,
  name             text not null,
  category         text,
  grams_per_unit   numeric,
  cooking_factor   numeric not null default 1,
  kcal             numeric not null,
  protein          numeric not null default 0,
  carbs            numeric not null default 0,
  fat              numeric not null default 0,
  is_custom        boolean not null default false,
  created_by       uuid references public.profiles(id) on delete set null,
  created_at       timestamptz not null default now()
);

-- Planes preestablecidos
create table if not exists public.plans (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  target_kcal   int not null,
  description   text,
  is_published  boolean not null default false,
  created_by    uuid references public.profiles(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.profiles
  add constraint profiles_active_plan_fk
  foreign key (active_plan_id) references public.plans(id) on delete set null;

-- Items dentro de un plan
create table if not exists public.plan_items (
  id           uuid primary key default gen_random_uuid(),
  plan_id      uuid not null references public.plans(id) on delete cascade,
  food_id      uuid not null references public.foods(id),
  meal         text not null check (meal in ('desayuno','colacion_am','almuerzo','merienda','cena','colacion_pm')),
  input_type   text not null check (input_type in ('units','weight')),
  input_value  numeric not null check (input_value > 0),
  position     int not null default 0
);

create index if not exists idx_plan_items_plan on public.plan_items(plan_id);

-- Cumplimiento diario
create table if not exists public.daily_logs (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  date        date not null,
  meal        text not null,
  completed   boolean not null default false,
  difficulty  int check (difficulty between 1 and 5),
  notes       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, date, meal)
);

create index if not exists idx_daily_logs_user_date on public.daily_logs(user_id, date);

-- ============================================================
-- TRIGGER: crear profile al registrarse
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- updated_at automático
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists trg_profiles_updated  on public.profiles;
create trigger trg_profiles_updated  before update on public.profiles  for each row execute function public.set_updated_at();
drop trigger if exists trg_plans_updated     on public.plans;
create trigger trg_plans_updated     before update on public.plans     for each row execute function public.set_updated_at();
drop trigger if exists trg_logs_updated      on public.daily_logs;
create trigger trg_logs_updated      before update on public.daily_logs for each row execute function public.set_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles    enable row level security;
alter table public.foods       enable row level security;
alter table public.plans       enable row level security;
alter table public.plan_items  enable row level security;
alter table public.daily_logs  enable row level security;

-- Helper: ¿el usuario actual es master?
create or replace function public.is_master()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select role = 'master' from public.profiles where id = auth.uid()), false);
$$;

-- ----- profiles -----
drop policy if exists "profile_self_read"   on public.profiles;
drop policy if exists "profile_self_update" on public.profiles;
drop policy if exists "profile_master_all"  on public.profiles;

create policy "profile_self_read"   on public.profiles for select using (auth.uid() = id);
create policy "profile_self_update" on public.profiles for update using (auth.uid() = id);
create policy "profile_master_all"  on public.profiles for all    using (public.is_master()) with check (public.is_master());

-- ----- foods -----
drop policy if exists "foods_read_auth"     on public.foods;
drop policy if exists "foods_master_write"  on public.foods;
create policy "foods_read_auth"    on public.foods for select using (auth.role() = 'authenticated');
create policy "foods_master_write" on public.foods for all    using (public.is_master()) with check (public.is_master());

-- ----- plans -----
drop policy if exists "plans_read_auth"     on public.plans;
drop policy if exists "plans_master_write"  on public.plans;
create policy "plans_read_auth"    on public.plans for select using (auth.role() = 'authenticated' and (is_published or public.is_master()));
create policy "plans_master_write" on public.plans for all    using (public.is_master()) with check (public.is_master());

-- ----- plan_items -----
drop policy if exists "plan_items_read_auth"    on public.plan_items;
drop policy if exists "plan_items_master_write" on public.plan_items;
create policy "plan_items_read_auth"    on public.plan_items for select using (
  auth.role() = 'authenticated'
  and exists (select 1 from public.plans p where p.id = plan_items.plan_id and (p.is_published or public.is_master()))
);
create policy "plan_items_master_write" on public.plan_items for all    using (public.is_master()) with check (public.is_master());

-- ----- daily_logs -----
drop policy if exists "logs_self_all"     on public.daily_logs;
drop policy if exists "logs_master_read"  on public.daily_logs;
create policy "logs_self_all"    on public.daily_logs for all    using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "logs_master_read" on public.daily_logs for select using (public.is_master());

-- ============================================================
-- POST-INSTALACIÓN
-- 1) Registrar al usuario master vía la app (signup normal).
-- 2) Marcarlo como master:
--    update public.profiles set role='master' where email='hernestoc2000@gmail.com';
-- ============================================================
