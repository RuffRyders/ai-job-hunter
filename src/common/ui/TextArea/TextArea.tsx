'use client'

import { cn } from '@/common/utils/style/cn'
import { useEffect, useState } from 'react'
import {
  TextArea as AriaTextArea,
  TextAreaProps as AriaTextAreaProps,
} from 'react-aria-components'

interface TextAreaProps extends AriaTextAreaProps {
  autoSize?: boolean
}

export function TextArea({
  autoSize = true,
  children,
  className,
  onChange,
  value,
  ...rest
}: TextAreaProps) {
  const [data, setData] = useState(value)
  const [isFocused, setFocused] = useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value)
    onChange?.(event)
  }

  useEffect(() => {
    setData(value)
  }, [value])

  const handleKeyUp = (event: any) => {
    console.log('keyup', event?.target?.value)
  }

  const sameStyles =
    'text-balance text-black row-start-1 row-end-2 col-start-1 col-end-2'

  return (
    <div
      className={cn(
        'grid bg-white overflow-y-none overflow-y-auto rounded h-full w-full p-2 bg-gray-100',
        isFocused && ['p-2', 'outline', 'outline-2', 'outline-blue-500'],
      )}
    >
      <AriaTextArea
        data-focused={isFocused}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        value={data}
        className={`${sameStyles} overflow-hidden resize-none outline-none bg-transparent ${className}`}
        {...rest}
      >
        {children}
      </AriaTextArea>
      <div className={`${sameStyles} whitespace-pre-wrap invisible`}>
        {data + ' '}
      </div>
    </div>
  )
}
