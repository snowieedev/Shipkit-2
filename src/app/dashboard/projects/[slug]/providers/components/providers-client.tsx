"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, Link as LinkIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { connectSupabase, connectResend, connectPostHog, connectRazorpay, disconnectProvider } from "../actions"

function Github({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export function ProvidersClient({ project, connections }: { project: any, connections: any[] }) {
  const [isLoading, setIsLoading] = useState(false)
  
  const getConnection = (providerId: string) => connections.find(c => c.provider === providerId)

  const handleDisconnect = async (providerId: string) => {
    setIsLoading(true)
    const result = await disconnectProvider(project.id, project.slug, providerId)
    setIsLoading(false)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(`${providerId} disconnected successfully`)
    }
  }

  const ProviderCard = ({ 
    id, 
    title, 
    description, 
    icon, 
    formContent, 
    action 
  }: any) => {
    const conn = getConnection(id)
    const isConnected = !!conn
    const [open, setOpen] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      const formData = new FormData(e.currentTarget)
      const result = await action(project.id, project.slug, formData)
      setIsLoading(false)

      if (result?.error) {
        toast.error(result.error)
      } else if (result?.success) {
        toast.success(`${title} connected successfully`)
        setOpen(false)
      }
    }

    return (
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-secondary rounded-md">{icon}</div>
              <CardTitle className="text-xl">{title}</CardTitle>
            </div>
            {isConnected ? (
              <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">
                <CheckCircle2 className="mr-1 h-3 w-3" /> Connected
              </Badge>
            ) : (
              <Badge variant="outline" className="text-muted-foreground">
                Disconnected
              </Badge>
            )}
          </div>
          <CardDescription className="pt-2">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          {isConnected && conn.last_checked_at && (
            <p className="text-xs text-muted-foreground">Last checked: {new Date(conn.last_checked_at).toLocaleString()}</p>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
          {isConnected ? (
            <Button variant="destructive" onClick={() => handleDisconnect(id)} disabled={isLoading} className="w-full">
              Disconnect
            </Button>
          ) : (
            id === 'github' ? (
              <Button variant="outline" className="w-full" onClick={() => alert('OAuth flow will be implemented in a future update.')}>
                Connect GitHub
              </Button>
            ) : (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger render={<Button variant="default" className="w-full" />}>
                  Connect
                </DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>Connect {title}</DialogTitle>
                      <DialogDescription>Enter your {title} credentials. We will verify and encrypt them securely.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {formContent}
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isLoading}>{isLoading ? "Connecting..." : "Connect"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )
          )}
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integrations</h3>
        <p className="text-sm text-muted-foreground">Connect third-party providers to power your project features.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProviderCard
          id="supabase"
          title="Supabase"
          description="Connect your database for authentication and storage."
          icon={<LinkIcon className="h-5 w-5" />}
          action={connectSupabase}
          formContent={
            <>
              <div className="grid gap-2">
                <Label htmlFor="url">Project URL</Label>
                <Input id="url" name="url" placeholder="https://xxxx.supabase.co" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="serviceRoleKey">Service Role Key</Label>
                <Input id="serviceRoleKey" name="serviceRoleKey" type="password" required />
              </div>
            </>
          }
        />

        <ProviderCard
          id="resend"
          title="Resend"
          description="Send transactional emails and marketing campaigns."
          icon={<LinkIcon className="h-5 w-5" />}
          action={connectResend}
          formContent={
            <>
              <div className="grid gap-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input id="apiKey" name="apiKey" type="password" placeholder="re_123456789" required />
              </div>
            </>
          }
        />

        <ProviderCard
          id="posthog"
          title="PostHog"
          description="Product analytics, feature flags, and session recording."
          icon={<LinkIcon className="h-5 w-5" />}
          action={connectPostHog}
          formContent={
            <>
              <div className="grid gap-2">
                <Label htmlFor="host">Host URL</Label>
                <Input id="host" name="host" defaultValue="https://app.posthog.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="apiKey">Project API Key</Label>
                <Input id="apiKey" name="apiKey" type="password" placeholder="phc_..." required />
              </div>
            </>
          }
        />

        <ProviderCard
          id="razorpay"
          title="Razorpay"
          description="Process payments and manage subscriptions in India."
          icon={<LinkIcon className="h-5 w-5" />}
          action={connectRazorpay}
          formContent={
            <>
              <div className="grid gap-2">
                <Label htmlFor="keyId">Key ID</Label>
                <Input id="keyId" name="keyId" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="keySecret">Key Secret</Label>
                <Input id="keySecret" name="keySecret" type="password" required />
              </div>
            </>
          }
        />

        <ProviderCard
          id="github"
          title="GitHub"
          description="Connect your repositories to sync features and deploy."
          icon={<Github className="h-5 w-5" />}
          action={null} // Handled differently due to OAuth
          formContent={null}
        />
      </div>
    </div>
  )
}
