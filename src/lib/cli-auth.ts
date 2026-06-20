import { createAdminClient } from '@/lib/supabase/admin'
import { hashApiKey } from '@/lib/api-keys'

export async function verifyCliRequest(request: Request) {
  const authHeader = request.headers.get('Authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Missing or invalid Authorization header', status: 401 }
  }

  const rawKey = authHeader.split(' ')[1]
  const keyHash = hashApiKey(rawKey)
  
  const supabase = createAdminClient()
  
  const { data: keyData, error: keyError } = await supabase
    .from('api_keys')
    .select('project_id, revoked, expires_at')
    .eq('key_hash', keyHash)
    .single()

  if (keyError || !keyData) {
    return { error: 'Invalid API key', status: 401 }
  }

  if (keyData.revoked) {
    return { error: 'API key has been revoked', status: 403 }
  }

  if (keyData.expires_at && new Date(keyData.expires_at) < new Date()) {
    return { error: 'API key has expired', status: 403 }
  }

  return { project_id: keyData.project_id }
}
