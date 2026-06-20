"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { generateApiKey as generateKeyUtil } from '@/lib/api-keys'
import { logActivity } from '@/lib/activity-logger'

export async function createApiKey(projectId: string, projectSlug: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  // Verify project ownership
  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('id', projectId)
    .eq('user_id', user.id)
    .single()

  if (!project) return { error: 'Project not found' }

  const { rawKey, keyHash } = generateKeyUtil()
  const keyPrefix = rawKey.substring(0, 15) + '...'

  const { data, error } = await supabase
    .from('api_keys')
    .insert({
      user_id: user.id,
      project_id: projectId,
      key_hash: keyHash,
      key_prefix: keyPrefix
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating API key:', error)
    return { error: 'Failed to generate API key' }
  }

  await logActivity({
    projectId,
    action: 'GENERATE',
    resourceType: 'API_KEY',
    details: { key_prefix: keyPrefix }
  })

  revalidatePath(`/dashboard/projects/${projectSlug}/api-keys`)
  
  // Return rawKey ONLY THIS ONE TIME
  return { success: true, key: data, rawKey }
}

export async function revokeApiKey(keyId: string, projectId: string, projectSlug: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('api_keys')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', keyId)
    .eq('project_id', projectId)
    .eq('user_id', user.id)

  if (error) return { error: 'Failed to revoke API key' }

  await logActivity({
    projectId,
    action: 'REVOKE',
    resourceType: 'API_KEY',
    details: { key_id: keyId }
  })

  revalidatePath(`/dashboard/projects/${projectSlug}/api-keys`)
  
  return { success: true }
}
