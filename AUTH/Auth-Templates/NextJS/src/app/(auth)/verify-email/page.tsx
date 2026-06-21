import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { VerifyEmailForm } from "@/components/auth/verify-email-form"

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <AuthCard title="Verify your email" description="Enter the verification code sent to your email">
        <VerifyEmailForm />
      </AuthCard>
    </AuthLayout>
  )
}
