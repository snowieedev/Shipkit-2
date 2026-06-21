import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "./Input"
import { Label } from "./Label"
import { LoadingButton } from "./LoadingButton"
import { AuthError } from "./AuthError"
import { AuthSuccess } from "./AuthSuccess"

const verifyEmailSchema = z.object({
  code: z.string().min(6, "Code must be at least 6 characters."),
})

type VerifyEmailValues = z.infer<typeof verifyEmailSchema>

export function VerifyEmailForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isResending, setIsResending] = React.useState(false)
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
  })

  async function onSubmit(data: VerifyEmailValues) {
    setIsLoading(true)
    setError("")
    setSuccess("")
    
    try {
      // Placeholder: Auth Engine verify email logic injected by ShipKit
      console.log("Verifying email with code:", data)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess("Email successfully verified.")
    } catch (err: any) {
      setError(err.message || "Invalid verification code.")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleResend() {
    setIsResending(true)
    setError("")
    setSuccess("")
    try {
      // Placeholder: Auth Engine resend email logic injected by ShipKit
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess("A new verification code has been sent.")
    } catch (err: any) {
      setError("Failed to resend code.")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="code">Verification Code</Label>
            <Input
              id="code"
              placeholder="000000"
              {...register("code")}
            />
            {errors.code && (
              <p className="text-sm text-destructive">{errors.code.message}</p>
            )}
          </div>

          <AuthError message={error} />
          <AuthSuccess message={success} />

          <LoadingButton isLoading={isLoading} type="submit">
            Verify Email
          </LoadingButton>
          
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-sm text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
          >
            {isResending ? "Resending..." : "Resend code"}
          </button>
        </div>
      </form>
    </div>
  )
}
