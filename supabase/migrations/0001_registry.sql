-- Create Registry Features Table
CREATE TABLE IF NOT EXISTS public.registry_features (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  version TEXT NOT NULL,
  description TEXT,
  author TEXT NOT NULL,
  manifest JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.registry_features ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to prevent conflicts
DROP POLICY IF EXISTS "Allow public read access to registry features" ON public.registry_features;
DROP POLICY IF EXISTS "Allow service_role write access to registry features" ON public.registry_features;

-- Allow public read access to registry features (anyone can browse the registry)
CREATE POLICY "Allow public read access to registry features" ON public.registry_features
  FOR SELECT USING (true);

-- Allow only administrators / service_role key to manage registry features
CREATE POLICY "Allow service_role write access to registry features" ON public.registry_features
  FOR ALL TO service_role USING (true);

-- Insert initial registry features (seeding the data)
INSERT INTO public.registry_features (id, name, version, description, author, manifest)
VALUES 
  (
    'feat_auth_01', 
    'auth', 
    '1.0.0', 
    'Complete authentication system with email/password and OAuth support.', 
    'shipkit',
    '{"dependencies": ["lucide-react", "clsx"], "files": [{"path": "src/components/ui/button.tsx", "url": "https://raw.githubusercontent.com/shipkit/features/main/auth/button.tsx"}]}'::jsonb
  ),
  (
    'feat_billing_01', 
    'billing', 
    '1.2.0', 
    'Stripe integration with checkout and subscription management.', 
    'shipkit',
    '{"dependencies": ["stripe", "@stripe/stripe-js"], "files": [{"path": "src/lib/stripe.ts", "url": "https://raw.githubusercontent.com/shipkit/features/main/billing/stripe.ts"}]}'::jsonb
  ),
  (
    'feat_logger_01', 
    'logger', 
    '2.0.0', 
    'Advanced structured logging middleware for API routes.', 
    'community',
    '{"dependencies": ["pino"], "files": [{"path": "src/middleware/logger.ts", "url": "https://raw.githubusercontent.com/shipkit/features/main/logger/logger.ts"}]}'::jsonb
  )
ON CONFLICT (name) DO UPDATE 
SET version = EXCLUDED.version,
    description = EXCLUDED.description,
    author = EXCLUDED.author,
    manifest = EXCLUDED.manifest;
