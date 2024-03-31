export const getErrorMessage = (error: any): string => {
  let errorMessage = ''

  if (error instanceof Error) {
    errorMessage = error.message
  } else {
    errorMessage = 'Unknown error'
  }

  return errorMessage
}
