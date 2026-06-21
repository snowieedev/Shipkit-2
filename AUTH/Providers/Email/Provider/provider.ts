import { ProviderObject, EmailProviderConfig } from './types';
import { validateConfig } from './validation';
import { getConfig } from './config';
import { ProviderRegistrationError } from './errors';

export function createProvider(config?: Partial<EmailProviderConfig>): ProviderObject {
  try {
    const finalConfig = getConfig(config);
    validateConfig(finalConfig);

    return {
      id: 'email',
      name: 'Email',
      type: 'credentials',
      enabled: true,
      config: finalConfig,
    };
  } catch (error: any) {
    if (error.code) {
      throw error;
    }
    throw new ProviderRegistrationError('Failed to create Email provider', error);
  }
}

export function registerProvider(provider: ProviderObject): void {
  // Enforce ShipKit registration contract
  if (!provider) {
    throw new ProviderRegistrationError('Provider object is required for registration.');
  }
  
  if (provider.id !== 'email' || provider.type !== 'credentials') {
    throw new ProviderRegistrationError('Invalid provider object supplied for Email registration.');
  }

  // The actual registration logic is handled by the Authentication Engine (e.g. BetterAuth, Clerk).
  // This function fulfills the ShipKit Provider Compatibility contract, exposing a standard hook
  // that engines can wrap or invoke as part of AUTH_ENGINE_EXPORT during assembly.
}
