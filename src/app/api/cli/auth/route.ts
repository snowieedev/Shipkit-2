import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { hashApiKey } from '@/lib/api-keys'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid Authorization header' },
        { status: 401 }
      )
    }

    const rawKey = authHeader.split(' ')[1]
    const keyHash = hashApiKey(rawKey)
    
    const supabase = createAdminClient()
    
    // Lookup the key
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('project_id, revoked, expires_at')
      .eq('key_hash', keyHash)
      .single()

    if (keyError || !keyData) {
      return NextResponse.json(
        { success: false, error: 'Invalid API key' },
        { status: 401 }
      )
    }

    if (keyData.revoked) {
      return NextResponse.json(
        { success: false, error: 'API key has been revoked' },
        { status: 403 }
      )
    }

    if (keyData.expires_at && new Date(keyData.expires_at) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'API key has expired' },
        { status: 403 }
      )
    }

    // Lookup the project
    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('id, name, slug')
      .eq('id', keyData.project_id)
      .single()

    if (projectError || !projectData) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    // Update last_used_at
    await supabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('key_hash', keyHash)

    return NextResponse.json({
      success: true,
      data: {
        project: projectData
      }
    })
  } catch (error) {
    console.error('CLI Auth Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
