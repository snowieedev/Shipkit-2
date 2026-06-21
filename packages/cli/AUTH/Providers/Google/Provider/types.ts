export interface GoogleProviderConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl?: string;
}

export interface ShipKitProvider {
  id: string;
  name: string;
  type: 'oauth' | 'credentials';
  enabled: boolean;
  config: GoogleProviderConfig;
}

export interface ShipKitError {
  code: string;
  message: string;
  details?: unknown;
}
