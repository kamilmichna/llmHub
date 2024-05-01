create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  name text,
  settings jsonb,

  primary key (id)
);

alter table public.profiles enable row level security;