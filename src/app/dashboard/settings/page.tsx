import { createClient } from '@/lib/supabase/server'
import { SettingsClient } from './components/settings-client'

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground mt-1">Manage your account and platform preferences.</p>
        </div>
      </div>
      
      <SettingsClient user={user} />
    </div>
  )
}
