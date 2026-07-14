
CREATE TABLE public.course_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  profession TEXT,
  order_number TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'eur',
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'paid',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_course_signups_email ON public.course_signups(email);

GRANT SELECT ON public.course_signups TO authenticated;
GRANT ALL ON public.course_signups TO service_role;

ALTER TABLE public.course_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view course signups"
  ON public.course_signups FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role manages course signups"
  ON public.course_signups FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);
