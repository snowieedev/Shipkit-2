import * as React from "react"
import { ProviderButton } from "./ProviderButton"
import { providers } from "@/auth/providers"

export function SocialAuthSection() {
  if (!providers || providers.length === 0) return null;
  
  return (
    <div className="flex flex-col gap-3 w-full">
      {providers.map((provider: any) => (
        <ProviderButton
          key={provider.id}
          providerId={provider.id}
          providerName={provider.name}
          // Icon injection could be handled by the framework or mapped by name
        />
      ))}
    </div>
  )
}
