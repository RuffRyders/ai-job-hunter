import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from "react-aria-components";

interface ButtonProps extends AriaButtonProps {}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <AriaButton
      className={`pointer-events-auto rounded-full bg-slate-300 px-5 py-3 text-sm font-semibold text-black hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-500 ${className}`}
      {...rest}
    >
      {children}
    </AriaButton>
  );
}
