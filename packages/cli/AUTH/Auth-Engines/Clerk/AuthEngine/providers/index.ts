import { validateProvider } from '../validation';
import type { ShipKitProvider } from '../types';
import { ProviderError } from '../errors';

export class ProviderRegistry {
  private providers: Map<string, ShipKitProvider> = new Map();

  public register(provider: ShipKitProvider): void {
    try {
      validateProvider(provider);
      this.providers.set(provider.id, provider);
    } catch (error: any) {
      throw new ProviderError(`Failed to register provider: ${error.message}`);
    }
  }

  public get(id: string): ShipKitProvider {
    const provider = this.providers.get(id);
    if (!provider) {
      throw new ProviderError(`Provider with id ${id} not found.`);
    }
    return provider;
  }

  public getAll(): ShipKitProvider[] {
    return Array.from(this.providers.values());
  }
}
