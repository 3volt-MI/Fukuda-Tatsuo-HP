import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const endpoint: string = body?.api ?? ''

  // microCMS の api 名に応じて対象パスを再検証
  const pathMap: Record<string, string[]> = {
    gallery:    ['/gallery'],
    exhibition: ['/gallery'],
    journal:    ['/journal', '/journal/[slug]'],
    statement:  ['/statement'],
    biography:  ['/biography'],
    settings:   ['/', '/contact'],
  }

  const paths = pathMap[endpoint] ?? ['/']
  for (const p of paths) {
    revalidatePath(p)
  }

  return NextResponse.json({ revalidated: true, paths })
}
