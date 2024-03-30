'use client'

import { FormEventHandler, useState } from 'react'
import Link from 'next/link'

import SubmitButton from '../_components/SubmitButton'
import LoadingOverlay from '../../../common/ui/LoadingOverlay'
import { signUp } from '@/common/data/serverActions/signUp'

export default function SignupPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    // TODO type-casting here for convenience, implement better validation (utility function?)
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const response = await signUp({ email, password })

    setLoading(false)
    setError(response?.error?.message || '')
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-md flex flex-col space-y-4"
      >
        <div className="w-full text-center text-3xl">Create An Account</div>

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
        <SubmitButton>Sign up</SubmitButton>

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
      </form>

      <LoadingOverlay loading={loading} />
    </div>
  )
}
