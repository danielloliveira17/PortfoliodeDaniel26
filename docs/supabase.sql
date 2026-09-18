-- ============================================================
-- MIGRAÇÃO PARA SUPABASE (PostgreSQL)
-- Execute este script inteiro no SQL Editor do Supabase
-- (Dashboard > SQL Editor > New query > Run)
-- ============================================================

-- 1) Tabela de perfis, ligada ao usuário do Supabase Auth
create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    nome text not null,
    email text,
    created_at timestamptz default now()
);

-- 2) Função executada automaticamente a cada novo usuário do Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    insert into public.profiles (id, nome, email)
    values (
        new.id,
        new.raw_user_meta_data ->> 'nome',
        new.email
    )
    on conflict (id) do nothing;

    return new;
end;
$$;

-- 3) Trigger: chama a função após INSERT em auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- 4) Row Level Security
alter table public.profiles enable row level security;

-- 5) Política: o usuário autenticado só enxerga o próprio perfil
drop policy if exists "Usuário pode ler o próprio perfil" on public.profiles;
create policy "Usuário pode ler o próprio perfil"
on public.profiles
for select
using (auth.uid() = id);

-- NOTA: NÃO existe política pública de INSERT/UPDATE.
-- O perfil é criado pelo trigger (security definer), que ignora a RLS.