import { ShipKitProvider, GoogleProviderConfig } from './types';
import { validateGoogleConfig } from './validation';
import { ProviderRegistrationError } from './errors';

export function createProvider(config: GoogleProviderConfig): ShipKitProvider {
  try {
    validateGoogleConfig(config);

    return {
      id: 'google',
      name: 'Google',
      type: 'oauth',
      enabled: true,
      config,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new ProviderRegistrationError('Failed to create Google provider', { error });
  }
}
