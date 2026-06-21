import * as React from "react"
import { cn } from "../../lib/utils"

export interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthCard({ className, children, ...props }: AuthCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
