import * as React from "react"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"

export interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ className, isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          "bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full",
          "relative overflow-hidden transition-all duration-300 ease-out active:scale-95 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.15),0px_1px_2px_rgba(0,0,0,0.2)]", // Texture styling
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
LoadingButton.displayName = "LoadingButton"
