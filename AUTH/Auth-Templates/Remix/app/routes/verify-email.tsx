import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthCard } from "../components/auth/AuthCard";
import { VerifyEmailForm } from "../components/auth/VerifyEmailForm";
import type { Route } from "./+types/verify-email";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Verify Email" },
    { name: "description", content: "Verify your email address" },
  ];
}

export default function VerifyEmailRoute() {
  return (
    <AuthLayout>
      <AuthCard 
        title="Check your email" 
      >
        {/* Pass email or isVerifyingLink depending on URL params when integrated */}
        <VerifyEmailForm />
      </AuthCard>
    </AuthLayout>
  );
}
