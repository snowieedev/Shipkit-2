import { MicrosoftProviderConfig } from "./types";
import { ValidationError } from "./errors";

export function validateConfig(config: MicrosoftProviderConfig): void {
  const errors: string[] = [];

  if (!config.clientId || typeof config.clientId !== "string" || config.clientId.trim() === "") {
    errors.push("clientId is required and must be a non-empty string.");
  }

  if (!config.clientSecret || typeof config.clientSecret !== "string" || config.clientSecret.trim() === "") {
    errors.push("clientSecret is required and must be a non-empty string.");
  }

  if (config.callbackUrl !== undefined && (typeof config.callbackUrl !== "string" || config.callbackUrl.trim() === "")) {
    errors.push("callbackUrl must be a non-empty string if provided.");
  }

  if (errors.length > 0) {
    throw new ValidationError("Invalid Microsoft provider configuration", { errors });
  }
}
