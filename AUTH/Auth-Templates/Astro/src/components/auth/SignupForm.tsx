import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "./PasswordInput"
import { LoadingButton } from "./LoadingButton"
import { AuthError } from "./AuthError"
import { SocialAuthSection } from "./SocialAuthSection"
import { AuthDivider } from "./AuthDivider"

export function SignupForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(undefined)

    // Form data will be handled by the injected Auth Engine here
    
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthError message={error} />
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            required 
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@example.com" 
            required 
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <PasswordInput 
            id="password" 
            label="Password"
            required 
            disabled={isLoading} 
            showStrength
          />
        </div>

        <div className="space-y-2">
          <PasswordInput 
            id="confirmPassword" 
            label="Confirm Password"
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
          Create account
        </LoadingButton>
      </form>

      <AuthDivider />
      
      <SocialAuthSection />
      
      <div className="text-center text-sm text-muted-foreground mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </a>
      </div>
    </div>
  )
}
