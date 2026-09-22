
create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    nome text not null,
    email text,
    created_at timestamptz default now()
);


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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists "Usuário pode ler o próprio perfil" on public.profiles;
create policy "Usuário pode ler o próprio perfil"
on public.profiles
for select
using (auth.uid() = id);
