import { Button } from '@/common/ui/Button/Button'
import { getUserOrServerRedirect } from '@/common/utils/auth/getUserOrServerRedirect'
import Link from 'next/link'

export default async function Home() {
  await getUserOrServerRedirect()

  return (
    <div className="max-w-5xl h-full p-6 container mx-auto">
      <div className="h-full flex flex-col gap-2 items-center justify-center">
        <Button linkProps={{ href: '/cover-letter' }}>Cover Letter</Button>
        <Button linkProps={{ href: '/resume-editor' }}>Resume Editor</Button>
      </div>
    </div>
  )
}
