/**
 * ShipKit Standardized Database Errors
 * Abstraction layer to prevent leaking raw database errors.
 */

export interface ShipKitErrorDetails {
  code: string;
  message: string;
  details?: unknown;
}

export class ShipKitDatabaseError extends Error {
  public code: string;
  public details?: unknown;

  constructor(code: string, message: string, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
  }

  toJSON(): ShipKitErrorDetails {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

export class DatabaseConnectionError extends ShipKitDatabaseError {
  constructor(message: string = 'Database connection failed', details?: unknown) {
    super('DatabaseConnectionError', message, details);
  }
}

export class RecordNotFoundError extends ShipKitDatabaseError {
  constructor(message: string = 'Record not found', details?: unknown) {
    super('RecordNotFoundError', message, details);
  }
}

export class ValidationError extends ShipKitDatabaseError {
  constructor(message: string = 'Validation failed', details?: unknown) {
    super('ValidationError', message, details);
  }
}

export class DuplicateRecordError extends ShipKitDatabaseError {
  constructor(message: string = 'Duplicate record found', details?: unknown) {
    super('DuplicateRecordError', message, details);
  }
}

export class UnknownDatabaseError extends ShipKitDatabaseError {
  constructor(message: string = 'Unknown database error occurred', details?: unknown) {
    super('UnknownDatabaseError', message, details);
  }
}
