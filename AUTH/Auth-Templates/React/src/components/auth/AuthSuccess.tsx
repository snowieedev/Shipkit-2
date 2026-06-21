import React from 'react';

export function AuthSuccess({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm p-3 rounded-md border border-emerald-500/20 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span>{message}</span>
    </div>
  );
}
