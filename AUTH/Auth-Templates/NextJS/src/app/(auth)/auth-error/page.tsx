import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthCard } from "@/components/auth/auth-card"
import { AuthError } from "@/components/auth/auth-error"
import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const error = params?.error || "An unknown authentication error occurred."

  return (
    <AuthLayout>
      <AuthCard title="Authentication Error" description="There was a problem processing your request.">
        <div className="space-y-4">
          <AuthError message={error} />
          <div className="text-center text-sm mt-4">
            <Link href="/login" className="underline underline-offset-4 hover:text-primary">
              Back to login
            </Link>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  )
}
