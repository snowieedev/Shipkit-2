import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function POST(request: Request) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')

  // Hash the incoming token to compare with stored hash
  const keyHash = crypto.createHash('sha256').update(token).digest('hex')

  const supabase = await createClient()

  const { data: apiKey, error } = await supabase
    .from('api_keys')
    .select('*, projects(name, slug)')
    .eq('key_hash', keyHash)
    .eq('revoked', false)
    .single()

  if (error || !apiKey) {
    return NextResponse.json({ error: 'Invalid or revoked API key' }, { status: 401 })
  }

  // Optionally update last_used_at
  await supabase
    .from('api_keys')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', apiKey.id)

  try {
    const json = await request.json()
    const { action } = json

    if (action === 'verify') {
      return NextResponse.json({
        success: true,
        project: apiKey.projects,
        key_name: apiKey.name
      })
    }

    if (action === 'log_installation') {
      const { feature_name, version } = json
      
      await supabase
        .from('installed_features')
        .upsert({
          project_id: apiKey.project_id,
          feature_name,
          version,
          installed_at: new Date().toISOString()
        }, { onConflict: 'project_id,feature_name' })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
}
