import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import crypto from 'crypto'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Uses RLS to only fetch keys for projects the user owns
  const { data, error } = await supabase
    .from('api_keys')
    .select('*, projects(name)')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ keys: data })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const json = await request.json()
    const { name, project_id } = json

    if (!name || !project_id) {
      return NextResponse.json({ error: 'Name and project_id are required' }, { status: 400 })
    }

    // Verify project belongs to user
    const { data: project } = await supabase
      .from('projects')
      .select('id')
      .eq('id', project_id)
      .eq('user_id', user.id)
      .single()

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Generate real API key (only returned once)
    const rawKey = `sk_${crypto.randomBytes(24).toString('hex')}`
    
    // Hash key for storage
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex')

    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        project_id,
        name,
        key_hash: keyHash,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Return the raw key ONLY this time
    return NextResponse.json({ key: data, rawKey }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
