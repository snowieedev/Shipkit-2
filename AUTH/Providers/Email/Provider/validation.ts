import { EmailProviderConfig } from './types';
import { ValidationError, EmailConfigurationError } from './errors';

export function validateConfig(config: EmailProviderConfig): void {
  if (!config) {
    throw new ValidationError('Provider configuration is required.');
  }

  // Validate SMTP configuration if any email functionality is enabled
  if (config.email || config.password || config.emailVerification || config.passwordReset) {
    if (!config.smtp) {
      throw new EmailConfigurationError('SMTP configuration is missing but required for email features.');
    }

    if (!config.smtp.host) {
      throw new EmailConfigurationError('SMTP host is missing.');
    }

    if (!config.smtp.port) {
      throw new EmailConfigurationError('SMTP port is missing.');
    }

    if (isNaN(config.smtp.port) || config.smtp.port <= 0 || config.smtp.port > 65535) {
      throw new EmailConfigurationError('SMTP port must be a valid port number.');
    }

    if (!config.smtp.user) {
      throw new EmailConfigurationError('SMTP user is missing.');
    }

    if (!config.smtp.from) {
      throw new EmailConfigurationError('SMTP from address is missing.');
    }
  }
}
