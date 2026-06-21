import React from 'react';

export function AuthCard({ children, title, description }: { children: React.ReactNode, title: string, description?: string }) {
  return (
    <div className="bg-card text-card-foreground shadow-sm border border-border rounded-xl overflow-hidden">
      <div className="p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col space-y-1.5 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
