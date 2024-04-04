'use client'

import { FormEventHandler, useState } from 'react'
import Link from 'next/link'

import SubmitButton from '../_components/SubmitButton'
import LoadingOverlay from '@/common/ui/LoadingOverlay'
import { logIn } from '@/features/auth/serverActions/logIn'

export default function LoginPage() {
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

    const response = await logIn({ email, password })

    setLoading(false)
    setError(response?.error?.message || '')
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="w-full h-full flex flex-col">
        <div className="w-full text-center text-3xl mb-4">Log In</div>

        {error && (
          <div className="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            {error}
          </div>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="p-2 border rounded-2xl mb-4"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="p-2 border rounded-2xl mb-4"
          required
        />
        <SubmitButton>Log in</SubmitButton>

        <div className="flex flex-col w-full items-center">
          <div>New Here?</div>
          <Link
            href="/signup"
            passHref
            className="text-blue-500 hover:text-blue-700 font-bold"
          >
            Sign Up
          </Link>
        </div>
      </form>
      <LoadingOverlay loading={loading} displayText="Signing in..." />
    </div>
  )
}
