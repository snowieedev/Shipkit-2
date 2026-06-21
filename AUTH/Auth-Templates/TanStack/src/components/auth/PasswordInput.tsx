import * as React from "react"
import { cn } from "../../lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showStrengthIndicator?: boolean
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrengthIndicator, value, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    // Basic password strength logic
    const calculateStrength = (pwd: string) => {
      let strength = 0
      if (pwd.length > 7) strength += 1
      if (/[A-Z]/.test(pwd)) strength += 1
      if (/[0-9]/.test(pwd)) strength += 1
      if (/[^A-Za-z0-9]/.test(pwd)) strength += 1
      return strength
    }

    const strength = value ? calculateStrength(String(value)) : 0

    return (
      <div className="space-y-2 w-full">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10",
              className
            )}
            ref={ref}
            value={value}
            {...props}
          />
          <button
            type="button"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {showStrengthIndicator && (
          <div className="flex space-x-1 h-1 w-full mt-2">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={cn(
                  "h-full w-full rounded-full transition-all duration-300",
                  strength >= level
                    ? level <= 2
                      ? "bg-yellow-500"
                      : "bg-green-500"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"
