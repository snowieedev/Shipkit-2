import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "./LoadingButton"
import { AuthError } from "./AuthError"
import { AuthSuccess } from "./AuthSuccess"

export function VerifyEmailForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string>()
  const [success, setSuccess] = React.useState<string>()
  const [code, setCode] = React.useState("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(undefined)

    // Handled by Auth Engine
    setTimeout(() => {
      setIsLoading(false)
      if (code === "000000") {
        setError("Invalid verification code.")
      } else {
        setSuccess("Email successfully verified. Redirecting...")
      }
    }, 1000)
  }

  const handleResend = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSuccess("A new verification code has been sent.")
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthError message={error} />
      <AuthSuccess message={success} />
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2 text-center">
          <Label htmlFor="code" className="sr-only">Verification Code</Label>
          <Input 
            id="code" 
            type="text" 
            placeholder="Enter 6-digit code" 
            required 
            disabled={isLoading || !!success}
            className="text-center text-lg tracking-widest h-12"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
          />
        </div>

        <LoadingButton 
          type="submit" 
          variant="texture" 
          className="w-full h-11 text-base mt-4" 
          isLoading={isLoading}
          disabled={!!success || code.length < 6}
        >
          Verify Email
        </LoadingButton>
      </form>

      <div className="text-center text-sm text-muted-foreground mt-4">
        Didn't receive a code?{" "}
        <button 
          type="button"
          onClick={handleResend}
          disabled={isLoading || !!success}
          className="text-primary hover:underline font-medium disabled:opacity-50"
        >
          Resend code
        </button>
      </div>
    </div>
  )
}
