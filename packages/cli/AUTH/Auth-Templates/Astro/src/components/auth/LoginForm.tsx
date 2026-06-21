import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "./PasswordInput"
import { LoadingButton } from "./LoadingButton"
import { AuthError } from "./AuthError"
import { AuthSuccess } from "./AuthSuccess"
import { SocialAuthSection } from "./SocialAuthSection"
import { AuthDivider } from "./AuthDivider"

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string>()
  const [success, setSuccess] = React.useState<string>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(undefined)
    setSuccess(undefined)

    // Form data will be handled by the injected Auth Engine here
    // e.g. await signIn("credentials", { email, password })
    
    setTimeout(() => {
      setIsLoading(false)
      // setError("Invalid credentials (Placeholder)")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthError message={error} />
      <AuthSuccess message={success} />
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@example.com" 
            required 
            disabled={isLoading}
            className="transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a 
              href="/forgot-password" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <PasswordInput 
            id="password" 
            required 
            disabled={isLoading} 
          />
        </div>

        <div className="flex items-center space-x-2 py-1">
          <input 
            type="checkbox" 
            id="remember" 
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary bg-background"
            disabled={isLoading}
          />
          <Label htmlFor="remember" className="font-normal text-sm cursor-pointer">
            Remember me for 30 days
          </Label>
        </div>

        <LoadingButton 
          type="submit" 
          variant="texture" 
          className="w-full h-11 text-base mt-2" 
          isLoading={isLoading}
        >
          Sign in
        </LoadingButton>
      </form>

      <AuthDivider />
      
      <SocialAuthSection />
      
      <div className="text-center text-sm text-muted-foreground mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-primary hover:underline font-medium">
          Create account
        </a>
      </div>
    </div>
  )
}
