"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/auth/loading-button"
import { AuthError } from "@/components/auth/auth-error"
import { AuthSuccess } from "@/components/auth/auth-success"
import Link from "next/link"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    // {{AUTH_ENGINE}} forgot password injection
    setTimeout(() => {
      setIsLoading(false)
      setSuccess(true)
    }, 1000)
  }

  if (success) {
    return (
      <div className="space-y-4">
        <AuthSuccess message="If an account exists, we have sent a reset link to your email." />
        <div className="text-center text-sm">
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Back to login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" required disabled={isLoading} />
        </div>
      </div>
      
      {error && <AuthError message={error} />}

      <LoadingButton className="w-full" type="submit" loading={isLoading}>
        Send reset link
      </LoadingButton>

      <div className="text-center text-sm">
        Remember your password?{" "}
        <Link href="/login" className="underline underline-offset-4 hover:text-primary">
          Sign in
        </Link>
      </div>
    </form>
  )
}
