'use client'

import { resendVerifyEmail } from '@/features/auth/serverActions/verifyEmail/resendVerifyEmail'
import { Button } from '@/common/ui/Button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { VerifyEmailErrorCodes } from '@/features/auth/serverActions/verifyEmail/constants'
import { Input } from '@/common/ui/Input/Input'
import LoadingOverlay from '@/common/ui/LoadingOverlay'

// TODO if already verified redirect to '/'

const VerifyEmailPendingPage = () => {
  const [error, setError] = useState<string | null>(null)
  const [emailInputError, setEmailInputError] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleResendVerificationEmail = async () => {
    setLoading(true)
    setError(null)
    setEmailInputError(null)

    if (!email) {
      setEmailInputError('Please enter an email address')
      setLoading(false)
      return
    }

    const { error } = await resendVerifyEmail(email)

    setLoading(false)
    if (error) {
      setError(error.message)
    } else alert('Verification email sent successfully')
  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="mb-10 text-center">
        Please check your inbox for a verification email. Click the link in the
        email to complete your registration.
      </h1>

      {error && <p className="text-red-500 mb-10">{error}</p>}

      <>
        <p className="mb-4">{"Don't see the email?"}</p>
        {emailInputError && (
          <p className="text-red-500 mb-2">{emailInputError}</p>
        )}

        <Input
          type="email"
          onChange={handleChangeEmail}
          className="mb-4"
          placeholder="enter email address"
        />

        <Button onPress={handleResendVerificationEmail}>
          Resend Verification Email
        </Button>
      </>

      <LoadingOverlay loading={loading} />
    </div>
  )
}

export default VerifyEmailPendingPage
