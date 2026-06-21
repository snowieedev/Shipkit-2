import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoadingButton } from './LoadingButton';
import { AuthError } from './AuthError';
import { AuthSuccess } from './AuthSuccess';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type Values = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Values) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      // AUTH_ENGINE_INJECTION: sendPasswordResetEmail(data.email)
      console.log('Reset attempt', data);
      await new Promise(r => setTimeout(r, 1000));
      setSuccess('If an account exists, a password reset link has been sent to your email.');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-label="Forgot password form">
      <AuthError message={error} />
      <AuthSuccess message={success} />
      
      {!success && (
        <>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              {...register('email')}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <LoadingButton type="submit" isLoading={isLoading} className="mt-2">
            Send Reset Link
          </LoadingButton>
        </>
      )}
    </form>
  );
}
