import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { hashApiKey } from '@/lib/api-keys'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Missing or invalid session token' },
        { status: 401 }
      )
    }

    const sessionToken = authHeader.split(' ')[1]
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(sessionToken)
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid session.' },
        { status: 401 }
      )
    }

    const json = await request.json()
    const { apiKey } = json

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'API key is required' },
        { status: 400 }
      )
    }

    const keyHash = hashApiKey(apiKey)
    const adminSupabase = createAdminClient()
    
    // Lookup the key
    const { data: keyData, error: keyError } = await adminSupabase
      .from('api_keys')
      .select('project_id, revoked, expires_at, user_id')
      .eq('key_hash', keyHash)
      .single()

    if (keyError || !keyData) {
      return NextResponse.json(
        { success: false, error: 'Invalid API key' },
        { status: 401 }
      )
    }

    // Ensure the key belongs to the current user
    if (keyData.user_id !== user.id) {
       return NextResponse.json(
        { success: false, error: 'API key does not belong to the current user' },
        { status: 403 }
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

    // Update last_used_at
    await adminSupabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('key_hash', keyHash)

    return NextResponse.json({
      success: true,
      message: 'API key verified successfully'
    })
  } catch (error) {
    console.error('CLI Verify Key Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
