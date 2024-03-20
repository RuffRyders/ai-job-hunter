import { Button, ButtonProps } from 'react-aria-components'

export function IconButton({ children, className, ...rest }: ButtonProps) {
  return (
    <Button
      className={`pointer-events-auto rounded-full hover:bg-gray-300 cursor-pointer p-2 text-sm font-semibold text-black disabled:bg-slate-100 disabled:text-slate-500 ${className}`}
      {...rest}
    >
      {children}
    </Button>
  )
}
