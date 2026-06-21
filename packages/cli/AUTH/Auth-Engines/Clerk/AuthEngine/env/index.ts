import { validateEnvironment } from '../validation';

export function getEnvironmentConfig() {
  // In a framework-agnostic environment, we read from process.env if available,
  // or expect them to be injected. We must fail if they are missing.
  
  // Note: ShipKit specifications require consuming configuration only through environment injection
  // or globally available environment variables.
  
  const env = (typeof process !== 'undefined' && process.env ? process.env : {}) as Record<string, string | undefined>;
  
  // Validate that required Clerk variables are present
  validateEnvironment(env);

  return {
    CLERK_SECRET_KEY: env.CLERK_SECRET_KEY!,
    CLERK_PUBLISHABLE_KEY: env.CLERK_PUBLISHABLE_KEY!,
    // Session optional but supported by spec
    SESSION_SECRET: env.SESSION_SECRET || '',
    // DB
    DATABASE_URL: env.DATABASE_URL || '',
  };
}
