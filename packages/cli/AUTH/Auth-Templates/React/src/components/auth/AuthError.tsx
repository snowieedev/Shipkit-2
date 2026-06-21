import React from 'react';

export function AuthError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <span>{message}</span>
    </div>
  );
}
