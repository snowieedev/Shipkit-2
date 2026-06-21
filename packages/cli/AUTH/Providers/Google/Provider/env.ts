import { ValidationError } from './errors';

export interface GoogleEnv {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
}

export function validateGoogleEnv(env: Record<string, string | undefined>): GoogleEnv {
  const clientId = env.GOOGLE_CLIENT_ID;
  const clientSecret = env.GOOGLE_CLIENT_SECRET;

  if (!clientId) {
    throw new ValidationError('Missing required environment variable: GOOGLE_CLIENT_ID');
  }

  if (!clientSecret) {
    throw new ValidationError('Missing required environment variable: GOOGLE_CLIENT_SECRET');
  }

  return {
    GOOGLE_CLIENT_ID: clientId,
    GOOGLE_CLIENT_SECRET: clientSecret,
  };
}
