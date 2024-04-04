'use server'

import { AppLogger } from '@/common/services/Logger/Logger'
import { createClient } from '@/common/services/supabase/server'

const tableName = 'users'

interface GetUserDataResponse {
  data?: {
    email: string
    avatarUrl?: string
  }
  error?: string
}

export const getUserData = async (): Promise<GetUserDataResponse> => {
  try {
    const supabase = createClient()

    const userId = (await supabase.auth.getUser())?.data?.user?.id

    if (!userId) {
      return {
        error: 'User not found',
      }
    }

    const { data, error } = await supabase
      .from(tableName)
      .select('email, avatarUrl')
      .eq('id', userId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    const email = data?.email ?? undefined
    const avatarUrl = data?.avatarUrl ?? undefined

    if (!email) {
      throw new Error('Email not found')
    }

    return {
      data: {
        email,
        avatarUrl,
      },
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
