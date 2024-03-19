'use client'

import { signup } from '../actions'
import Link from 'next/link'
import SubmitButton from '../_components/SubmitButton'
import { useOptimistic, useState } from 'react'

export default function SignupPage() {
    const [error, setError] = useState('')
    // const [loading, setLoading] = useState(false)
    const [loading, setLoading] = useOptimistic<boolean, boolean>(
        false,
        (state, isLoading) => (isLoading ? true : false)
    )

    const handleSignup = async (formData: FormData) => {
        setLoading(true)
        const { message: errorMessage } = await signup(formData)
        setLoading(false)
        setError(errorMessage)
    }

    return (
        <div
            className="w-full h-screen flex justify-center items-center bg-no-repeat bg-cover"
            style={{ backgroundImage: 'url(/login/lavender-blue-graph.webp)' }}
        >
            <form className="w-full max-w-md p-8 bg-white rounded-3xl shadow-md flex flex-col relative space-y-4">
                <div className="w-full text-center text-3xl">
                    Create An Account
                </div>

                {error && (
                    <div className="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        {error}
                    </div>
                )}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="p-2 border rounded-2xl"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="p-2 border rounded-2xl"
                    required
                />
                <SubmitButton formAction={handleSignup}>Sign up</SubmitButton>

                <div className="flex flex-col w-full items-center">
                    <div>Already have an account?</div>
                    <Link
                        href="/login"
                        passHref
                        className="text-blue-500 hover:text-blue-700 font-bold"
                    >
                        Log In
                    </Link>
                </div>

                {loading && (
                    <div className="w-full text-center absolute top-0 left-0 right-0 bottom-0 bg-gray-500 flex flex-col items-center justify-center">
                        <div>Loading...</div>
                    </div>
                )}
            </form>
        </div>
    )
}
