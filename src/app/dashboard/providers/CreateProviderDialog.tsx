'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CreateProviderDialog({ projects }: { projects: { id: string, name: string }[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [projectId, setProjectId] = useState('')
  const [providerName, setProviderName] = useState('')
  const [configValue, setConfigValue] = useState('')
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!projectId) return alert('Select a project')
    
    setLoading(true)

    // Example naive configuration object parsing
    let parsedConfig = {}
    try {
      parsedConfig = { token: configValue }
    } catch (e) {
      console.warn(e)
    }

    try {
      const res = await fetch('/api/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: projectId, provider_name: providerName, configuration: parsedConfig }),
      })

      if (res.ok) {
        setOpen(false)
        setProjectId('')
        setProviderName('')
        setConfigValue('')
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to connect provider')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        Connect Provider
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Connect Provider</DialogTitle>
            <DialogDescription>
              Store encrypted credentials for external providers (e.g., Stripe, OpenAI).
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="providerName">Provider Name</Label>
              <Input
                id="providerName"
                value={providerName}
                onChange={(e) => setProviderName(e.target.value.toLowerCase())}
                placeholder="e.g. stripe, openai, resend"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <select
                id="project"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              >
                <option value="" disabled>Select a project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="configValue">API Token / Secret</Label>
              <Input
                id="configValue"
                type="password"
                value={configValue}
                onChange={(e) => setConfigValue(e.target.value)}
                placeholder="sk_test_..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Connecting...' : 'Connect'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
