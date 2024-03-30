'use client'

import { resendVerifyEmail } from '@/common/data/serverActions/resendVerifyEmail'
import { Button } from '@/common/ui/Button'
import { useState } from 'react'

const VerifyEmailErrorPage = () => {
  const [error, setError] = useState<string | null>(null)

  const handleResendVerificationEmail = async () => {
    const { error } = await resendVerifyEmail()
    if (error) setError(error.message)
    else alert('Verification email sent successfully')
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="mb-10">
        We could not verify your email. Please try again or try resending
        verification email.
      </h1>

      {error && <p className="text-red-500 mb-10">{error}</p>}

      <Button onPress={handleResendVerificationEmail}>
        Resend Verification Email
      </Button>
    </div>
  )
}

export default VerifyEmailErrorPage
