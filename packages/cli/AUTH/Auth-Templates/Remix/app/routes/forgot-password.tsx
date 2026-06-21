import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthCard } from "../components/auth/AuthCard";
import { ForgotPasswordForm } from "../components/auth/ForgotPasswordForm";
import type { Route } from "./+types/forgot-password";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Forgot Password" },
    { name: "description", content: "Reset your password" },
  ];
}

export default function ForgotPasswordRoute() {
  return (
    <AuthLayout>
      <AuthCard 
        title="Forgot password?" 
        description="No worries, we'll send you reset instructions."
        footer={<div className="text-sm text-muted-foreground"><a href="/login" className="text-primary hover:underline font-medium">Back to log in</a></div>}
      >
        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}
