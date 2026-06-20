'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function CreateApiKeyDialog({ projects }: { projects: { id: string, name: string }[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [projectId, setProjectId] = useState('')
  const [rawKey, setRawKey] = useState('')
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!projectId) return alert('Select a project')
    
    setLoading(true)
    setRawKey('')

    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, project_id: projectId }),
      })

      const data = await res.json()
      
      if (res.ok) {
        setRawKey(data.rawKey)
        setName('')
        setProjectId('')
        router.refresh()
      } else {
        alert(data.error || 'Failed to create key')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleClose(isOpen: boolean) {
    if (!isOpen) {
      setOpen(false)
      setRawKey('')
    } else {
      setOpen(true)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger render={<Button />}>
        Generate Key
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {rawKey ? (
          <div>
            <DialogHeader>
              <DialogTitle>Key Generated Successfully</DialogTitle>
              <DialogDescription>
                Copy your new API key now. You will not be able to see it again!
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <Input readOnly value={rawKey} className="font-mono bg-muted" />
            </div>
            <DialogFooter>
              <Button onClick={() => handleClose(false)}>Done</Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Generate API Key</DialogTitle>
              <DialogDescription>
                Create a new API key scoped to a specific project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Key Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CI/CD Pipeline"
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
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? 'Generating...' : 'Generate'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
