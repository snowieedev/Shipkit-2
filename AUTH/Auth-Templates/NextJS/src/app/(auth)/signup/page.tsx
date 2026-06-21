import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthCard title="Create an account" description="Enter your details to get started">
        <SignupForm />
      </AuthCard>
    </AuthLayout>
  )
}
