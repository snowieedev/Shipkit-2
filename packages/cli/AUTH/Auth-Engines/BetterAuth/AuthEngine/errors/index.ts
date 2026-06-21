import { AuthError } from '../types';

export class ShipKitAuthError extends Error implements AuthError {
  public code: string;
  public details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = 'ShipKitAuthError';
    this.code = code;
    this.details = details;

    // Maintain proper stack trace in V8 engines (like Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export class AuthenticationError extends ShipKitAuthError {
  constructor(message: string, details?: any) {
    super(message, 'AUTHENTICATION_ERROR', details);
  }
}

export class SessionError extends ShipKitAuthError {
  constructor(message: string, details?: any) {
    super(message, 'SESSION_ERROR', details);
  }
}

export class ProviderError extends ShipKitAuthError {
  constructor(message: string, details?: any) {
    super(message, 'PROVIDER_ERROR', details);
  }
}

export class DatabaseError extends ShipKitAuthError {
  constructor(message: string, details?: any) {
    super(message, 'DATABASE_ERROR', details);
  }
}

export class VerificationError extends ShipKitAuthError {
  constructor(message: string, details?: any) {
    super(message, 'VERIFICATION_ERROR', details);
  }
}

export class PasswordResetError extends ShipKitAuthError {
  constructor(message: string, details?: any) {
    super(message, 'PASSWORD_RESET_ERROR', details);
  }
}

export class ConfigurationError extends ShipKitAuthError {
  constructor(message: string, details?: any) {
    super(message, 'CONFIGURATION_ERROR', details);
  }
}

export class UnknownAuthError extends ShipKitAuthError {
  constructor(message: string, details?: any) {
    super(message, 'UNKNOWN_AUTH_ERROR', details);
  }
}

/**
 * Utility to convert any unknown error to a standardized AuthError.
 */
export function normalizeError(error: unknown): AuthError {
  if (error instanceof ShipKitAuthError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  const message = error instanceof Error ? error.message : String(error);
  return {
    code: 'UNKNOWN_AUTH_ERROR',
    message,
  };
}
