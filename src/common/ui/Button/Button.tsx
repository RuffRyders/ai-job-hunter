'use client'

import { cn } from '@/common/utils/style/cn'
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from 'react-aria-components'

interface ButtonProps extends AriaButtonProps {
  variant?: 'primary'
}

export function Button({ children, className, variant, ...rest }: ButtonProps) {
  const styles = [
    'pointer-events-auto',
    'rounded-full',
    'bg-gray-200',
    'px-5',
    'py-3',
    'text-sm',
    'text-black',
    'font-semibold',
    'pressed:opacity-70',
    'hover:bg-gray-300',
    'disabled:bg-gray-50',
    'disabled:text-gray-500',
  ]
  const primaryStyles = variant === 'primary' && [
    'text-white',
    'bg-primary-500',
    'hover:bg-primary-600',
  ]
  return (
    <AriaButton className={cn(styles, primaryStyles, className)} {...rest}>
      {children}
    </AriaButton>
  )
}
