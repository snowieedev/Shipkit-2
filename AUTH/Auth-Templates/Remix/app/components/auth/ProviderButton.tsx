import { TextureButton } from "../ui/texture-button";
import { cn } from "../../lib/utils";

interface ProviderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  providerName: string;
  icon?: React.ReactNode;
}

export function ProviderButton({ providerName, icon, className, ...props }: ProviderButtonProps) {
  return (
    <TextureButton
      variant="secondary"
      className={cn("w-full flex items-center justify-center gap-2", className)}
      {...props}
    >
      {icon}
      <span>Continue with {providerName}</span>
    </TextureButton>
  );
}
