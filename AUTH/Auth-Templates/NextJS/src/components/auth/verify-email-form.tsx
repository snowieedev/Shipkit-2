"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/auth/loading-button"
import { AuthError } from "@/components/auth/auth-error"
import { AuthSuccess } from "@/components/auth/auth-success"

export function VerifyEmailForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // {{AUTH_ENGINE}} verify email code injection
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
    }, 1000)
  }

  async function onResend() {
    setIsLoading(true)
    // {{AUTH_ENGINE}} resend verification injection
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  if (success) {
    return (
      <div className="space-y-4">
        <AuthSuccess message="Your email has been successfully verified." />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input id="code" placeholder="Enter code" required disabled={isLoading} />
        </div>
        
        {error && <AuthError message={error} />}

        <LoadingButton className="w-full" type="submit" loading={isLoading}>
          Verify email
        </LoadingButton>
      </form>
      
      <div className="text-center">
        <button 
          onClick={onResend} 
          disabled={isLoading}
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Resend verification code
        </button>
      </div>
    </div>
  )
}
