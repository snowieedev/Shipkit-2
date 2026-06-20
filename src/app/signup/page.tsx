import { signup } from '@/app/login/actions'
import { TextureButton } from '@/components/ui/texture-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { ArrowLeft, Rocket } from 'lucide-react'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-6">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-2 text-3xl font-bold leading-9 tracking-tight text-foreground">
              Get started with ShipKit
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Create your account to start managing your features.
            </p>
          </div>

          <div className="mt-10">
            <form action={signup} className="space-y-6">
              {error && (
                <div className="rounded-md bg-destructive/15 p-4 text-sm text-destructive font-medium">
                  {error}
                </div>
              )}

              <div>
                <Label htmlFor="full_name" className="block text-sm font-medium leading-6 text-foreground">
                  Full Name
                </Label>
                <div className="mt-2">
                  <Input
                    id="full_name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="John Doe"
                    className="h-11"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground">
                  Email address
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@company.com"
                    className="h-11"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium leading-6 text-foreground">
                  Password
                </Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div>
                <TextureButton type="submit" variant="primary" className="w-full h-11 text-base shadow-sm">
                  Create Account
                </TextureButton>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold leading-6 text-primary hover:text-primary/80">
                Log in instead
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Hidden on mobile */}
      <div className="relative hidden w-0 flex-1 lg:block bg-muted">
        <div className="absolute inset-0 h-full w-full object-cover overflow-hidden bg-zinc-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
             <div className="h-32 w-32 rounded-full bg-primary/20 blur-3xl absolute"></div>
             <h3 className="text-3xl font-bold text-white relative z-10 tracking-tight text-center">
               Join the community <br/> of builders.
             </h3>
             <p className="text-zinc-400 mt-4 text-center max-w-sm relative z-10">
               ShipKit powers thousands of projects worldwide. Start building yours today.
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
