import { CheckCircle2 } from "lucide-react"

export function AuthSuccess({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-400 text-left" role="status" aria-live="polite">
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  )
}
