import * as React from "react"

export function AuthSuccess({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div className="p-3 mb-4 text-sm font-medium text-green-900 bg-green-100 dark:bg-green-900/30 dark:text-green-400 rounded-md border border-green-200 dark:border-green-800">
      {message}
    </div>
  )
}
