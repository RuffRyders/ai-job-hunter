import React, { forwardRef, CSSProperties } from 'react'

import styles from './Action.module.scss'
import { cn } from '@/common/utils/style/cn'

export interface ActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string
    background: string
  }
  cursor?: CSSProperties['cursor']
}

export const Action = forwardRef<HTMLButtonElement, ActionProps>(
  function Action({ active, className, cursor, style, ...props }, ref) {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(styles.Action, className)}
        tabIndex={0}
        style={
          {
            ...style,
            cursor,
            '--fill': active?.fill,
            '--background': active?.background,
          } as CSSProperties
        }
      />
    )
  },
)
