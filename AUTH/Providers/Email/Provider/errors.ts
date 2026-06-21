import { ShipKitError } from './types';

export class ProviderConfigurationError extends Error implements ShipKitError {
  code = 'PROVIDER_CONFIGURATION_ERROR';
  details?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'ProviderConfigurationError';
    this.details = details;
  }
}

export class ProviderRegistrationError extends Error implements ShipKitError {
  code = 'PROVIDER_REGISTRATION_ERROR';
  details?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'ProviderRegistrationError';
    this.details = details;
  }
}

export class OAuthConfigurationError extends Error implements ShipKitError {
  code = 'OAUTH_CONFIGURATION_ERROR';
  details?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'OAuthConfigurationError';
    this.details = details;
  }
}

export class EmailConfigurationError extends Error implements ShipKitError {
  code = 'EMAIL_CONFIGURATION_ERROR';
  details?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'EmailConfigurationError';
    this.details = details;
  }
}

export class ValidationError extends Error implements ShipKitError {
  code = 'VALIDATION_ERROR';
  details?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export class UnknownProviderError extends Error implements ShipKitError {
  code = 'UNKNOWN_PROVIDER_ERROR';
  details?: unknown;
  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'UnknownProviderError';
    this.details = details;
  }
}
