export class DatabaseError extends Error {
  public code: string;
  public details?: any;

  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.details = details;
  }
}

export class DatabaseConnectionError extends DatabaseError {
  constructor(message: string = 'Database connection failed', details?: any) {
    super(message, 'CONNECTION_ERROR', details);
  }
}

export class RecordNotFoundError extends DatabaseError {
  constructor(message: string = 'Record not found', details?: any) {
    super(message, 'NOT_FOUND_ERROR', details);
  }
}

export class ValidationError extends DatabaseError {
  constructor(message: string = 'Validation failed', details?: any) {
    super(message, 'VALIDATION_ERROR', details);
  }
}

export class DuplicateRecordError extends DatabaseError {
  constructor(message: string = 'Record already exists', details?: any) {
    super(message, 'DUPLICATE_ERROR', details);
  }
}

export class UnknownDatabaseError extends DatabaseError {
  constructor(message: string = 'Unknown database error occurred', details?: any) {
    super(message, 'UNKNOWN_ERROR', details);
  }
}
