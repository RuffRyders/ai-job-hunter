'use client'

import { Button } from '@/common/ui/Button'
import { useRouter } from 'next/navigation'
import { redirectIfLoggedIn } from '@/features/auth/serverActions/redirectIfLoggedIn'
import { useEffect } from 'react'

const VerifyEmailErrorPage = () => {
  const router = useRouter()

  useEffect(() => {
    redirectIfLoggedIn()
  }, [])

  const handleResendButton = async () => {
    router.push('/verify-email/pending')
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="mb-10">
        We could not verify your email. Please try again or try resending
        verification email.
      </h1>

      <Button onPress={handleResendButton}>Resend Verify Email</Button>
    </div>
  )
}

export default VerifyEmailErrorPage
