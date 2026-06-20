import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  const supabase = await createClient()
  
  let dbQuery = supabase
    .from('registry_features')
    .select('id, name, version, description, author')
    .order('name', { ascending: true })

  if (query) {
    dbQuery = dbQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
  }

  const { data: features, error } = await dbQuery

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ features })
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { feature_name } = json

    if (!feature_name) {
      return NextResponse.json({ error: 'feature_name is required' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: feature, error } = await supabase
      .from('registry_features')
      .select('*')
      .eq('name', feature_name)
      .single()

    if (error || !feature) {
      return NextResponse.json({ error: 'Feature not found in registry' }, { status: 404 })
    }

    return NextResponse.json({
      feature: {
        id: feature.id,
        name: feature.name,
        version: feature.version,
        description: feature.description,
        author: feature.author
      },
      manifest: feature.manifest
    })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

