import { Button } from '@/common/ui/Button'
import { redirectIfLoggedIn } from '@/features/auth/serverActions/redirectIfLoggedIn'
import Link from 'next/link'

const VerifyEmailSuccessPage = async () => {
  await redirectIfLoggedIn()

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h1 className="mb-10">Your email has been verified!</h1>
      <Link href="/">
        <Button>Get Started</Button>
      </Link>
    </div>
  )
}

export default VerifyEmailSuccessPage
