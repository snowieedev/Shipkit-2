import * as React from "react"

export function AuthError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="p-3 mb-4 text-sm font-medium text-destructive-foreground bg-destructive/90 rounded-md">
      {message}
    </div>
  )
}
