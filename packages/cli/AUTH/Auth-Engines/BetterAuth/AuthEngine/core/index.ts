import { DatabaseAdapterRegistry } from '../adapters';
import { ProviderRegistry } from '../providers';
import { SessionManager } from '../session';
import { Provider, DatabaseAdapter, Session, User } from '../types';
import { validateEnvironmentVariables } from '../validation';
import { AuthenticationError, normalizeError } from '../errors';

export class BetterAuthEngine {
  private adapterRegistry: DatabaseAdapterRegistry;
  private providerRegistry: ProviderRegistry;
  private sessionManager: SessionManager;

  constructor() {
    this.adapterRegistry = new DatabaseAdapterRegistry();
    this.providerRegistry = new ProviderRegistry();
    this.sessionManager = new SessionManager();
  }

  public registerProvider(provider: Provider): void {
    this.providerRegistry.register(provider);
  }

  public registerDatabaseAdapter(adapter: DatabaseAdapter): void {
    this.adapterRegistry.register(adapter);
  }

  public async getSession(sessionId: string): Promise<Session | null> {
    // In a real implementation we would fetch from DB.
    // For this engine interface, we delegate to adapter if it had a getSession.
    // However, ShipKit database spec only mandates createSession and deleteSession.
    // So session retrieval happens at a higher layer or we assume it's valid if we hold the token.
    // For BetterAuth engine compatibility, we return a standard session shape.
    throw new AuthenticationError('getSession must be implemented by the integrated framework');
  }

  public async signIn(providerId: string, credentials?: any): Promise<Session> {
    try {
      const provider = this.providerRegistry.getProvider(providerId);
      
      if (!provider.enabled) {
        throw new AuthenticationError(`Provider ${providerId} is not enabled`);
      }

      // 1. Authenticate user via provider logic (abstracted away)
      // For email/credentials, verify password here
      // For OAuth, verify token/code here

      // 2. Fetch or Create User in DB
      // We assume a successful authentication yields an email for this example.
      const email = credentials?.email || 'user@example.com'; 
      
      // Since ShipKit adapters don't have getUser, we attempt to create or assume it exists 
      // (a full implementation would expand the DB adapter or handle it in a framework specific way).
      // Here we simulate the engine flow.

      // 3. Create Session
      const sessionToken = this.sessionManager.generateSessionToken();
      const expiresAt = this.sessionManager.calculateExpirationDate();

      const session = await this.adapterRegistry.createSession({
        userId: 'temp-user-id', // Would be actual user ID
        expiresAt
      });

      return session;

    } catch (error) {
      throw normalizeError(error);
    }
  }

  public async signOut(sessionId: string): Promise<void> {
    try {
      await this.adapterRegistry.deleteSession(sessionId);
    } catch (error) {
      throw normalizeError(error);
    }
  }

  public async verifyEmail(token: string): Promise<boolean> {
    // Implement standard verification flow
    return true;
  }

  public async resetPassword(token: string, newPassword: string): Promise<void> {
    // Implement standard password reset flow
  }

  public initialize(): void {
    validateEnvironmentVariables();
  }
}
