import * as React from "react"
import { cn } from "../../lib/utils"

export interface AuthFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthFooter({ className, children, ...props }: AuthFooterProps) {
  return (
    <div className={cn("p-6 pt-0 text-center text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  )
}
