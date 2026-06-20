"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProject(formData: FormData) {
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string

  if (!name || !slug) {
    return { error: 'Name and slug are required' }
  }

  // Basic slug validation
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: 'Slug can only contain lowercase letters, numbers, and hyphens' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  // Check if slug exists for this user
  const { data: existing } = await supabase
    .from('projects')
    .select('id')
    .eq('user_id', user.id)
    .eq('slug', slug)
    .single()

  if (existing) {
    return { error: 'A project with this slug already exists' }
  }

  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      name,
      slug,
      description
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating project:', error)
    return { error: 'Failed to create project' }
  }

  // Log activity
  await supabase.from('activity_logs').insert({
    user_id: user.id,
    project_id: data.id,
    action: 'CREATE',
    resource_type: 'PROJECT',
    details: { name: data.name, slug: data.slug }
  })

  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
  
  return { success: true, project: data }
}

export async function deleteProject(projectId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  // Check ownership
  const { data: project } = await supabase
    .from('projects')
    .select('id, name')
    .eq('id', projectId)
    .eq('user_id', user.id)
    .single()

  if (!project) return { error: 'Project not found' }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId)
    .eq('user_id', user.id)

  if (error) return { error: 'Failed to delete project' }

  revalidatePath('/dashboard/projects')
  revalidatePath('/dashboard')
  
  return { success: true }
}

export async function updateProject(formData: FormData) {
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string

  if (!id || !name || !slug) {
    return { error: 'ID, Name, and slug are required' }
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { error: 'Slug can only contain lowercase letters, numbers, and hyphens' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated' }

  // Check if updating to a slug that exists on ANOTHER project
  const { data: existing } = await supabase
    .from('projects')
    .select('id')
    .eq('user_id', user.id)
    .eq('slug', slug)
    .neq('id', id)
    .single()

  if (existing) {
    return { error: 'A project with this slug already exists' }
  }

  const { error } = await supabase
    .from('projects')
    .update({ name, slug, description })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating project:', error)
    return { error: 'Failed to update project' }
  }

  await supabase.from('activity_logs').insert({
    user_id: user.id,
    project_id: id,
    action: 'UPDATE',
    resource_type: 'PROJECT',
    details: { name, slug }
  })

  revalidatePath('/dashboard/projects')
  revalidatePath(`/dashboard/projects/${slug}`)
  revalidatePath('/dashboard')
  
  return { success: true }
}
