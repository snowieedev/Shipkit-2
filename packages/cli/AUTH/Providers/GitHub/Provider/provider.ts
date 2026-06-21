import { ShipKitProvider, GitHubProviderConfig } from './types';
import { validateGitHubConfig } from './validation';
import { ProviderRegistrationError } from './errors';

export function createProvider(config: GitHubProviderConfig): ShipKitProvider {
  try {
    validateGitHubConfig(config);

    return {
      id: 'github',
      name: 'GitHub',
      type: 'oauth',
      enabled: true,
      config,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new ProviderRegistrationError('Failed to create GitHub provider', { error });
  }
}
