import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@/common/services/supabase/server'
import { NextURL } from 'next/dist/server/web/next-url'

/**
 * Verification email contains link to this route.  (https://supabase.com/dashboard/project/hmkrejoaprtoeniopyap/auth/templates)
 *
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  const redirectToSuccess = new NextURL('/verify-email/success', request.nextUrl.origin)
  const redirectToError = new NextURL('/verify-email/error', request.nextUrl.origin)

  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      return NextResponse.redirect(redirectToSuccess)
    }
  }

  return NextResponse.redirect(redirectToError)
}
