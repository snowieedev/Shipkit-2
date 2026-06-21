import React from "react"

export function AuthFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 text-center text-sm text-muted-foreground">
      {children}
    </div>
  )
}
