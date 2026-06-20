import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateApiKey } from '@/lib/api-keys'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Generate new key
  const { rawKey, keyHash } = generateApiKey()

  // Update existing key with new hash, unrevoke, update time
  const { data, error } = await supabase
    .from('api_keys')
    .update({ 
      key_hash: keyHash,
      revoked: false,
      last_used_at: null,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select('id, name, created_at, expires_at, revoked')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ 
    data: {
      ...data,
      raw_key: rawKey
    }
  })
}
