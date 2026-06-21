import { GoogleProviderConfig } from './types';
import { OAuthConfigurationError, ValidationError } from './errors';

export function validateGoogleConfig(config: GoogleProviderConfig): void {
  if (!config) {
    throw new ValidationError('Provider configuration is required');
  }

  if (!config.clientId || typeof config.clientId !== 'string') {
    throw new OAuthConfigurationError('Valid clientId is required for Google provider');
  }

  if (!config.clientSecret || typeof config.clientSecret !== 'string') {
    throw new OAuthConfigurationError('Valid clientSecret is required for Google provider');
  }

  if (config.callbackUrl !== undefined && typeof config.callbackUrl !== 'string') {
    throw new OAuthConfigurationError('callbackUrl must be a string if provided');
  }
}
