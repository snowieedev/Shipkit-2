import { AlertTriangle } from "lucide-react"

export function AuthError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-destructive/15 text-destructive text-left" role="alert" aria-live="assertive">
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  )
}
