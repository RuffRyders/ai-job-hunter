import { AppLogger } from '@/services/Logger/Logger'

interface FetchCoverLetterResponse {
  generatedCoverLetter: string
}

interface FetchCoverLetterParams {
  jobDescription: string
}

export const fetchCoverLetter = async ({
  jobDescription,
}: FetchCoverLetterParams): Promise<FetchCoverLetterResponse | undefined> => {
  AppLogger.info(
    'fetchCoverLetter: start: ',
    '\n\tjobDescription: ',
    jobDescription,
  )

  const res = await fetch(`/api/coverLetter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jobDescription,
    }),
  })

  const { generatedCoverLetter } = await res.json()

  // TODO handle errors and validation

  // TODO TS the expected shape of the response
  if (!generatedCoverLetter || typeof generatedCoverLetter !== 'string') {
    throw new Error('No data returned from inference API')
  }

  AppLogger.info(
    'fetchCoverLetter: generatedCoverLetter: \n',
    generatedCoverLetter,
  )

  return {
    generatedCoverLetter,
  }
}
