import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "./Input"
import { Label } from "./Label"
import { LoadingButton } from "./LoadingButton"
import { AuthError } from "./AuthError"
import { AuthSuccess } from "./AuthSuccess"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: ForgotPasswordValues) {
    setIsLoading(true)
    setError("")
    setSuccess("")
    
    try {
      // Placeholder: Auth Engine forgot password logic injected by ShipKit
      console.log("Sending reset link to:", data)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess("If an account exists, a reset link has been sent.")
    } catch (err: any) {
      setError(err.message || "An error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <AuthError message={error} />
          <AuthSuccess message={success} />

          <LoadingButton isLoading={isLoading} type="submit">
            Send Reset Link
          </LoadingButton>
        </div>
      </form>
    </div>
  )
}
