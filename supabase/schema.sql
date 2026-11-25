CREATE TABLE public.titles (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  media_type TEXT NOT NULL,
    CHECK (media_type IN ('Movie', 'TV Show')),
  release_year INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);