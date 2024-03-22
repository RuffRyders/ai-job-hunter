'use client'

import { cn } from '@/utils/style/cn'
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from 'react-aria-components'

interface ButtonProps extends AriaButtonProps {
  variant?: 'primary'
}

export function Button({ children, className, variant, ...rest }: ButtonProps) {
  const isPrimary = variant === 'primary'
  return (
    <AriaButton
      className={cn(
        'pointer-events-auto rounded-full bg-gray-200 pressed:opacity-70 px-5 py-3 text-sm font-semibold text-black hover:bg-gray-300 disabled:bg-gray-50 disabled:text-gray-500',
        {
          'text-white': isPrimary,
          'bg-primary-500': isPrimary,
          'hover:bg-primary-600': isPrimary,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </AriaButton>
  )
}
