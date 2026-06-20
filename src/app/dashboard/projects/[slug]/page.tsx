import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Key, Link as LinkIcon } from "lucide-react"

export default async function ProjectOverviewPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: project } = await supabase
    .from('projects')
    .select('id')
    .eq('slug', slug)
    .eq('user_id', user?.id)
    .single()

  if (!project) notFound()

  // Fetch counts
  const [
    { count: keysCount },
    { count: providersCount },
  ] = await Promise.all([
    supabase.from('api_keys').select('id', { count: 'exact', head: true }).eq('project_id', project.id),
    supabase.from('provider_connections').select('id', { count: 'exact', head: true }).eq('project_id', project.id),
  ])

  // Fetch recent activity
  const { data: recentActivity } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('project_id', project.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keysCount || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Providers</CardTitle>
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providersCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions performed in this project.</CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivity && recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((log: any) => (
                <div key={log.id} className="flex items-center gap-4 text-sm border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none">
                      {log.action} {log.resource_type}
                    </p>
                    <p className="text-muted-foreground">
                      {new Date(log.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No recent activity.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
