import * as React from "react"
import { cn } from "../../lib/utils"

export interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AuthLayout({ className, children, ...props }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center p-4 bg-background text-foreground",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-[400px]">
        {children}
      </div>
    </div>
  )
}
