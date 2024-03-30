'use server'

import { createClient } from '@/features/auth/supabase/server'
import { getErrorMessage } from '@/common/utils/getErrorMessage/getErrorMessage'
import { VerifyEmailErrorCodes } from './constants'

interface ResendVerifyEmailResponse {
  error?: {
    message: string
    code: VerifyEmailErrorCodes
  }
}

export async function resendVerifyEmail(
  email: string,
): Promise<ResendVerifyEmailResponse> {
  try {
    const supabase = createClient()

    const { data, error: resendError } = await supabase.auth.resend({
      email,
      type: 'signup',
    })

    if (resendError) {
      throw resendError
    } else {
      console.log('Verification email sent successfully:', data)
      return {}
    }
  } catch (err) {
    let errorMessage = getErrorMessage(err)

    console.error('Error resending verification email: ', errorMessage)

    return {
      error: {
        message: errorMessage,
        code: VerifyEmailErrorCodes.UNKNOWN,
      },
    }
  }
}
