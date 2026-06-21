import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthCard } from "../components/auth/AuthCard";
import { LoginForm } from "../components/auth/LoginForm";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In" },
    { name: "description", content: "Sign in to your account" },
  ];
}

export default function LoginRoute() {
  return (
    <AuthLayout>
      <AuthCard 
        title="Welcome back" 
        description="Enter your email to sign in to your account"
        footer={<div className="text-sm text-muted-foreground">Don't have an account? <a href="/signup" className="text-primary hover:underline font-medium">Sign up</a></div>}
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}
