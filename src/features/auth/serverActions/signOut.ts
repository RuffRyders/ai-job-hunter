'use server'

import { createClient } from '@/common/services/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface AuthActionResponse {
  error?: {
    message: string
  }
}

export const signOut = async (): Promise<AuthActionResponse> => {
  const supabase = createClient()

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      throw error
    }

    if (user) {
      await supabase.auth.signOut()
    }
  } catch (err) {
    let errorMessage = ''

    if (err instanceof Error) {
      errorMessage = err.message
    } else {
      errorMessage = 'Unknown error'
    }

    return {
      error: {
        message: errorMessage,
      },
    }
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}
