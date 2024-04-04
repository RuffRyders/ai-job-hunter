'use client'

import { cn } from '@/common/utils/style/cn'
import Link, { LinkProps } from 'next/link'
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from 'react-aria-components'

interface ButtonProps extends Omit<AriaButtonProps, 'children'> {
  variant?: 'primary'
  linkProps?: LinkProps
  children: React.ReactNode
}

export function Button({
  children,
  className,
  variant,
  linkProps,
  ...rest
}: ButtonProps) {
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
  const finalClassName = cn(styles, primaryStyles, className)

  if (linkProps) {
    return (
      <Link className={finalClassName} {...linkProps}>
        {children}
      </Link>
    )
  }
  return (
    <AriaButton className={finalClassName} {...rest}>
      {children}
    </AriaButton>
  )
}
