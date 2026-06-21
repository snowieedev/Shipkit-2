import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthCard } from "../components/auth/AuthCard";
import { SignupForm } from "../components/auth/SignupForm";
import type { Route } from "./+types/signup";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create Account" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function SignupRoute() {
  return (
    <AuthLayout>
      <AuthCard 
        title="Create an account" 
        description="Enter your information to get started"
        footer={<div className="text-sm text-muted-foreground">Already have an account? <a href="/login" className="text-primary hover:underline font-medium">Sign in</a></div>}
      >
        <SignupForm />
      </AuthCard>
    </AuthLayout>
  );
}
