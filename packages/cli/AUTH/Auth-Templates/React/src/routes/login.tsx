import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { AuthCard } from '../components/auth/AuthCard';
import { LoginForm } from '../components/auth/LoginForm';
import { SocialAuthSection } from '../components/auth/SocialAuthSection';
import { AuthDivider } from '../components/auth/AuthDivider';
import { AuthHeader } from '../components/auth/AuthHeader';
import { AuthFooter } from '../components/auth/AuthFooter';

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthHeader />
      <AuthCard title="Welcome back" description="Enter your credentials to access your account">
        <LoginForm />
        <AuthDivider />
        <SocialAuthSection />
        <AuthFooter type="login" />
      </AuthCard>
    </AuthLayout>
  );
}
