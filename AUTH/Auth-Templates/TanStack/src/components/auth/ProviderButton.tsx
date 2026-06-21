import * as React from "react"
import { cn } from "../../lib/utils"

export interface ProviderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: string
  icon?: React.ReactNode
}

export const ProviderButton = React.forwardRef<HTMLButtonElement, ProviderButtonProps>(
  ({ className, provider, icon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full",
          "relative overflow-hidden transition-all duration-300 ease-out active:scale-95 shadow-sm", // Texture styling touch
          className
        )}
        {...props}
      >
        {icon && <span className="mr-2 h-4 w-4">{icon}</span>}
        Continue with {provider}
      </button>
    )
  }
)
ProviderButton.displayName = "ProviderButton"
