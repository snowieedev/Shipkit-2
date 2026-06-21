import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto border-border bg-card shadow-lg rounded-2xl overflow-hidden">
      <CardHeader className="space-y-2 text-center pb-8 pt-10 px-8">
        <CardTitle className="text-3xl font-bold tracking-tight text-foreground">{title}</CardTitle>
        {description && (
          <CardDescription className="text-muted-foreground text-sm font-medium">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="px-8 pb-8 space-y-6">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="px-8 pb-10 pt-2 flex flex-col justify-center text-center">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
