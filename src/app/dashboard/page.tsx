import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Box, Key, Link as LinkIcon, Activity } from 'lucide-react'

export default async function DashboardOverview() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // Fetch counts
  const [
    { count: projectsCount },
    { count: keysCount },
    { count: providersCount },
    { count: activityCount },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('user_id', user?.id),
    supabase.from('api_keys').select('id', { count: 'exact', head: true }).eq('user_id', user?.id),
    supabase.from('provider_connections').select('id', { count: 'exact', head: true }).eq('user_id', user?.id),
    supabase.from('activity_logs').select('id', { count: 'exact', head: true }).eq('user_id', user?.id),
  ])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Welcome back. Here is the overview of your ShipKit platform.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectsCount || 0}</div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keysCount || 0}</div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Providers</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providersCount || 0}</div>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Logs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activityCount || 0}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
