"use client";

import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  formAction: ButtonHTMLAttributes<HTMLButtonElement>["formAction"];
  children: React.ReactNode;
  disabled: boolean;
}

const SubmitButton = ({
  formAction,
  children,
  disabled,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      formAction={formAction}
      aria-disabled={disabled}
      disabled={disabled}
      className="p-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 disabled:bg-gray-500"
    >
      {children}
    </button>
  );
};

export default SubmitButton;
