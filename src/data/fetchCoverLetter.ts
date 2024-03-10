// api/coverLetter
import { AppConfig } from '@/config/appConfig'
import { AppLogger } from '@/services/Logger/Logger'

interface FetchCoverLetterResponse {
    generatedCoverLetter: string
}

interface FetchCoverLetterParams {
    jobDescription: string
    coverLetter: string
}

export const fetchCoverLetter = async ({
    jobDescription,
    coverLetter,
}: FetchCoverLetterParams): Promise<FetchCoverLetterResponse | undefined> => {
    AppLogger.info(
        'fetchCoverLetter: start: ',
        '\n\tapp base url: ',
        AppConfig.APP_BASE_URL ?? 'undefined',
        '\n\tjobDescription: ',
        jobDescription,
        '\n\tcoverLetter: ',
        coverLetter
    )

    const res = await fetch(`${AppConfig.APP_BASE_URL}/api/coverLetter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jobDescription,
            coverLetter,
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
        generatedCoverLetter
    )

    return {
        generatedCoverLetter: generatedCoverLetter,
    }
}
