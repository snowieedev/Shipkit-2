import * as React from "react"
import { cn } from "../../lib/utils"

export interface AuthHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export function AuthHeader({ className, title, description, ...props }: AuthHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)} {...props}>
      <h3 className="font-semibold tracking-tight text-2xl text-center">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground text-center">
          {description}
        </p>
      )}
    </div>
  )
}
