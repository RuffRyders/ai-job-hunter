'use client'

import { cn } from '@/common/utils/style/cn'
import { Button, ButtonProps } from 'react-aria-components'

export function IconButton({ children, className = '', ...rest }: ButtonProps) {
  return (
    <Button
      className={cn(
        'pointer-events-auto rounded-full hover:bg-gray-200 cursor-pointer p-2 text-sm font-semibold text-black disabled:bg-slate-100 disabled:text-slate-500',
        className,
      )}
      {...rest}
    >
      {children}
    </Button>
  )
}
