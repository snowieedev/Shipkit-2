import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "./LoadingButton"
import { AuthError } from "./AuthError"
import { AuthSuccess } from "./AuthSuccess"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string>()
  const [success, setSuccess] = React.useState<string>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(undefined)
    setSuccess(undefined)

    // Handled by Auth Engine
    setTimeout(() => {
      setIsLoading(false)
      setSuccess("If an account exists, a reset link has been sent.")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthError message={error} />
      <AuthSuccess message={success} />
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@example.com" 
            required 
            disabled={isLoading || !!success}
          />
        </div>

        <LoadingButton 
          type="submit" 
          variant="texture" 
          className="w-full h-11 text-base mt-4" 
          isLoading={isLoading}
          disabled={!!success}
        >
          Send reset link
        </LoadingButton>
      </form>

      <div className="text-center text-sm text-muted-foreground mt-4">
        Remember your password?{" "}
        <a href="/login" className="text-primary hover:underline font-medium">
          Back to sign in
        </a>
      </div>
    </div>
  )
}
