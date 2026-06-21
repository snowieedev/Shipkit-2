import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoadingButton } from './LoadingButton';
import { PasswordInput } from './PasswordInput';
import { AuthError } from './AuthError';
import { AuthSuccess } from './AuthSuccess';
import { useNavigate, useSearchParams } from 'react-router-dom';

const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type Values = z.infer<typeof schema>;

export function ResetPasswordForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const password = watch('password', '');

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 8) score += 1;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score += 1;
    if (/\d/.test(pass)) score += 1;
    if (/[^a-zA-Z\d]/.test(pass)) score += 1;
    return score;
  };

  const strength = calculateStrength(password);

  const onSubmit = async (data: Values) => {
    if (!token) {
      setError('Invalid or missing reset token.');
      return;
    }
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      // AUTH_ENGINE_INJECTION: resetPassword(token, data.password)
      console.log('Reset password attempt', { token, ...data });
      await new Promise(r => setTimeout(r, 1000));
      setSuccess('Your password has been reset successfully.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. The link may have expired.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-label="Reset password form">
      <AuthError message={error || (!token ? 'Missing reset token in URL' : '')} />
      <AuthSuccess message={success} />
      
      {!success && (
        <>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium leading-none">New Password</label>
            <PasswordInput 
              id="password" 
              placeholder="••••••••" 
              {...register('password')}
            />
            {password && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={`h-1 w-full rounded-full ${i <= strength ? (strength > 2 ? 'bg-emerald-500' : strength > 1 ? 'bg-yellow-500' : 'bg-destructive') : 'bg-muted'}`}
                  />
                ))}
              </div>
            )}
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">Confirm New Password</label>
            <PasswordInput 
              id="confirmPassword" 
              placeholder="••••••••" 
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
          </div>

          <LoadingButton type="submit" isLoading={isLoading} disabled={!token} className="mt-2">
            Reset Password
          </LoadingButton>
        </>
      )}
    </form>
  );
}
