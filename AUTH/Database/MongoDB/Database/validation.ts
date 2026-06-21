/**
 * ShipKit MongoDB Validation Layer
 * Ensures data integrity before database operations.
 */

import { User, Session, Account, Verification } from './types';
import { ValidationError } from './errors';

export function validateUser(user: Partial<User>): void {
  if (!user.id || typeof user.id !== 'string') {
    throw new ValidationError('User must have a valid string "id"');
  }
  if (!user.email || typeof user.email !== 'string') {
    throw new ValidationError('User must have a valid string "email"');
  }
  if (user.emailVerified !== null && typeof user.emailVerified !== 'boolean') {
    throw new ValidationError('User "emailVerified" must be a boolean or null');
  }
  if (!user.createdAt || !(user.createdAt instanceof Date)) {
    throw new ValidationError('User must have a valid "createdAt" Date');
  }
  if (!user.updatedAt || !(user.updatedAt instanceof Date)) {
    throw new ValidationError('User must have a valid "updatedAt" Date');
  }
}

export function validateSession(session: Partial<Session>): void {
  if (!session.id || typeof session.id !== 'string') {
    throw new ValidationError('Session must have a valid string "id"');
  }
  if (!session.userId || typeof session.userId !== 'string') {
    throw new ValidationError('Session must have a valid string "userId"');
  }
  if (!session.expiresAt || !(session.expiresAt instanceof Date)) {
    throw new ValidationError('Session must have a valid "expiresAt" Date');
  }
  if (!session.createdAt || !(session.createdAt instanceof Date)) {
    throw new ValidationError('Session must have a valid "createdAt" Date');
  }
}

export function validateAccount(account: Partial<Account>): void {
  if (!account.id || typeof account.id !== 'string') {
    throw new ValidationError('Account must have a valid string "id"');
  }
  if (!account.userId || typeof account.userId !== 'string') {
    throw new ValidationError('Account must have a valid string "userId"');
  }
  if (!account.providerId || typeof account.providerId !== 'string') {
    throw new ValidationError('Account must have a valid string "providerId"');
  }
  if (!account.providerAccountId || typeof account.providerAccountId !== 'string') {
    throw new ValidationError('Account must have a valid string "providerAccountId"');
  }
  if (!account.createdAt || !(account.createdAt instanceof Date)) {
    throw new ValidationError('Account must have a valid "createdAt" Date');
  }
  if (!account.updatedAt || !(account.updatedAt instanceof Date)) {
    throw new ValidationError('Account must have a valid "updatedAt" Date');
  }
}

export function validateVerification(verification: Partial<Verification>): void {
  if (!verification.id || typeof verification.id !== 'string') {
    throw new ValidationError('Verification must have a valid string "id"');
  }
  if (!verification.identifier || typeof verification.identifier !== 'string') {
    throw new ValidationError('Verification must have a valid string "identifier"');
  }
  if (!verification.token || typeof verification.token !== 'string') {
    throw new ValidationError('Verification must have a valid string "token"');
  }
  if (!verification.expiresAt || !(verification.expiresAt instanceof Date)) {
    throw new ValidationError('Verification must have a valid "expiresAt" Date');
  }
}
