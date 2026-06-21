export type ShipKitErrorCode = 
  | 'AUTHENTICATION_ERROR'
  | 'SESSION_ERROR'
  | 'PROVIDER_ERROR'
  | 'DATABASE_ERROR'
  | 'VERIFICATION_ERROR'
  | 'PASSWORD_RESET_ERROR'
  | 'CONFIGURATION_ERROR'
  | 'UNKNOWN_AUTH_ERROR';

export class ShipKitError extends Error {
  public code: ShipKitErrorCode;
  public details?: Record<string, any>;

  constructor(code: ShipKitErrorCode, message: string, details?: Record<string, any>) {
    super(message);
    this.name = 'ShipKitError';
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, ShipKitError.prototype);
  }

  public toJSON() {
    return {
      code: this.code,
      message: this.message,
      ...(this.details ? { details: this.details } : {})
    };
  }
}

export class AuthenticationError extends ShipKitError {
  constructor(message: string, details?: Record<string, any>) {
    super('AUTHENTICATION_ERROR', message, details);
  }
}

export class SessionError extends ShipKitError {
  constructor(message: string, details?: Record<string, any>) {
    super('SESSION_ERROR', message, details);
  }
}

export class ProviderError extends ShipKitError {
  constructor(message: string, details?: Record<string, any>) {
    super('PROVIDER_ERROR', message, details);
  }
}

export class DatabaseError extends ShipKitError {
  constructor(message: string, details?: Record<string, any>) {
    super('DATABASE_ERROR', message, details);
  }
}

export class VerificationError extends ShipKitError {
  constructor(message: string, details?: Record<string, any>) {
    super('VERIFICATION_ERROR', message, details);
  }
}

export class PasswordResetError extends ShipKitError {
  constructor(message: string, details?: Record<string, any>) {
    super('PASSWORD_RESET_ERROR', message, details);
  }
}

export class ConfigurationError extends ShipKitError {
  constructor(message: string, details?: Record<string, any>) {
    super('CONFIGURATION_ERROR', message, details);
  }
}

export class UnknownAuthError extends ShipKitError {
  constructor(message: string, details?: Record<string, any>) {
    super('UNKNOWN_AUTH_ERROR', message, details);
  }
}
