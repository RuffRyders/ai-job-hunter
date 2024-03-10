export const fetcher = <T>(url: RequestInfo, init?: RequestInit): Promise<T> =>
    fetch(url, init).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        return response.json() as Promise<T>
    })
