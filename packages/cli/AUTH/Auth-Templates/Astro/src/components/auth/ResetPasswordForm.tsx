import * as React from "react"
import { PasswordInput } from "./PasswordInput"
import { LoadingButton } from "./LoadingButton"
import { AuthError } from "./AuthError"
import { AuthSuccess } from "./AuthSuccess"

export function ResetPasswordForm() {
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
      setSuccess("Your password has been successfully reset.")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthError message={error} />
      <AuthSuccess message={success} />
      
      {success ? (
        <div className="text-center mt-2">
          <a href="/login" className="inline-flex w-full justify-center h-11 items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900">
            Proceed to Login
          </a>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <PasswordInput 
              id="password" 
              label="New Password"
              required 
              disabled={isLoading} 
              showStrength
            />
          </div>

          <div className="space-y-2">
            <PasswordInput 
              id="confirmPassword" 
              label="Confirm New Password"
              required 
              disabled={isLoading} 
            />
          </div>

          <LoadingButton 
            type="submit" 
            variant="texture" 
            className="w-full h-11 text-base mt-4" 
            isLoading={isLoading}
          >
            Reset Password
          </LoadingButton>
        </form>
      )}
    </div>
  )
}
