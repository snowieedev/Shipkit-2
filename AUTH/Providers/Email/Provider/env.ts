import { EmailConfigurationError } from './errors';

export interface EnvConfig {
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASSWORD?: string;
  SMTP_FROM?: string;
}

export function getEnv(): EnvConfig {
  // Ensure we are in an environment where process.env is accessible
  if (typeof process === 'undefined' || !process.env) {
    throw new EmailConfigurationError('Environment variables are not accessible. Provider requires process.env.');
  }

  return {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM,
  };
}
