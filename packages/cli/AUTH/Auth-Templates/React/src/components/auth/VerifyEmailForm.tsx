import React, { useState, useEffect } from 'react';
import { LoadingButton } from './LoadingButton';
import { AuthError } from './AuthError';
import { AuthSuccess } from './AuthSuccess';
import { useSearchParams } from 'react-router-dom';

export function VerifyEmailForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  const verifyToken = async (verificationToken: string) => {
    setIsVerifying(true);
    try {
      // AUTH_ENGINE_INJECTION: verifyEmail(verificationToken)
      await new Promise(r => setTimeout(r, 1500));
      setSuccess('Email verified successfully! You can now close this page or return to the app.');
    } catch (err: any) {
      setError(err.message || 'Verification failed. The link may have expired.');
    } finally {
      setIsVerifying(false);
    }
  };

  const onResend = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      // AUTH_ENGINE_INJECTION: resendVerificationEmail()
      await new Promise(r => setTimeout(r, 1000));
      setSuccess('A new verification link has been sent to your email.');
    } catch (err: any) {
      setError(err.message || 'Failed to resend verification email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-center">
      <AuthError message={error} />
      <AuthSuccess message={success} />
      
      {isVerifying ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <svg className="h-8 w-8 animate-spin text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm text-muted-foreground">Verifying your email address...</p>
        </div>
      ) : !success && !token && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We sent a verification link to your email address. Please click the link to verify your account.
          </p>
          <div className="pt-4">
            <LoadingButton type="button" onClick={onResend} isLoading={isLoading} variant="outline" className="bg-transparent border border-input text-foreground hover:bg-accent">
              Resend Verification Email
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
}
