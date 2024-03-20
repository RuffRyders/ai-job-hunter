'use client'

import { loadUserData, signOut } from './actions'
import { useState } from 'react'
import useSWR from 'swr'

export default function PrivatePage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const { data } = useSWR('user', loadUserData)
    const { user, error: swrError } = data ?? {}

    const handleSignOut = async () => {
        setLoading(true)
        setError('')

        const response = await signOut()

        setLoading(false)
        setError(response?.error?.message || '')
    }

    return (
        <div>
            <p className="mb-10">Hello {user?.email}</p>

            <p className="text-red-500 mb-10">{error ?? swrError}</p>

            <button
                onClick={handleSignOut}
                className="button block"
                type="button"
                aria-disabled={loading}
                disabled={loading}
            >
                Sign Out
            </button>
        </div>
    )
}
