import React from 'react';
import { ProviderButton } from './ProviderButton';

export function SocialAuthSection() {
  return (
    <div className="flex flex-col space-y-3">
      {/* PROVIDER_REGISTRATION_INJECTION will process these, currently a mock rendering */}
      {/* ShipKit will inject: Google, GitHub, Microsoft here */}
      <ProviderButton provider="google" />
      <ProviderButton provider="github" />
      <ProviderButton provider="microsoft" />
    </div>
  );
}
