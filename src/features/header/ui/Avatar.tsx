import { cn } from '@/common/utils/style/cn'
import Image from 'next/image'
import { MouseEvent } from 'react'

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
        'h-full aspect-square bg-purple-400 rounded-full',
        className,
      )}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={email}
          className="h-full w-full object-cover rounded-full"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-white text-xl">
          {email[0].toUpperCase()}
        </div>
      )}
    </div>
  )
}
