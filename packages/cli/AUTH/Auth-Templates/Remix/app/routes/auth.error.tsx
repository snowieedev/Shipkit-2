import { AuthLayout } from "../components/auth/AuthLayout";
import { AuthCard } from "../components/auth/AuthCard";
import { TextureButton } from "../components/ui/texture-button";
import type { Route } from "./+types/auth.error";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Authentication Error" },
  ];
}

export default function AuthErrorRoute() {
  return (
    <AuthLayout>
      <AuthCard 
        title="Authentication Error" 
        description="Something went wrong during authentication."
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20">
          <p className="text-sm font-medium">Unable to sign in. Please try again.</p>
        </div>
        
        <div className="pt-4">
          <a href="/login" className="block w-full">
            <TextureButton variant="secondary" className="w-full">
              Back to log in
            </TextureButton>
          </a>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
