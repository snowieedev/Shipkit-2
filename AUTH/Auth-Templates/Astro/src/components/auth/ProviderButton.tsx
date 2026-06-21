import * as React from "react"
import { Button } from "@/components/ui/button"

interface ProviderButtonProps {
  providerId: string;
  providerName: string;
  isLoading?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function ProviderButton({ providerId, providerName, isLoading, onClick, icon }: ProviderButtonProps) {
  return (
    <Button 
      variant="outline" 
      type="button" 
      disabled={isLoading} 
      onClick={onClick}
      className="w-full relative h-11 transition-all duration-200 hover:bg-muted/50 hover:border-foreground/20 font-medium text-sm flex items-center justify-center gap-2"
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2" />
      ) : icon ? (
        icon
      ) : null}
      Continue with {providerName}
    </Button>
  )
}
