import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthCard } from "../components/auth/AuthCard";
import type { Route } from "./+types/auth.callback";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Authenticating..." },
  ];
}

export default function AuthCallbackRoute() {
  return (
    <AuthLayout>
      <AuthCard 
        title="Authenticating" 
        description="Please wait while we complete your sign in."
      >
        <div className="flex justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
        {/* Placeholders for injection */}
        {/* AUTH_ENGINE_INJECTION */}
        {/* DATABASE_ADAPTER_INJECTION */}
      </AuthCard>
    </AuthLayout>
  );
}
