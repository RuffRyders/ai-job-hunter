'use client'

import React from 'react'
import { tv } from 'tailwind-variants'

interface HeadingProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  className?: string
}

export function Heading({ variant = 'h1', className, children }: HeadingProps) {
  const heading = tv({
    base: 'font-bold',
    variants: {
      variant: {
        h1: 'text-3xl',
        h2: 'text-2xl',
        h3: 'text-xl',
        h4: 'text-lg',
        h5: 'text-md',
        h6: 'text-sm',
      },
    },
  })

  const Comp = variant
  return <Comp className={heading({ variant, className })}>{children}</Comp>
}
