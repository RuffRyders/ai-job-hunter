'use client'

import { ButtonHTMLAttributes } from 'react'
import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
    formAction: ButtonHTMLAttributes<HTMLButtonElement>['formAction']
    children: React.ReactNode
}

const SubmitButton = ({ formAction }: SubmitButtonProps) => {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            formAction={formAction}
            aria-disabled={pending}
            disabled={pending}
            className="p-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 disabled:bg-gray-500"
        >
            Sign up
        </button>
    )
}

export default SubmitButton
