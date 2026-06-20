"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(formData: FormData) {
  const fullName = formData.get('fullName') as string
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // We store full_name in auth.users user_metadata
  const { error } = await supabase.auth.updateUser({
    data: { full_name: fullName }
  })

  if (error) return { error: 'Failed to update profile' }

  revalidatePath('/dashboard/settings')
  return { success: true }
}

export async function updatePassword(formData: FormData) {
  const password = formData.get('password') as string
  const supabase = await createClient()

  if (!password || password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) return { error: 'Failed to update password' }

  return { success: true }
}
