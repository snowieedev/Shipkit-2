"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export interface PasswordInputProps extends React.ComponentProps<"input"> {
  showStrength?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrength, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [strength, setStrength] = React.useState(0)

    const calculateStrength = (val: string) => {
      let s = 0;
      if (val.length > 7) s += 1;
      if (/[A-Z]/.test(val)) s += 1;
      if (/[0-9]/.test(val)) s += 1;
      if (/[^A-Za-z0-9]/.test(val)) s += 1;
      return s;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (showStrength) {
        setStrength(calculateStrength(e.target.value));
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className="space-y-2 w-full">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            className={`pr-10 ${className || ""}`}
            ref={ref}
            {...props}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        
        {showStrength && (
          <div className="flex gap-1 h-1.5 w-full mt-2">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-full flex-1 rounded-full transition-colors duration-300 ${
                  strength >= level
                    ? strength < 2
                      ? "bg-red-500"
                      : strength < 3
                      ? "bg-yellow-500"
                      : strength < 4
                      ? "bg-blue-500"
                      : "bg-green-500"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"
