import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showStrength?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label = "Password", showStrength = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    // Basic strength check for UI placeholder purposes
    const strength = props.value ? Math.min((String(props.value).length / 12) * 100, 100) : 0;
    
    let strengthColor = "bg-muted";
    if (strength > 0) strengthColor = "bg-destructive";
    if (strength > 40) strengthColor = "bg-orange-500";
    if (strength > 75) strengthColor = "bg-green-500";

    return (
      <div className="space-y-2 w-full">
        <Label htmlFor={props.id}>{label}</Label>
        <div className="relative">
          <Input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={`pr-10 ${className || ''}`}
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="sr-only">Toggle password visibility</span>
          </button>
        </div>
        {showStrength && (
          <div className="mt-2 flex gap-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${strengthColor}`} 
              style={{ width: `${strength}%` }}
            />
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"
