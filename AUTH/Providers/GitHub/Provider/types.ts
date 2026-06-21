export interface GitHubProviderConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl?: string;
}

export interface ShipKitProvider {
  id: string;
  name: string;
  type: 'oauth' | 'credentials';
  enabled: boolean;
  config: GitHubProviderConfig;
}

export interface ShipKitError {
  code: string;
  message: string;
  details?: unknown;
}
