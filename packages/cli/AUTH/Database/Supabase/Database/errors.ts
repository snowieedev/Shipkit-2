import type { ShipKitError } from './types';

export function DatabaseConnectionError(details?: unknown): ShipKitError {
  return { code: 'DATABASE_CONNECTION_ERROR', message: 'Failed to connect to the database', details };
}

export function RecordNotFoundError(details?: unknown): ShipKitError {
  return { code: 'RECORD_NOT_FOUND', message: 'Record not found', details };
}

export function ValidationError(details?: unknown): ShipKitError {
  return { code: 'VALIDATION_ERROR', message: 'Data validation failed', details };
}

export function DuplicateRecordError(details?: unknown): ShipKitError {
  return { code: 'DUPLICATE_RECORD', message: 'Record already exists', details };
}

export function UnknownDatabaseError(details?: unknown): ShipKitError {
  return { code: 'UNKNOWN_DATABASE_ERROR', message: 'An unknown database error occurred', details };
}
