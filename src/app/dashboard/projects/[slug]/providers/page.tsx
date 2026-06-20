import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProvidersClient } from "./components/providers-client"

export default async function ProvidersPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('user_id', user?.id)
    .single()

  if (!project) notFound()

  const { data: connections } = await supabase
    .from('provider_connections')
    .select('provider, status, last_checked_at')
    .eq('project_id', project.id)

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <ProvidersClient project={project} connections={connections || []} />
    </div>
  )
}
