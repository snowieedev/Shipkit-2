import { createClient } from '@/lib/supabase/server'

type ActivityAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'CONNECT' | 'DISCONNECT' | 'GENERATE' | 'REVOKE'

export async function logActivity({
  projectId,
  action,
  resourceType,
  details = {}
}: {
  projectId: string;
  action: ActivityAction;
  resourceType: string;
  details?: Record<string, any>;
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase.from('activity_logs').insert({
    user_id: user.id,
    project_id: projectId,
    action,
    resource_type: resourceType,
    details
  })

  if (error) {
    console.error('Failed to log activity:', error)
  }

  return data
}
