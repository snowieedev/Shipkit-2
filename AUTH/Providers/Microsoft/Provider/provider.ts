import { Provider, MicrosoftProviderConfig } from "./types";
import { getProviderConfig } from "./config";
import { validateConfig } from "./validation";
import { ProviderRegistrationError } from "./errors";

export function createProvider(configOverrides?: Partial<MicrosoftProviderConfig>): Provider {
  try {
    const config = getProviderConfig(configOverrides);
    
    validateConfig(config);

    return {
      id: "microsoft",
      name: "Microsoft",
      type: "oauth",
      enabled: true,
      config,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new ProviderRegistrationError(`Failed to create Microsoft provider: ${error.message}`, {
          originalError: error
      });
    }
    throw new ProviderRegistrationError("Failed to create Microsoft provider due to an unknown error.");
  }
}
