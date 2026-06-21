import { ProviderButton } from "@/components/auth/provider-button"
import { providers } from "@/auth/providers"

export function SocialAuthSection() {
  // If no providers are configured, don't render the section
  if (!providers || providers.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {/* {{PROVIDERS}} placeholders for rendering preview */}
          <ProviderButton providerId="google" providerName="Google" type="button" />
          <ProviderButton providerId="github" providerName="GitHub" type="button" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {/* {{PROVIDERS}} */}
        {providers.map((provider: { id: string; name: string }) => (
          <ProviderButton
            key={provider.id}
            providerId={provider.id}
            providerName={provider.name}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}
