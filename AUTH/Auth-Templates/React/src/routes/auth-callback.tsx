import React, { useEffect, useState } from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { AuthError } from '../components/auth/AuthError';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallbackPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // AUTH_ENGINE_INJECTION: handleAuthCallback()
        await new Promise(r => setTimeout(r, 1500));
        
        const errParam = searchParams.get('error');
        if (errParam) {
          throw new Error(errParam);
        }
        
        navigate('/');
      } catch (err: any) {
        setError(err.message || 'Authentication failed during callback.');
      }
    };
    handleCallback();
  }, [navigate, searchParams]);

  return (
    <AuthLayout>
      <AuthCard title="Authenticating" description="Please wait while we complete your sign in">
        {error ? (
          <div className="space-y-4">
            <AuthError message={error} />
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
            >
              Return to login
            </button>
          </div>
        ) : (
          <div className="flex justify-center py-8">
            <svg className="h-8 w-8 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
