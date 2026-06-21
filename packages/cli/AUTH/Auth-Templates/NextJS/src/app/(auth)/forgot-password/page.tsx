import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard title="Forgot password" description="We will send you a reset link">
        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  )
}
