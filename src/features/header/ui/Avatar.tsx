import { MouseEvent } from 'react'

import { AvatarImage } from './AvatarImage'
import { cn } from '@/common/utils/style/cn'

interface AvatarProps {
  email: string
  avatarUrl?: string
  onClick: (e: MouseEvent<HTMLDivElement>) => void
  className?: string
}

export default function Avatar({
  email,
  avatarUrl,
  onClick,
  className,
}: AvatarProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'h-10 aspect-square bg-gray-200 relative rounded-full',
        className,
      )}
    >
      {avatarUrl ? (
        <AvatarImage avatarUrl={avatarUrl} email={email} />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-white text-xl">
          {email[0].toUpperCase()}
        </div>
      )}
    </div>
  )
}
