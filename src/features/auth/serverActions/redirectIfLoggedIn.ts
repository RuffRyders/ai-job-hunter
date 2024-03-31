'use server'

import { CANDIDATE_HOME_PAGE } from '@/common/data/config/appConfig'
import { createClient } from '@/common/services/supabase/server'
import { redirect } from 'next/navigation'

export const redirectIfLoggedIn = async () => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (data.user && data.user.email_confirmed_at) {
    redirect(CANDIDATE_HOME_PAGE)
  }

  return
}
