interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset" | undefined;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`pointer-events-auto rounded-full bg-indigo-600 px-6 py-4 text-normal font-semibold leading-5 text-white hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-500 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
