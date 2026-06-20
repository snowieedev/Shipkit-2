import fs from 'fs';
import path from 'path';

export async function provisionDatabase(options: any) {
  const supabaseDir = path.join(process.cwd(), 'supabase');
  const migrationsDir = path.join(supabaseDir, 'migrations');

  if (!fs.existsSync(supabaseDir)) fs.mkdirSync(supabaseDir);
  if (!fs.existsSync(migrationsDir)) fs.mkdirSync(migrationsDir);

  const timestamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
  const migrationFile = path.join(migrationsDir, `${timestamp}_auth_schema.sql`);

  const sql = `-- ShipKit Authentication Schema (Generated)
-- Users Table
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  name TEXT,
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  provider TEXT,
  provider_id TEXT
);

-- Sessions Table
CREATE TABLE public.sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Verification Tokens
CREATE TABLE public.verification_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

-- Password Reset Tokens
CREATE TABLE public.password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);

-- Indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_sessions_token ON public.sessions(token);
CREATE INDEX idx_verification_tokens_token ON public.verification_tokens(token);
CREATE INDEX idx_password_reset_tokens_token ON public.password_reset_tokens(token);
`;

  fs.writeFileSync(migrationFile, sql);
}
