import { useState, useEffect } from 'react'

interface UseFetchParams {
    url: string
    init?: RequestInit
}

interface UseFetchResponse<T> {
    data: T | null
    loading: boolean
    error: Error | null
}

export function useFetch<T = any>({
    url,
    init,
}: UseFetchParams): UseFetchResponse<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    // stringify init to handle object comparison
    const stringifiedInit = JSON.stringify(init)

    useEffect(() => {
        setLoading(true)
        fetch(url, init)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.json()
            })
            .then((responseData) => setData(responseData))
            .catch((err) => setError(err))
            .finally(() => setLoading(false))
    }, [url, init, stringifiedInit])

    return { data, loading, error }
}
