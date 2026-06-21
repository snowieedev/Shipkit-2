import { GoogleProviderConfig } from './types';
import { GoogleEnv } from './env';

export function createGoogleConfig(env: GoogleEnv, callbackUrl?: string): GoogleProviderConfig {
  return {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackUrl,
  };
}
