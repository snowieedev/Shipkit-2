import { ProviderButton } from "./ProviderButton";
import { getRegisteredProviders } from "../../auth/providers";

// Optional: you can pass an icon map here or have ShipKit inject it
export function SocialAuthSection() {
  const providers = getRegisteredProviders();
  
  if (!providers || providers.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        {/* PROVIDER_REGISTRATION_INJECTION */}
        {/* Placeholder rendering when no providers are injected yet */}
        <ProviderButton providerName="Google" />
        <ProviderButton providerName="GitHub" />
        <ProviderButton providerName="Microsoft" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {providers.map((p: any) => (
        <ProviderButton key={p.id} providerName={p.name} />
      ))}
    </div>
  );
}
