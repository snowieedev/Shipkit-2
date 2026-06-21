import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthCard } from "../components/auth/AuthCard";
import { ResetPasswordForm } from "../components/auth/ResetPasswordForm";
import type { Route } from "./+types/reset-password";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reset Password" },
    { name: "description", content: "Enter your new password" },
  ];
}

export default function ResetPasswordRoute() {
  return (
    <AuthLayout>
      <AuthCard 
        title="Set new password" 
        description="Your new password must be different from previously used passwords."
      >
        <ResetPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}
