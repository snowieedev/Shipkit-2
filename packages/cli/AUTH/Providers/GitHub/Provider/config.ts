import { GitHubProviderConfig } from './types';
import { GitHubEnv } from './env';

export function createGitHubConfig(env: GitHubEnv, callbackUrl?: string): GitHubProviderConfig {
  return {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    callbackUrl,
  };
}
