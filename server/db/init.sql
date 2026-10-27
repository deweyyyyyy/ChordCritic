create table users (
  id bigint generated always as identity primary key,
  username text unique not null,
  email text unique not null,
  password_hash text not null,
  display_name text,
  created_at timestamptz default now()
);

create table albums (
  id text primary key,
  name text not null,
  artist text not null,
  image_url text,
  release_date text,
  rating_count int not null default 0,
  rating_sum numeric not null default 0
);

create table tracks (
  id text primary key,
  album_id text references albums(id),
  name text not null,
  artist text not null,
  image_url text,
  rating_count int not null default 0,
  rating_sum numeric not null default 0
);

create table reviews (
  id bigint generated always as identity primary key,
  user_id bigint not null references users(id) on delete cascade,
  album_id text references albums(id),
  track_id text references tracks(id),
  rating numeric(3,1) not null check (rating between 0.5 and 5 and rating % 0.5 = 0),
  body text,
  created_at timestamptz default now(),
  check ((album_id is null) <> (track_id is null))
);
