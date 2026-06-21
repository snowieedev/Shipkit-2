import { createAuth } from '../core';

export const clerkEngine = createAuth();

export const {
  registerProvider,
  registerDatabaseAdapter,
  getSession,
  signIn,
  signOut,
  verifyEmail,
  resetPassword,
  AUTH_ENGINE_EXPORT
} = clerkEngine;

// We also export the createAuth factory per the spec requirements
export { createAuth };
