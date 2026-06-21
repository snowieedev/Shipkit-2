export interface EmailProviderConfig {
  email?: boolean;
  password?: boolean;
  emailVerification?: boolean;
  passwordReset?: boolean;
  smtp?: {
    host: string;
    port: number;
    user: string;
    password?: string;
    from: string;
  };
}

export interface ProviderObject {
  id: string;
  name: string;
  type: 'oauth' | 'credentials';
  enabled: boolean;
  config: EmailProviderConfig;
}

export interface ShipKitError {
  code: string;
  message: string;
  details?: unknown;
}
