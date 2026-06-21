// lib/auth.ts
import { createAuthConfig } from '../auth/config';

// {{AUTH_ENGINE}}

export const authOptions = createAuthConfig();

// ShipKit placeholder export
export function getAuth() {
  // AUTH_ENGINE_INJECTION
  return authOptions;
}
