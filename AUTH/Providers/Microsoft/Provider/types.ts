export interface MicrosoftProviderConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl?: string;
}

export interface Provider {
  id: "microsoft";
  name: "Microsoft";
  type: "oauth";
  enabled: boolean;
  config: MicrosoftProviderConfig;
}
