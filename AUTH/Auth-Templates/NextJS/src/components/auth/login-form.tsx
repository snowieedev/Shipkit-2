"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "@/components/auth/loading-button"
import { SocialAuthSection } from "@/components/auth/social-auth-section"
import { PasswordInput } from "@/components/auth/password-input"
import { AuthError } from "@/components/auth/auth-error"
import Link from "next/link"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // {{AUTH_ENGINE}} login injection
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" required disabled={isLoading} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Forgot password?
            </Link>
          </div>
          <PasswordInput id="password" required disabled={isLoading} />
        </div>
      </div>
      
      {error && <AuthError message={error} />}

      <LoadingButton className="w-full" type="submit" loading={isLoading}>
        Sign in
      </LoadingButton>

      <SocialAuthSection />

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
          Sign up
        </Link>
      </div>
    </form>
  )
}
