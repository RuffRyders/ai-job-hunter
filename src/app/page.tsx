import { Button } from '@/common/ui/Button'
import { redirect } from 'next/navigation'

export default async function Home() {
  // TODO: Figure out what we want to do with the Home route
  async function redirectToLogin() {
    'use server'

    redirect('/login')
  }

  await redirectToLogin()

  return (
    <div className="max-w-5xl h-full p-6 container mx-auto">
      <div className="h-full flex flex-col gap-2 items-center justify-center">
        <Button linkProps={{ href: '/cover-letter' }}>Cover Letter</Button>
        <Button linkProps={{ href: '/resume-editor' }}>Resume Editor</Button>
      </div>
    </div>
  )
}
