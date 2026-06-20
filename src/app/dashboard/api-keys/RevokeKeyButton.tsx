'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function RevokeKeyButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onRevoke() {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone and will break any services using it.')) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/keys/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to revoke key')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={onRevoke} disabled={loading}>
      {loading ? 'Revoking...' : 'Revoke'}
    </Button>
  )
}
