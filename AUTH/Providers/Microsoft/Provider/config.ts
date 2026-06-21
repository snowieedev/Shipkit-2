import { getMicrosoftEnv } from "./env";
import { MicrosoftProviderConfig } from "./types";
import { ProviderConfigurationError } from "./errors";

export function getProviderConfig(overrides?: Partial<MicrosoftProviderConfig>): MicrosoftProviderConfig {
  try {
    const env = getMicrosoftEnv();
    
    return {
      clientId: overrides?.clientId || env.MICROSOFT_CLIENT_ID,
      clientSecret: overrides?.clientSecret || env.MICROSOFT_CLIENT_SECRET,
      callbackUrl: overrides?.callbackUrl,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new ProviderConfigurationError(`Failed to load Microsoft provider configuration: ${error.message}`);
    }
    throw new ProviderConfigurationError("Failed to load Microsoft provider configuration due to an unknown error.");
  }
}
