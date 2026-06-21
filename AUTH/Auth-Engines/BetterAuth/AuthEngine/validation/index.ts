import { Provider, DatabaseAdapter } from '../types';
import { ConfigurationError, ProviderError } from '../errors';

/**
 * Validates the required BetterAuth environment variables.
 * Throws ConfigurationError if invalid.
 */
export function validateEnvironmentVariables(): void {
  const requiredVars = [
    'BETTER_AUTH_SECRET',
    'BETTER_AUTH_URL',
    'SESSION_SECRET'
  ];

  const missing = requiredVars.filter(v => !process.env[v]);

  if (missing.length > 0) {
    throw new ConfigurationError(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Validates a provider configuration against the Provider spec.
 * Throws ProviderError if invalid.
 */
export function validateProvider(provider: Partial<Provider>): void {
  if (!provider) {
    throw new ProviderError('Provider configuration cannot be null or undefined');
  }

  if (typeof provider.id !== 'string' || provider.id.trim() === '') {
    throw new ProviderError('Provider must have a valid "id" string');
  }

  if (typeof provider.name !== 'string' || provider.name.trim() === '') {
    throw new ProviderError(`Provider "${provider.id}" must have a valid "name" string`);
  }

  if (provider.type !== 'oauth' && provider.type !== 'credentials') {
    throw new ProviderError(`Provider "${provider.id}" must have type "oauth" or "credentials"`);
  }

  if (typeof provider.enabled !== 'boolean') {
    throw new ProviderError(`Provider "${provider.id}" must have an "enabled" boolean flag`);
  }

  if (typeof provider.config !== 'object' || provider.config === null) {
    throw new ProviderError(`Provider "${provider.id}" must have a "config" object`);
  }
}

/**
 * Validates a database adapter against the Database Adapter spec.
 * Throws ConfigurationError if invalid.
 */
export function validateDatabaseAdapter(adapter: Partial<DatabaseAdapter>): void {
  if (!adapter) {
    throw new ConfigurationError('Database adapter cannot be null or undefined');
  }

  const requiredMethods: (keyof DatabaseAdapter)[] = [
    'connect',
    'disconnect',
    'createUser',
    'updateUser',
    'deleteUser',
    'createSession',
    'deleteSession',
    'createAccount',
    'deleteAccount'
  ];

  const missingMethods = requiredMethods.filter(
    (method) => typeof adapter[method] !== 'function'
  );

  if (missingMethods.length > 0) {
    throw new ConfigurationError(`Database adapter is missing required methods: ${missingMethods.join(', ')}`);
  }
}
