import React from 'react';
import { Link } from 'react-router-dom';

export function AuthFooter({ type }: { type: 'login' | 'signup' }) {
  return (
    <div className="text-center text-sm text-muted-foreground mt-6">
      {type === 'login' ? (
        <>
          Don't have an account?{' '}
          <Link to="/signup" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </>
      ) : (
        <>
          Already have an account?{' '}
          <Link to="/login" className="underline underline-offset-4 hover:text-primary">
            Sign in
          </Link>
        </>
      )}
    </div>
  );
}
