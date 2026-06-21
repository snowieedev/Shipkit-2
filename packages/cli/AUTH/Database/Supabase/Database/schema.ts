import type { User, Session, Account, Verification } from './types';

export const TABLES = {
  USERS: 'users',
  SESSIONS: 'sessions',
  ACCOUNTS: 'accounts',
  VERIFICATIONS: 'verifications',
} as const;
