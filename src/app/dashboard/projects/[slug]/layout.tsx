import { ReactNode } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function ProjectLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: project } = await supabase
    .from('projects')
    .select('id, name, slug')
    .eq('slug', slug)
    .eq('user_id', user?.id)
    .single()

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
        <div className="flex gap-4 mt-4">
          <Link href={`/dashboard/projects/${slug}`} className="text-sm font-medium hover:text-primary transition-colors">
            Overview
          </Link>
          <Link href={`/dashboard/projects/${slug}/api-keys`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            API Keys
          </Link>
          <Link href={`/dashboard/projects/${slug}/providers`} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Providers
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}
