"use client"
import { TextureButton } from "@/components/ui/texture-button"
import { Loader2 } from "lucide-react"
import React from "react"

interface LoadingButtonProps extends React.ComponentProps<typeof TextureButton> {
  loading?: boolean;
}

export function LoadingButton({ children, loading, ...props }: LoadingButtonProps) {
  return (
    <TextureButton disabled={loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </TextureButton>
  )
}
