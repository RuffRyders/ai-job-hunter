'use server'

import { createClient } from '@/common/services/auth/supabase/server'
import { User } from '@supabase/supabase-js'

interface GetUserDataActionProps {
  user?: User
  error?: string
}

export async function getUserData(): Promise<GetUserDataActionProps> {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return { error: 'Internal error' }
  }

  return { user: data.user }
}
