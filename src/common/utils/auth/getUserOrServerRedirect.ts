import { createClient } from '@/common/services/auth/supabase/server'
import { redirect } from 'next/navigation'

interface Params {
  redirectTo?: string
}

export async function getUserOrServerRedirect(params?: Params) {
  const redirectTo = params?.redirectTo || '/login'

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect(redirectTo)
  }

  return data.user
}
