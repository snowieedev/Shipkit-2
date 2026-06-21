import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';
import { AuthHeader } from '../components/auth/AuthHeader';

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthHeader />
      <AuthCard title="Reset your password" description="Enter your new password below">
        <ResetPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}
