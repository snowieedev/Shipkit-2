import { ShipKitError } from './types';

export class ProviderError extends Error implements ShipKitError {
  constructor(
    public code: string,
    public message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ProviderError';
  }
}

export class ProviderConfigurationError extends ProviderError {
  constructor(message: string, details?: unknown) {
    super('PROVIDER_CONFIGURATION_ERROR', message, details);
  }
}

export class ProviderRegistrationError extends ProviderError {
  constructor(message: string, details?: unknown) {
    super('PROVIDER_REGISTRATION_ERROR', message, details);
  }
}

export class OAuthConfigurationError extends ProviderError {
  constructor(message: string, details?: unknown) {
    super('OAUTH_CONFIGURATION_ERROR', message, details);
  }
}

export class EmailConfigurationError extends ProviderError {
  constructor(message: string, details?: unknown) {
    super('EMAIL_CONFIGURATION_ERROR', message, details);
  }
}

export class ValidationError extends ProviderError {
  constructor(message: string, details?: unknown) {
    super('VALIDATION_ERROR', message, details);
  }
}

export class UnknownProviderError extends ProviderError {
  constructor(message: string, details?: unknown) {
    super('UNKNOWN_PROVIDER_ERROR', message, details);
  }
}
