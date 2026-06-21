import { BetterAuthEngine } from '../core';
import { Provider, DatabaseAdapter, Session } from '../types';

// Singleton instance
const engine = new BetterAuthEngine();

// Required ShipKit Exports
export function createAuth(): void {
  engine.initialize();
}

export function registerProvider(provider: Provider): void {
  engine.registerProvider(provider);
}

export function registerDatabaseAdapter(adapter: DatabaseAdapter): void {
  engine.registerDatabaseAdapter(adapter);
}

export async function getSession(sessionId: string): Promise<Session | null> {
  return engine.getSession(sessionId);
}

export async function signIn(providerId: string, credentials?: any): Promise<Session> {
  return engine.signIn(providerId, credentials);
}

export async function signOut(sessionId: string): Promise<void> {
  return engine.signOut(sessionId);
}

export async function verifyEmail(token: string): Promise<boolean> {
  return engine.verifyEmail(token);
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  return engine.resetPassword(token, newPassword);
}

// Required Assembly Marker
export const AUTH_ENGINE_EXPORT = {
  createAuth,
  registerProvider,
  registerDatabaseAdapter,
  getSession,
  signIn,
  signOut,
  verifyEmail,
  resetPassword,
};
