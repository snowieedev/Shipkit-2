import { Provider } from '../types';
import { validateProvider } from '../validation';
import { ProviderError, normalizeError } from '../errors';

export class ProviderRegistry {
  private providers: Map<string, Provider> = new Map();

  public register(provider: Provider): void {
    try {
      validateProvider(provider);
      if (this.providers.has(provider.id)) {
        throw new ProviderError(`Provider with id "${provider.id}" is already registered.`);
      }
      this.providers.set(provider.id, provider);
    } catch (error) {
      throw normalizeError(error);
    }
  }

  public getProvider(id: string): Provider {
    const provider = this.providers.get(id);
    if (!provider) {
      throw new ProviderError(`Provider with id "${id}" not found.`);
    }
    return provider;
  }

  public getAllProviders(): Provider[] {
    return Array.from(this.providers.values());
  }

  public getEnabledProviders(): Provider[] {
    return this.getAllProviders().filter(p => p.enabled);
  }
}
