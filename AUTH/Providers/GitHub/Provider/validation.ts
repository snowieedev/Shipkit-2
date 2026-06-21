import { GitHubProviderConfig } from './types';
import { OAuthConfigurationError, ValidationError } from './errors';

export function validateGitHubConfig(config: GitHubProviderConfig): void {
  if (!config) {
    throw new ValidationError('Provider configuration is required');
  }

  if (!config.clientId || typeof config.clientId !== 'string') {
    throw new OAuthConfigurationError('Valid clientId is required for GitHub provider');
  }

  if (!config.clientSecret || typeof config.clientSecret !== 'string') {
    throw new OAuthConfigurationError('Valid clientSecret is required for GitHub provider');
  }

  if (config.callbackUrl !== undefined && typeof config.callbackUrl !== 'string') {
    throw new OAuthConfigurationError('callbackUrl must be a string if provided');
  }
}
