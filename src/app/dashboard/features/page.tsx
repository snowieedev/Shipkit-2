import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default async function FeaturesPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: projects } = await supabase
    .from('projects')
    .select('id, name')
    .eq('user_id', user?.id)

  const projectIds = projects?.map(p => p.id) || []

  const { data: features } = projectIds.length > 0 
    ? await supabase
        .from('installed_features')
        .select('*, projects(name)')
        .in('project_id', projectIds)
        .order('installed_at', { ascending: false })
    : { data: [] }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Installed Features</h2>
          <p className="text-slate-500">Manage features installed from the ShipKit registry.</p>
        </div>
        <Button>Browse Registry</Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Installed Features</CardTitle>
        </CardHeader>
        <CardContent>
          {features && features.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature Name</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Installed At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.id}>
                    <TableCell className="font-medium">{feature.feature_name}</TableCell>
                    <TableCell>{feature.version}</TableCell>
                    <TableCell>{feature.projects?.name}</TableCell>
                    <TableCell>{new Date(feature.installed_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Update</Button>
                      <Button variant="destructive" size="sm" className="ml-2">Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-slate-500">
              No features installed yet. Browse the registry using the CLI or Dashboard to install features.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
