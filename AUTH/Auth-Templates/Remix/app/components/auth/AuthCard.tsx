import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  return (
    <Card className={cn("w-full shadow-lg border-muted/50", className)}>
      <CardHeader className="space-y-2 text-center pb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="flex flex-col gap-4 text-center">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
