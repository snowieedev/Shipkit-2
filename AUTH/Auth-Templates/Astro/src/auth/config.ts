// auth/config.ts
import { providers } from './providers';

// ShipKit Auth Engine Injection
{{AUTH_ENGINE}}

// {{ENV_CONFIG}}

export function createAuthConfig() {
  // AUTH_ENGINE_INJECTION
  return {
    providers,
    pages: {
      signIn: '/login',
      newUser: '/signup',
      error: '/auth-error',
      verifyRequest: '/verify-email',
    },
    callbacks: {
      async session({ session, user }: { session: any; user: any }) {
        return session;
      }
    }
  };
}
