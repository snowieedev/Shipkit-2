import { ProviderRegistry } from '../providers';
import { AdapterRegistry } from '../adapters';
import { getEnvironmentConfig } from '../env';
import { getSession } from '../session';
import { AuthenticationError, VerificationError, PasswordResetError } from '../errors';
import type { ShipKitProvider, ShipKitDatabaseAdapter, AuthEngineExport } from '../types';

export class ClerkAuthEngine {
  public providerRegistry = new ProviderRegistry();
  public adapterRegistry = new AdapterRegistry();
  
  constructor() {
    // Throws ConfigurationError if required environment vars are missing
    getEnvironmentConfig();
  }

  public registerProvider(provider: ShipKitProvider) {
    this.providerRegistry.register(provider);
  }

  public registerDatabaseAdapter(adapter: ShipKitDatabaseAdapter) {
    this.adapterRegistry.register(adapter);
  }

  public getSession = getSession;

  public async signIn(providerId: string, credentials?: any): Promise<any> {
    const provider = this.providerRegistry.get(providerId);
    if (!provider.enabled) {
      throw new AuthenticationError(`Provider ${providerId} is disabled.`);
    }

    // Clerk naturally handles its own sign in flow. 
    // This method can be used to initiate an OAuth flow or verify credentials 
    // through Clerk's SDK, depending on the provider type.
    if (provider.type === 'oauth') {
      // return { redirectUrl: `...` };
    }
    
    return { success: true };
  }

  public async signOut(): Promise<void> {
    // Revoke the Clerk session. This typically involves passing the session ID 
    // to Clerk's revocation endpoint.
    return Promise.resolve();
  }

  public async verifyEmail(token: string): Promise<any> {
    if (!token) {
      throw new VerificationError('Verification token is required.');
    }
    // Implement Clerk email verification logic
    return { verified: true };
  }

  public async resetPassword(token: string, newPassword: string): Promise<any> {
    if (!token || !newPassword) {
      throw new PasswordResetError('Token and new password are required.');
    }
    // Implement Clerk password reset logic
    return { success: true };
  }
}

// createAuth Factory Method
export function createAuth(): AuthEngineExport {
  const engine = new ClerkAuthEngine();

  return {
    createAuth: () => engine,
    registerProvider: engine.registerProvider.bind(engine),
    registerDatabaseAdapter: engine.registerDatabaseAdapter.bind(engine),
    getSession: engine.getSession.bind(engine),
    signIn: engine.signIn.bind(engine),
    signOut: engine.signOut.bind(engine),
    verifyEmail: engine.verifyEmail.bind(engine),
    resetPassword: engine.resetPassword.bind(engine),
    AUTH_ENGINE_EXPORT: true,
  };
}
