import { ProviderButton } from "./ProviderButton"
import { providers } from "../../lib/auth"

export function SocialAuthSection() {
  if (!providers || providers.length === 0) {
    return null
  }

  return (
    <div className="grid gap-2">
      {providers.map((provider: any) => (
        <ProviderButton 
          key={provider.id || provider.name} 
          provider={provider.name} 
          onClick={() => {
            // Placeholder: Auth engine logic injected by ShipKit
            console.log(`Authenticating with ${provider.name}...`)
          }}
        />
      ))}
    </div>
  )
}
