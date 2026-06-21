import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { searchParams } = new URL(request.url)
  // const code = searchParams.get("code")
  
  // {{AUTH_ENGINE}} callback injection
  
  return NextResponse.redirect(new URL("/dashboard", request.url))
}
