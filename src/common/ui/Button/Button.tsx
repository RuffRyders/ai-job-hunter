'use client'

import { cn } from '@/common/utils/style/cn'
import Link, { LinkProps } from 'next/link'
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

interface ButtonProps extends Omit<AriaButtonProps, 'children'> {
  color?: 'primary' | 'secondary' | 'danger' | 'success'
  variant?: 'outline' | 'flat'
  linkProps?: LinkProps
  children: React.ReactNode
  className?: string
}

export function Button({
  children,
  className,
  color,
  variant,
  linkProps,
  type = 'button',
  ...rest
}: ButtonProps) {
  const button = tv({
    base: [
      'pointer-events-auto',
      'rounded-full',
      'px-5',
      'py-3',
      'text-sm',
      'font-semibold',
      'flex',
      'gap-2',
      'items-center',
      'justify-center',
      'pressed:opacity-70',
      'disabled:opacity-20',
    ],
    variants: {
      color: {
        success: 'bg-green-100 text-green-600 hover:bg-green-200',
        danger: 'bg-red-100 text-red-600 hover:bg-red-200',
        primary: 'bg-primary-100 text-primary-600 hover:bg-primary-200',
        secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
      },
      variant: {
        flat: '',
        outline: 'bg-transparent border-2 border-solid',
      },
    },
    compoundVariants: [
      {
        color: 'danger',
        variant: 'outline',
        class: 'border-red-100 hover:bg-red-100',
      },
      {
        color: 'primary',
        variant: 'outline',
        class: 'border-primary-100 hover:bg-primary-100',
      },
      {
        color: 'secondary',
        variant: 'outline',
        class: 'border-gray-100 hover:bg-gray-100',
      },
      {
        color: 'success',
        variant: 'outline',
        class: 'border-green-100 hover:bg-green-100',
      },
    ],
    defaultVariants: {
      variant: 'flat',
      color: 'secondary',
    },
  })

  const finalClassName = button({ color, variant, className })

  if (linkProps) {
    return (
      <Link className={finalClassName} {...linkProps}>
        {children}
      </Link>
    )
  }
  return (
    <AriaButton className={finalClassName} type={type} {...rest}>
      {children}
    </AriaButton>
  )
}
