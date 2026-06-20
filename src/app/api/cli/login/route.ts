import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { email, password } = json

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    // We can also fetch the user's profile to return basic info
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', data.user.id)
      .single()

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: profile?.full_name || email.split('@')[0],
      },
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
      }
    }, { status: 200 })

  } catch (error) {
    console.error('CLI login error:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
