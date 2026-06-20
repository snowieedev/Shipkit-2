import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CreateProjectDialog } from './components/create-project-dialog'
import { DeleteProjectButton } from './components/delete-project-button'
import { EditProjectDialog } from './components/edit-project-dialog'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground mt-1">Manage your ShipKit projects and their integrations.</p>
        </div>
        <CreateProjectDialog />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>A list of all projects you have created.</CardDescription>
        </CardHeader>
        <CardContent>
          {projects && projects.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project: any) => (
                  <TableRow key={project.id} className="group">
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/projects/${project.slug}`} className="hover:underline flex items-center gap-2">
                        {project.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{project.slug}</TableCell>
                    <TableCell className="text-muted-foreground">{new Date(project.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Button variant="ghost" size="icon" asChild className="opacity-0 group-hover:opacity-100 transition-opacity">
                           <Link href={`/dashboard/projects/${project.slug}`}>
                             <ArrowRight className="h-4 w-4" />
                             <span className="sr-only">Go to project</span>
                           </Link>
                        </Button>
                        <EditProjectDialog project={project} />
                        <DeleteProjectButton id={project.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                You haven't created any projects yet. Create your first project to get started.
              </p>
              <CreateProjectDialog />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
