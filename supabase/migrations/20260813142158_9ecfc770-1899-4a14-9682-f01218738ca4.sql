CREATE TABLE public.game_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id text NOT NULL UNIQUE,
  card_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  dice_state jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.game_sessions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.game_sessions TO authenticated;
GRANT ALL ON public.game_sessions TO service_role;

ALTER TABLE public.game_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read game sessions by device id"
  ON public.game_sessions FOR SELECT USING (true);
CREATE POLICY "Anyone can create game sessions"
  ON public.game_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update game sessions"
  ON public.game_sessions FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Anyone can delete game sessions"
  ON public.game_sessions FOR DELETE USING (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_game_sessions_updated_at
BEFORE UPDATE ON public.game_sessions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();