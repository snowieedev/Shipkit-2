import * as React from "react"

export function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-card px-3 text-muted-foreground font-medium tracking-wider">
          Or continue with
        </span>
      </div>
    </div>
  )
}
