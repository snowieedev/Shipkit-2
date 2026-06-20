import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CreateApiKeyDialog } from './CreateApiKeyDialog'
import { RevokeKeyButton } from './RevokeKeyButton'

export default async function ApiKeysPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // First, get the user's projects to verify ownership
  const { data: projects } = await supabase
    .from('projects')
    .select('id, name')
    .eq('user_id', user?.id)

  const projectIds = projects?.map((p: any) => p.id) || []

  // Then fetch keys for these projects
  const { data: keys } = projectIds.length > 0 
    ? await supabase
        .from('api_keys')
        .select('*, projects(name)')
        .in('project_id', projectIds)
        .order('created_at', { ascending: false })
    : { data: [] }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">API Keys</h2>
          <p className="text-slate-500">Manage API keys for your projects.</p>
        </div>
        <CreateApiKeyDialog projects={projects || []} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Keys</CardTitle>
        </CardHeader>
        <CardContent>
          {keys && keys.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((key: any) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell>{key.projects?.name}</TableCell>
                    <TableCell>{key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}</TableCell>
                    <TableCell>{new Date(key.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {key.revoked ? (
                        <span className="text-red-500 text-sm font-medium">Revoked</span>
                      ) : (
                        <span className="text-green-500 text-sm font-medium">Active</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {!key.revoked && <RevokeKeyButton id={key.id} />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-slate-500">
              No API keys generated yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
