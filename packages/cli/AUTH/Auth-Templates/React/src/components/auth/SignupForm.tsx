import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoadingButton } from './LoadingButton';
import { PasswordInput } from './PasswordInput';
import { AuthError } from './AuthError';
import { useNavigate } from 'react-router-dom';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
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

  const onSubmit = async (data: SignupValues) => {
    setIsLoading(true);
    setError('');
    try {
      // AUTH_ENGINE_INJECTION: register(data.email, data.password, data.fullName)
      console.log('Signup attempt', data);
      await new Promise(r => setTimeout(r, 1000));
      navigate('/verify-email');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-label="Signup form">
      <AuthError message={error} />
      
      <div className="space-y-2">
        <label htmlFor="fullName" className="text-sm font-medium leading-none">Full Name</label>
        <input 
          id="fullName" 
          placeholder="John Doe" 
          className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          {...register('fullName')}
        />
        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
      </div>

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

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
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
        <label htmlFor="confirmPassword" className="text-sm font-medium leading-none">Confirm Password</label>
        <PasswordInput 
          id="confirmPassword" 
          placeholder="••••••••" 
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
      </div>

      <LoadingButton type="submit" isLoading={isLoading} className="mt-4">
        Create account
      </LoadingButton>
    </form>
  );
}
