import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto shadow-sm">
      <CardHeader className="space-y-1 items-center text-center">
        <CardTitle className="text-2xl font-semibold tracking-tight">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="flex flex-col gap-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}
