import * as React from "react"
import { cn } from "../../lib/utils"
import { CheckCircle2 } from "lucide-react"

export interface AuthSuccessProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string
}

export function AuthSuccess({ className, message, ...props }: AuthSuccessProps) {
  if (!message) return null

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md bg-green-500/15 p-3 text-sm text-green-600 dark:text-green-400",
        className
      )}
      {...props}
    >
      <CheckCircle2 className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
