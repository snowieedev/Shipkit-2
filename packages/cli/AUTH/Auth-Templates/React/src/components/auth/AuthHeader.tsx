import React from 'react';
import { Link } from 'react-router-dom';

export function AuthHeader() {
  return (
    <div className="flex flex-col space-y-2 text-center mb-6">
      <Link to="/" className="inline-flex items-center justify-center gap-2 mb-2 font-semibold">
        <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
        </div>
        <span className="text-xl">Acme Inc</span>
      </Link>
    </div>
  );
}
