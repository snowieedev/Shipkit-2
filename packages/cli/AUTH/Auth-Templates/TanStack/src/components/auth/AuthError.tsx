import * as React from "react"
import { cn } from "../../lib/utils"
import { AlertCircle } from "lucide-react"

export interface AuthErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
}

export function AuthError({ className, message, ...props }: AuthErrorProps) {
  if (!message) return null

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive",
        className
      )}
      {...props}
    >
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
