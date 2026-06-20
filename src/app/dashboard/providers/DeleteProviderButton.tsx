'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function DeleteProviderButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function onDelete() {
    if (!confirm('Are you sure you want to remove this provider connection?')) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/providers/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        router.refresh()
      } else {
        alert('Failed to delete provider')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="destructive" size="sm" className="ml-2" onClick={onDelete} disabled={loading}>
      {loading ? 'Removing...' : 'Remove'}
    </Button>
  )
}
