import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthError } from '../components/auth/AuthError';
import { AuthHeader } from '../components/auth/AuthHeader';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function AuthErrorPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const errorType = searchParams.get('error') || 'Unknown error occurred during authentication.';

  return (
    <AuthLayout>
      <AuthHeader />
      <AuthCard title="Authentication Error" description="We encountered a problem signing you in">
        <div className="space-y-4">
          <AuthError message={errorType} />
          
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
          >
            Try again
          </button>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
