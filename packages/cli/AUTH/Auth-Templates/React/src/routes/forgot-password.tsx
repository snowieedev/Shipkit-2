import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';
import { AuthHeader } from '../components/auth/AuthHeader';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthHeader />
      <AuthCard title="Forgot password" description="Enter your email to receive a reset link">
        <ForgotPasswordForm />
        <div className="text-center text-sm text-muted-foreground mt-4">
          <Link to="/login" className="underline underline-offset-4 hover:text-primary">
            Back to login
          </Link>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
