import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
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

    // Fetch the user's profile to return basic info
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user.id)
      .single()

    // Determine the plan (this could be from subscriptions table, defaulting to 'Pro' as a placeholder)
    let plan = 'Pro'
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('plan')
      .eq('user_id', user.id)
      .single()
      
    if (subscription && subscription.plan) {
      plan = subscription.plan
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: profile?.full_name || user.email?.split('@')[0] || 'Unknown',
        plan: plan
      }
    }, { status: 200 })

  } catch (error) {
    console.error('CLI Whoami Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
