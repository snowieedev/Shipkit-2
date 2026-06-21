import { ValidationError } from './errors';

export interface GitHubEnv {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

export function validateGitHubEnv(env: Record<string, string | undefined>): GitHubEnv {
  const clientId = env.GITHUB_CLIENT_ID;
  const clientSecret = env.GITHUB_CLIENT_SECRET;

  if (!clientId) {
    throw new ValidationError('Missing required environment variable: GITHUB_CLIENT_ID');
  }

  if (!clientSecret) {
    throw new ValidationError('Missing required environment variable: GITHUB_CLIENT_SECRET');
  }

  return {
    GITHUB_CLIENT_ID: clientId,
    GITHUB_CLIENT_SECRET: clientSecret,
  };
}
