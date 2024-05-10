import { MouseEvent } from 'react'

import { AvatarImage } from './AvatarImage'
import { tv } from 'tailwind-variants'
import { cn } from '@/common/utils/style/cn'
import { IconUser } from '@tabler/icons-react'

interface AvatarProps {
  avatarUrl?: string
  className?: string
  email?: string
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export function Avatar({
  email,
  avatarUrl,
  onClick,
  size,
  className,
}: AvatarProps) {
  const avatar = tv({
    base: 'rounded-full bg-gray-200 relative',
    variants: {
      size: {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
        xl: 'w-20 h-20',
        '2xl': 'w-24 h-24',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  })

  return (
    <div onClick={onClick} className={avatar({ size, className })}>
      {avatarUrl ? (
        <AvatarImage avatarUrl={avatarUrl} email={email || 'avatar image'} />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-white text-xl">
          {email ? email[0].toUpperCase() : <IconUser />}
        </div>
      )}
    </div>
  )
}
