import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CreateProviderDialog } from './CreateProviderDialog'
import { DeleteProviderButton } from './DeleteProviderButton'

export default async function ProvidersPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // First, get the user's projects to verify ownership
  const { data: projects } = await supabase
    .from('projects')
    .select('id, name')
    .eq('user_id', user?.id)

  const projectIds = projects?.map((p: any) => p.id) || []

  // Then fetch providers for these projects
  const { data: providers } = projectIds.length > 0 
    ? await supabase
        .from('provider_connections')
        .select('id, provider_name:provider, created_at, updated_at, projects(name)')
        .in('project_id', projectIds)
        .order('created_at', { ascending: false })
    : { data: [] }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">AI Providers</h2>
          <p className="text-slate-500">Connect and manage AI provider configurations.</p>
        </div>
        <CreateProviderDialog projects={projects || []} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Connected Providers</CardTitle>
        </CardHeader>
        <CardContent>
          {providers && providers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider Name</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Connected At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providers.map((provider: any) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">{provider.provider_name}</TableCell>
                    <TableCell>{provider.projects?.name}</TableCell>
                    <TableCell>{new Date(provider.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <DeleteProviderButton id={provider.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-slate-500">
              No providers connected yet. Connect OpenAI, Anthropic, or others to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
