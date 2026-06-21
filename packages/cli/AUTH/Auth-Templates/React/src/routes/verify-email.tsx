import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { VerifyEmailForm } from '../components/auth/VerifyEmailForm';
import { AuthHeader } from '../components/auth/AuthHeader';

export default function VerifyEmailPage() {
  return (
    <AuthLayout>
      <AuthHeader />
      <AuthCard title="Verify your email" description="Check your inbox for a verification link">
        <VerifyEmailForm />
      </AuthCard>
    </AuthLayout>
  );
}
