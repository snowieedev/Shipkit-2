import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ApiKeysClient } from "./components/api-keys-client"

export default async function ApiKeysPage({
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

  const { data: apiKeys } = await supabase
    .from('api_keys')
    .select('*')
    .eq('project_id', project.id)
    .order('created_at', { ascending: false })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-in-out">
      <ApiKeysClient project={project} apiKeys={apiKeys || []} />
    </div>
  )
}
