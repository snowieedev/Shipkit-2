import { EmailProviderConfig } from './types';
import { getEnv } from './env';

export function getConfig(overrideConfig?: Partial<EmailProviderConfig>): EmailProviderConfig {
  const env = getEnv();

  // Secure defaults for email provider
  const defaultConfig: EmailProviderConfig = {
    email: true,
    password: true,
    emailVerification: true,
    passwordReset: true,
    smtp: undefined,
  };

  // Only populate smtp config if we have the minimal required env vars
  if (env.SMTP_HOST && env.SMTP_PORT && env.SMTP_USER && env.SMTP_FROM) {
    defaultConfig.smtp = {
      host: env.SMTP_HOST,
      port: parseInt(env.SMTP_PORT, 10),
      user: env.SMTP_USER,
      password: env.SMTP_PASSWORD,
      from: env.SMTP_FROM,
    };
  }

  // Override defaults with any user-provided config
  return {
    ...defaultConfig,
    ...overrideConfig,
    smtp: overrideConfig?.smtp || defaultConfig.smtp
  };
}
