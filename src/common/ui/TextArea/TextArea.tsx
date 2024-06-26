'use client'

import { cn } from '@/common/utils/style/cn'
import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import {
  TextArea as AriaTextArea,
  TextAreaProps as AriaTextAreaProps,
} from 'react-aria-components'

interface TextAreaProps extends Omit<AriaTextAreaProps, 'value'> {
  value?: string | null
}

export const TextArea = forwardRef(function TextArea(
  { children, className, onChange, onBlur, value, ...rest }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  const [data, setData] = useState(value)
  const [isFocused, setFocused] = useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value)
    onChange?.(event)
  }

  useEffect(() => {
    setData(value)
  }, [value])

  const sameStyles =
    'text-balance text-black row-start-1 row-end-2 col-start-1 col-end-2 [overflow-wrap:anywhere]'

  return (
    <div
      className={cn(
        'grid bg-white overflow-y-none overflow-y-auto rounded-lg h-full w-full p-2 bg-white border border-solid border-gray-300',
        isFocused && ['p-2', 'outline', 'outline-2', 'outline-primary-500'],
      )}
    >
      <AriaTextArea
        ref={ref}
        data-focused={isFocused}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          setFocused(false)
          onBlur?.(event)
        }}
        onChange={handleChange}
        value={data ?? undefined}
        className={`${sameStyles} overflow-hidden resize-none outline-none bg-transparent ${className}`}
        {...rest}
      >
        {children}
      </AriaTextArea>
      <div className={`${sameStyles} whitespace-pre-wrap invisible`}>
        {data + ' ' /* white space helps with autosize */}
      </div>
    </div>
  )
})
