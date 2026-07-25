-- Star Network Hub - adatbázis séma
-- Futtasd le a Supabase projekted "SQL Editor" fülén, egyben, egyszer.

-- 1) Profilok tábla: minden felhasználóhoz (auth.users) tartozik egy megjelenítendő név
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles: mindenki authentikált olvashatja" on public.profiles;
create policy "Profiles: mindenki authentikált olvashatja"
  on public.profiles for select
  to authenticated
  using (true);

drop policy if exists "Profiles: saját profil létrehozása/frissítése" on public.profiles;
create policy "Profiles: saját profil létrehozása/frissítése"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

drop policy if exists "Profiles: saját profil szerkesztése" on public.profiles;
create policy "Profiles: saját profil szerkesztése"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);


-- 2) Heti energiaszint check-in tábla
create table if not exists public.checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  week_start date not null,
  energy_level int not null check (energy_level between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, week_start)
);

alter table public.checkins enable row level security;

drop policy if exists "Checkins: mindenki authentikált olvashatja" on public.checkins;
create policy "Checkins: mindenki authentikált olvashatja"
  on public.checkins for select
  to authenticated
  using (true);

drop policy if exists "Checkins: saját beküldés létrehozása" on public.checkins;
create policy "Checkins: saját beküldés létrehozása"
  on public.checkins for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Checkins: saját beküldés frissítése" on public.checkins;
create policy "Checkins: saját beküldés frissítése"
  on public.checkins for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- updated_at automatikus frissítése
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_checkins_updated_at on public.checkins;
create trigger set_checkins_updated_at
  before update on public.checkins
  for each row execute function public.set_updated_at();

-- 3) Realtime: hogy a hétfő reggeli meeting alatt élőben frissüljön mindenkinél
do $$
begin
  alter publication supabase_realtime add table public.checkins;
exception
  when duplicate_object then null;
end $$;

-- 4) (Opcionális, de ajánlott) Új felhasználónál automatikusan létrejön egy üres profil sor,
--    amit az app az onboarding képernyőn tölt ki névvel.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, null)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
