import { AppConfig } from '@/config/appConfig'
import { HF_MODELS } from '@/constants'
import { AppLogger } from '@/services/Logger/Logger'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const { jobDescription, coverLetter } = await req.json()

        const prompt = `Please return an updated, optimized and tailored cover letter for the supplied job description.\n\nJob Description: ${jobDescription}\n\nCover Letter: ${coverLetter}`

        const url = `${AppConfig.HF_INFERENCE_API_BASE_URL}/${HF_MODELS.gpt2.id}`

        AppLogger.info(
            'coverLetter:POST --',
            '\n\tjobDescription: ',
            jobDescription,
            '\n\tcoverLetter: ',
            coverLetter,
            '\n\turl: ',
            url
        )

        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AppConfig.HF_INFERENCE_API_KEY}`,
            },
            method: 'POST',
            body: prompt,
        })

        if (!res.ok) {
            const errorMessage =
                (await res.json()).error ||
                'An error occurred during fetch operation'

            AppLogger.error('coverLetter:POST.tryError: ', errorMessage)

            return new NextResponse(JSON.stringify({ error: errorMessage }), {
                status: res.status,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }

        // TODO: it's an array of objects? { generated_text: string }[], investigate the data shape and handle it properly
        const data = await res.json()
        const generatedText = data[0].generated_text

        AppLogger.info(
            'coverLetter:POST.Success!: ',
            JSON.stringify(data, null, 2)
        )

        if (generatedText !== '' && !generatedText) {
            throw new Error('No data returned from inference API')
        }

        AppLogger.info('extracted generatedText: ', generatedText)

        // todo enforce this response shape with TS
        return NextResponse.json({ generatedCoverLetter: generatedText })
    } catch (e) {
        AppLogger.error(
            'coverLetter:POST.catchError: ',
            JSON.stringify(e, null, 2)
        )

        return new NextResponse(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }
}
