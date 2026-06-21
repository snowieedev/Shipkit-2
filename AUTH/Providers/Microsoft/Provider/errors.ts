export interface ShipKitErrorDetails {
  [key: string]: any;
}

export class ShipKitProviderError extends Error {
  public code: string;
  public details?: ShipKitErrorDetails;

  constructor(code: string, message: string, details?: ShipKitErrorDetails) {
    super(message);
    this.name = "ShipKitProviderError";
    this.code = code;
    this.details = details;
  }
}

export class ProviderConfigurationError extends ShipKitProviderError {
  constructor(message: string, details?: ShipKitErrorDetails) {
    super("PROVIDER_CONFIGURATION_ERROR", message, details);
  }
}

export class ProviderRegistrationError extends ShipKitProviderError {
  constructor(message: string, details?: ShipKitErrorDetails) {
    super("PROVIDER_REGISTRATION_ERROR", message, details);
  }
}

export class OAuthConfigurationError extends ShipKitProviderError {
  constructor(message: string, details?: ShipKitErrorDetails) {
    super("OAUTH_CONFIGURATION_ERROR", message, details);
  }
}

export class EmailConfigurationError extends ShipKitProviderError {
  constructor(message: string, details?: ShipKitErrorDetails) {
    super("EMAIL_CONFIGURATION_ERROR", message, details);
  }
}

export class ValidationError extends ShipKitProviderError {
  constructor(message: string, details?: ShipKitErrorDetails) {
    super("VALIDATION_ERROR", message, details);
  }
}

export class UnknownProviderError extends ShipKitProviderError {
  constructor(message: string, details?: ShipKitErrorDetails) {
    super("UNKNOWN_PROVIDER_ERROR", message, details);
  }
}
