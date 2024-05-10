'use client'

import { cn } from '@/common/utils/style/cn'
import {
  ForwardedRef,
  KeyboardEventHandler,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
  EventHandler,
  ChangeEvent,
} from 'react'
import {
  Input as AriaInput,
  InputProps as AriaInputProps,
} from 'react-aria-components'
import { AsYouType } from 'libphonenumber-js'

interface InputProps extends AriaInputProps {
  onEnterPress?: (value: string) => void
  clearOnEnterPress?: boolean
}

export const Input = forwardRef(function Input(
  {
    children,
    className,
    onKeyDown,
    clearOnEnterPress = true,
    onEnterPress,
    value,
    onChange,
    type,
    ...rest
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const innerRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => innerRef.current!, [])

  const [innerValue, setInnerValue] = useState(value)

  useEffect(() => {
    setInnerValue(value)
  }, [value])

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value
      if (type === 'tel') {
        // TODO: Switch between US and international based on locale
        const formatted = new AsYouType('US').input(val)
        event.target.value = formatted || ''
      }
      onChange?.(event)
    },
    [onChange, type],
  )

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault()
        const value = (evt.target as HTMLInputElement).value
        onEnterPress?.(value)
        if (clearOnEnterPress && innerRef.current !== null) {
          console.log(innerRef)
          innerRef.current.value = ''
        }
      }
      onKeyDown?.(evt)
    },
    [clearOnEnterPress, onEnterPress, onKeyDown],
  )

  return (
    <AriaInput
      ref={innerRef}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex-1 p-2 border border-gray-300 border-solid rounded-lg',
        className,
      )}
      value={innerValue}
      onChange={handleOnChange}
      {...rest}
    >
      {children}
    </AriaInput>
  )
})
