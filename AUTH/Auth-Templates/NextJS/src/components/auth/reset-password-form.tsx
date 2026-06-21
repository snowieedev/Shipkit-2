"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/auth/loading-button"
import { PasswordInput } from "@/components/auth/password-input"
import { AuthError } from "@/components/auth/auth-error"
import { AuthSuccess } from "@/components/auth/auth-success"
import Link from "next/link"

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // {{AUTH_ENGINE}} reset password injection
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
    }, 1000)
  }

  if (success) {
    return (
      <div className="space-y-4">
        <AuthSuccess message="Your password has been successfully reset. You can now sign in with your new password." />
        <div className="text-center text-sm">
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">New Password</Label>
          <PasswordInput id="password" required disabled={isLoading} showStrength />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <PasswordInput id="confirm-password" required disabled={isLoading} />
        </div>
      </div>
      
      {error && <AuthError message={error} />}

      <LoadingButton className="w-full" type="submit" loading={isLoading}>
        Reset password
      </LoadingButton>
    </form>
  )
}
