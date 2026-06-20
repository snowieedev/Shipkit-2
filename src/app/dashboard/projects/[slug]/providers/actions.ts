"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { encrypt } from '@/lib/encryption'
import { logActivity } from '@/lib/activity-logger'

export async function connectSupabase(projectId: string, projectSlug: string, formData: FormData) {
  const url = formData.get('url') as string
  const serviceRoleKey = formData.get('serviceRoleKey') as string

  if (!url || !serviceRoleKey) return { error: 'URL and Service Role Key are required' }

  // 1. Validate credentials by making a request to Supabase REST API
  try {
    const res = await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`
      }
    })
    
    // Some endpoints return 400 for root, but if unauthorized it returns 401. 
    // We check for 401 specifically.
    if (res.status === 401 || res.status === 403) {
      return { error: 'Invalid Supabase credentials' }
    }
  } catch (e) {
    return { error: 'Failed to connect to Supabase URL' }
  }

  // 2. Encrypt & Store
  return saveProviderConnection(projectId, projectSlug, 'supabase', { url, serviceRoleKey })
}

export async function connectResend(projectId: string, projectSlug: string, formData: FormData) {
  const apiKey = formData.get('apiKey') as string

  if (!apiKey) return { error: 'API Key is required' }

  try {
    const res = await fetch('https://api.resend.com/api-keys', {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    })
    if (!res.ok) {
      return { error: 'Invalid Resend API Key' }
    }
  } catch (e) {
    return { error: 'Failed to connect to Resend' }
  }

  return saveProviderConnection(projectId, projectSlug, 'resend', { apiKey })
}

export async function connectPostHog(projectId: string, projectSlug: string, formData: FormData) {
  const host = formData.get('host') as string || 'https://app.posthog.com'
  const apiKey = formData.get('apiKey') as string

  if (!apiKey) return { error: 'API Key is required' }

  try {
    // Posthog validation (basic check)
    // Personal API keys are needed for /api/projects/@current, but if it's a project key, 
    // we can test it by making a dummy capture request, or just save it. 
    // Let's do a dummy decide or capture request to validate.
    const res = await fetch(`${host}/decide?v=3`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: apiKey, distinct_id: 'test_user' })
    })
    if (!res.ok) {
      return { error: 'Invalid PostHog Project API Key or Host' }
    }
  } catch (e) {
    return { error: 'Failed to connect to PostHog' }
  }

  return saveProviderConnection(projectId, projectSlug, 'posthog', { host, apiKey })
}

export async function connectRazorpay(projectId: string, projectSlug: string, formData: FormData) {
  const keyId = formData.get('keyId') as string
  const keySecret = formData.get('keySecret') as string

  if (!keyId || !keySecret) return { error: 'Key ID and Secret are required' }

  try {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
    const res = await fetch('https://api.razorpay.com/v1/customers', {
      headers: { 'Authorization': `Basic ${auth}` }
    })
    if (!res.ok) {
      return { error: 'Invalid Razorpay Credentials' }
    }
  } catch (e) {
    return { error: 'Failed to connect to Razorpay' }
  }

  return saveProviderConnection(projectId, projectSlug, 'razorpay', { keyId, keySecret })
}

export async function disconnectProvider(projectId: string, projectSlug: string, provider: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('provider_connections')
    .delete()
    .eq('project_id', projectId)
    .eq('provider', provider)
    .eq('user_id', user.id)

  if (error) return { error: 'Failed to disconnect provider' }

  await logActivity({
    projectId,
    action: 'DISCONNECT',
    resourceType: 'PROVIDER',
    details: { provider }
  })

  revalidatePath(`/dashboard/projects/${projectSlug}/providers`)
  return { success: true }
}

async function saveProviderConnection(projectId: string, projectSlug: string, provider: string, credentials: any) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  // Encrypt the credentials
  let encryptedData;
  try {
    encryptedData = encrypt(JSON.stringify(credentials))
  } catch (e) {
    console.error('Encryption failed:', e)
    return { error: 'Encryption configuration error' }
  }

  // Upsert the connection
  const { error } = await supabase
    .from('provider_connections')
    .upsert({
      user_id: user.id,
      project_id: projectId,
      provider: provider,
      status: 'connected',
      encrypted_credentials: encryptedData,
      last_checked_at: new Date().toISOString()
    }, {
      onConflict: 'project_id, provider'
    })

  if (error) {
    console.error('Save provider error:', error)
    return { error: 'Failed to save provider connection' }
  }

  await logActivity({
    projectId,
    action: 'CONNECT',
    resourceType: 'PROVIDER',
    details: { provider }
  })

  revalidatePath(`/dashboard/projects/${projectSlug}/providers`)
  return { success: true }
}
