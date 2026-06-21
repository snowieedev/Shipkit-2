import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard title="Reset password" description="Choose a new password for your account">
        <ResetPasswordForm />
      </AuthCard>
    </AuthLayout>
  )
}
