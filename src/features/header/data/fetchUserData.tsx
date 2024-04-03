'use server'

import { AppLogger } from '@/common/services/Logger/Logger'
import { createClient } from '@/common/services/supabase/server'

interface FetchUserDataResponse {
  data?: {
    email: string
    avatarUrl: string
  } | null
  error?: string
}

const fetchUserData = async (): Promise<FetchUserDataResponse> => {
  try {
    const supabase = createClient()

    const userId = (await supabase.auth.getUser())?.data?.user?.id

    if (!userId) {
      return {
        error: 'User not found',
      }
    }

    const { data, error } = await supabase
      .from('users')
      .select('email, avatarUrl')
      .eq('id', userId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return {
      data,
    }
  } catch (err) {
    let errorMessage = 'Error fetching user data'
    if (err instanceof Error) {
      errorMessage = err.message
    }

    AppLogger.error(errorMessage)

    return {
      error: errorMessage,
    }
  }
}

export default fetchUserData
