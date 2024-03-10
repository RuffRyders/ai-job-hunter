import { useState, useCallback } from 'react'

interface UseFetchFunctionParams<T> {
    fetchFunction: (...args: any[]) => Promise<T>
}

interface UseFetchFunctionResponse<T> {
    fetcher: (...args: any[]) => Promise<void>
    data: T | null
    loading: boolean
    error: Error | null
}

export function useFetchFunction<T = any>({
    fetchFunction,
}: UseFetchFunctionParams<T>): UseFetchFunctionResponse<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetcher = useCallback(
        (...args: any[]) => {
            setLoading(true)
            return fetchFunction(...args)
                .then((responseData) => {
                    setData(responseData)
                    setError(null)
                })
                .catch((err) => {
                    setData(null)
                    setError(err)
                })
                .finally(() => setLoading(false))
        },
        [fetchFunction]
    )

    return { fetcher, data, loading, error }
}
