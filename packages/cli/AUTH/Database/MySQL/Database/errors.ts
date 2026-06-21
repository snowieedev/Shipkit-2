import type { DatabaseErrorShape } from './types';

export class DatabaseError extends Error {
  code: string;
  details?: any;
  
  constructor(message: string, code: string, details?: any) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
    this.details = details;
  }
  
  toJSON(): DatabaseErrorShape {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
    };
  }
}

export class DatabaseConnectionError extends DatabaseError {
  constructor(message: string, details?: any) {
    super(message, 'CONNECTION_ERROR', details);
    this.name = 'DatabaseConnectionError';
  }
}

export class RecordNotFoundError extends DatabaseError {
  constructor(message: string, details?: any) {
    super(message, 'RECORD_NOT_FOUND', details);
    this.name = 'RecordNotFoundError';
  }
}

export class ValidationError extends DatabaseError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class DuplicateRecordError extends DatabaseError {
  constructor(message: string, details?: any) {
    super(message, 'DUPLICATE_RECORD', details);
    this.name = 'DuplicateRecordError';
  }
}

export class UnknownDatabaseError extends DatabaseError {
  constructor(message: string, details?: any) {
    super(message, 'UNKNOWN_ERROR', details);
    this.name = 'UnknownDatabaseError';
  }
}
