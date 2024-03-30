import { createClient } from '@/common/services/auth/supabase/server'
import { getErrorMessage } from '@/common/utils/getErrorMessage/getErrorMessage'

export async function resendVerifyEmail() {
  try {
    const supabase = createClient()

    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser()

    if (getUserError) {
      throw getUserError
    }

    // Check if there's a current user and we have their email
    if (user && user.email) {
      const { data, error: resendError } = await supabase.auth.resend({
        email: user.email,
        type: 'signup',
      })

      if (resendError) {
        throw resendError
      } else {
        console.log('Verification email sent successfully:', data)
        return {}
      }
    } else {
      const errorMessage = 'No user or user email found'
      throw new Error(errorMessage)
    }
  } catch (err) {
    let errorMessage = getErrorMessage(err)

    console.error('Error resending verification email: ', errorMessage)

    return {
      error: {
        message: errorMessage,
      },
    }
  }
}
