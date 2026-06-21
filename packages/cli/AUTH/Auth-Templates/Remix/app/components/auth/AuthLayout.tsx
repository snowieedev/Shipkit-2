import { cn } from "../../lib/utils";

interface AuthLayoutProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export function AuthLayout({ children, className, ...props }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-muted/30 p-4 md:p-8",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
