import { OAuthConfigurationError } from "./errors";

export interface MicrosoftEnv {
  MICROSOFT_CLIENT_ID: string;
  MICROSOFT_CLIENT_SECRET: string;
}

export function getMicrosoftEnv(): MicrosoftEnv {
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;

  if (!clientId) {
    throw new OAuthConfigurationError("Missing required environment variable: MICROSOFT_CLIENT_ID");
  }

  if (!clientSecret) {
    throw new OAuthConfigurationError("Missing required environment variable: MICROSOFT_CLIENT_SECRET");
  }

  return {
    MICROSOFT_CLIENT_ID: clientId,
    MICROSOFT_CLIENT_SECRET: clientSecret,
  };
}
