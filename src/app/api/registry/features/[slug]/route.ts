import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  // Foundation for feature details
  const feature = {
    name: slug,
    version: "1.0.0",
    description: `Details for ${slug} module`,
    install_command: `npx shipkit install ${slug}`
  }

  return NextResponse.json({
    success: true,
    data: feature
  })
}
