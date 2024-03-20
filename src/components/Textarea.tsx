import { useState } from 'react'

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  autoSize: boolean
}

export function Textarea({
  children,
  autoSize,
  className,
  onChange,
  ...rest
}: TextAreaProps) {
  const [data, setData] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('change', event.target.value)
    setData(event.target.value)
    onChange?.(event)
  }

  const handleKeyUp = (event: any) => {
    console.log('keyup', event?.target?.value)
  }

  const sameStyles =
    'text-balance text-black row-start-1 row-end-2 col-start-1 col-end-2 p-4'

  return (
    <div className="grid max-h-48 overflow-y-none overflow-y-auto">
      <textarea
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        className={`${sameStyles} overflow-hidden resize-none ${className}`}
        {...rest}
      >
        {children}
      </textarea>
      <div className={`${sameStyles} whitespace-pre-wrap invisible`}>
        {data}{' '}
      </div>
    </div>
  )
}
