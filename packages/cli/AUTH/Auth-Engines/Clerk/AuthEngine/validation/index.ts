import { ConfigurationError } from '../errors';
import type { ShipKitProvider, ShipKitDatabaseAdapter } from '../types';

export function validateEnvironment(env: Record<string, string | undefined>): void {
  const requiredClerkVars = ['CLERK_SECRET_KEY', 'CLERK_PUBLISHABLE_KEY'];
  const missing = requiredClerkVars.filter(key => !env[key]);

  if (missing.length > 0) {
    throw new ConfigurationError(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

export function validateProvider(provider: any): asserts provider is ShipKitProvider {
  if (!provider || typeof provider !== 'object') {
    throw new ConfigurationError('Provider must be an object');
  }
  if (typeof provider.id !== 'string') {
    throw new ConfigurationError('Provider must have a string id');
  }
  if (typeof provider.name !== 'string') {
    throw new ConfigurationError('Provider must have a string name');
  }
  if (provider.type !== 'oauth' && provider.type !== 'credentials') {
    throw new ConfigurationError('Provider type must be "oauth" or "credentials"');
  }
}

export function validateDatabaseAdapter(adapter: any): asserts adapter is ShipKitDatabaseAdapter {
  if (!adapter || typeof adapter !== 'object') {
    throw new ConfigurationError('Database adapter must be an object');
  }
  const requiredMethods = [
    'connect', 'disconnect', 'createUser', 'updateUser', 'deleteUser',
    'createSession', 'deleteSession', 'createAccount', 'deleteAccount'
  ];
  const missing = requiredMethods.filter(method => typeof adapter[method] !== 'function');

  if (missing.length > 0) {
    throw new ConfigurationError(`Database adapter is missing required methods: ${missing.join(', ')}`);
  }
}

export function validateSessionObject(session: any): void {
  if (!session || typeof session !== 'object') {
    throw new ConfigurationError('Session must be an object');
  }
  if (!session.id || !session.userId || !session.expiresAt) {
    throw new ConfigurationError('Session missing required fields');
  }
}

export function validateUserObject(user: any): void {
  if (!user || typeof user !== 'object') {
    throw new ConfigurationError('User must be an object');
  }
  if (!user.id || !user.email) {
    throw new ConfigurationError('User missing required fields');
  }
}
