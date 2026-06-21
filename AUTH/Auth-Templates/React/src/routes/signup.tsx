import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { SignupForm } from '../components/auth/SignupForm';
import { SocialAuthSection } from '../components/auth/SocialAuthSection';
import { AuthDivider } from '../components/auth/AuthDivider';
import { AuthHeader } from '../components/auth/AuthHeader';
import { AuthFooter } from '../components/auth/AuthFooter';

export default function SignupPage() {
  return (
    <AuthLayout>
      <AuthHeader />
      <AuthCard title="Create an account" description="Enter your details to get started">
        <SignupForm />
        <AuthDivider />
        <SocialAuthSection />
        <AuthFooter type="signup" />
      </AuthCard>
    </AuthLayout>
  );
}
