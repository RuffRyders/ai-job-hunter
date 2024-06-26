import { cn } from '@/common/utils/style/cn'
import Image from 'next/image'

interface AvatarImageProps {
  email: string
  avatarUrl: string
  className?: string
}

export const AvatarImage = ({
  email,
  avatarUrl,
  className,
}: AvatarImageProps) => {
  return (
    <Image
      fill
      src={avatarUrl}
      alt={email}
      draggable={false}
      className={cn('h-full w-full object-cover rounded-full', className)}
    />
  )
}
