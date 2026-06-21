import * as React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "./Input"
import { Label } from "./Label"
import { PasswordInput } from "./PasswordInput"
import { LoadingButton } from "./LoadingButton"
import { AuthError } from "./AuthError"
import { AuthSuccess } from "./AuthSuccess"
import { SocialAuthSection } from "./SocialAuthSection"
import { AuthDivider } from "./AuthDivider"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [success, setSuccess] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    setError("")
    setSuccess("")
    
    try {
      // Placeholder: Auth Engine login logic injected by ShipKit
      console.log("Logging in with:", data)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSuccess("Successfully logged in.")
    } catch (err: any) {
      setError(err.message || "An error occurred during login.")
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
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Forgot password?
              </a>
            </div>
            <PasswordInput
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="rememberMe" 
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              {...register("rememberMe")}
            />
            <Label htmlFor="rememberMe" className="font-normal text-muted-foreground">Remember me</Label>
          </div>

          <AuthError message={error} />
          <AuthSuccess message={success} />

          <LoadingButton isLoading={isLoading} type="submit">
            Sign In
          </LoadingButton>
        </div>
      </form>
      
      <AuthDivider />
      <SocialAuthSection />
    </div>
  )
}
