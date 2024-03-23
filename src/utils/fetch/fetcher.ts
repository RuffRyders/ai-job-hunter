export const fetcher = async <T>(
  url: RequestInfo,
  init?: RequestInit,
): Promise<T | undefined> => {
  try {
    const response = await fetch(url)
    // network error in the 4xx–5xx range
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    // use response here if we didn't throw above
    return response.json() as Promise<T>
  } catch (error: any) {
    console.log(error?.message)
    if (error instanceof SyntaxError) {
      // Unexpected token < in JSON
      console.log('There was a SyntaxError', error)
    } else {
      console.log('There was an error', error)
    }
  }
}
