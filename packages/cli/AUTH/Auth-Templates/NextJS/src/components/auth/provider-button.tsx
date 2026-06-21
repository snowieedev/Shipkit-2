"use client"
import { TextureButton } from "@/components/ui/texture-button"
import React from "react"

interface ProviderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  providerId: string;
  providerName: string;
  icon?: React.ReactNode;
}

export function ProviderButton({ providerId, providerName, icon, ...props }: ProviderButtonProps) {
  return (
    <TextureButton 
      variant="secondary" 
      className="w-full flex items-center justify-center gap-2"
      data-provider={providerId}
      {...props}
    >
      {icon}
      Continue with {providerName}
    </TextureButton>
  )
}
