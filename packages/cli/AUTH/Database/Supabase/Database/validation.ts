import type { User, Session, Account, Verification } from './types';
import { ValidationError } from './errors';

export function validateUser(data: Partial<User>): void {
  if (data.email === undefined || data.email === null || data.email === '') {
    throw ValidationError('Email is required');
  }
}

export function validateSession(data: Partial<Session>): void {
  if (!data.userId) throw ValidationError('userId is required');
  if (!data.expiresAt) throw ValidationError('expiresAt is required');
}

export function validateAccount(data: Partial<Account>): void {
  if (!data.userId) throw ValidationError('userId is required');
  if (!data.providerId) throw ValidationError('providerId is required');
  if (!data.providerAccountId) throw ValidationError('providerAccountId is required');
}

export function validateVerification(data: Partial<Verification>): void {
  if (!data.identifier) throw ValidationError('identifier is required');
  if (!data.token) throw ValidationError('token is required');
  if (!data.expiresAt) throw ValidationError('expiresAt is required');
}
