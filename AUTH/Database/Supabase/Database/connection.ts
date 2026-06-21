import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DatabaseConnectionError } from './errors';

let supabaseInstance: SupabaseClient | null = null;

export async function connect(): Promise<SupabaseClient> {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw DatabaseConnectionError('SUPABASE_URL environment variable is missing');
  }

  const key = supabaseServiceRoleKey || supabaseAnonKey;

  if (!key) {
    throw DatabaseConnectionError('SUPABASE_ANON_KEY or SUPABASE_SERVICE_ROLE_KEY environment variable is missing');
  }

  try {
    supabaseInstance = createClient(supabaseUrl, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
    return supabaseInstance;
  } catch (error) {
    throw DatabaseConnectionError(error);
  }
}

export async function disconnect(): Promise<void> {
  supabaseInstance = null;
}
