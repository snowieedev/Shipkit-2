import { ValidationError } from './errors';
import type { User, Session, Account, Verification } from './types';

export const validateUser = (user: Partial<User>) => {
  if (!user.id) throw new ValidationError('User id is required');
  if (!user.email) throw new ValidationError('User email is required');
  if (typeof user.email !== 'string' || !user.email.includes('@')) {
    throw new ValidationError('Valid user email is required');
  }
};

export const validateSession = (session: Partial<Session>) => {
  if (!session.id) throw new ValidationError('Session id is required');
  if (!session.userId) throw new ValidationError('Session userId is required');
  if (!session.expiresAt) throw new ValidationError('Session expiresAt is required');
};

export const validateAccount = (account: Partial<Account>) => {
  if (!account.id) throw new ValidationError('Account id is required');
  if (!account.userId) throw new ValidationError('Account userId is required');
  if (!account.providerId) throw new ValidationError('Account providerId is required');
  if (!account.providerAccountId) throw new ValidationError('Account providerAccountId is required');
};

export const validateVerification = (verification: Partial<Verification>) => {
  if (!verification.id) throw new ValidationError('Verification id is required');
  if (!verification.identifier) throw new ValidationError('Verification identifier is required');
  if (!verification.token) throw new ValidationError('Verification token is required');
  if (!verification.expiresAt) throw new ValidationError('Verification expiresAt is required');
};
