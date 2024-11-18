import { Database } from '@/utils/database.types'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

/**
 * redirectToまたはemailRedirectToを持つ認証メソッドの場合はコードの交換が必要となる
 * @see {@link https://supabase.com/docs/guides/auth/auth-helpers/nextjs?queryGroups=language&language=ts#migration-guide}
 * @see {@link https://supabase.com/docs/guides/auth/passwords}
 * @see {@link https://supabase.com/docs/guides/auth/auth-email-passwordless}
 * @param request リクエスト
 * @returns
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}