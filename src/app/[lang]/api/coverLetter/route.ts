import {
  HF_INFERENCE_API_BASE_URL,
  HF_INFERENCE_API_KEY,
} from '@/config/appConfig'
import { CURRENT_MODEL } from '@/constants'
import { promptCoverLetter } from '@/data/prompts'
import { AppLogger } from '@/services/Logger/Logger'
import { formatPrompt } from '@/utils/prompt/formatPrompt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { jobDescription } = await req.json()

    const prompt = formatPrompt(promptCoverLetter, jobDescription)

    const url = `${HF_INFERENCE_API_BASE_URL}/${CURRENT_MODEL}`

    AppLogger.info(
      'coverLetter:POST --',
      '\n\tjobDescription: ',
      jobDescription,
      '\n\turl: ',
      url,
    )

    AppLogger.info('coverLetter:POST -- prompt: \n\t', prompt)

    const body = JSON.stringify({
      inputs: prompt,
      parameters: {
        return_full_text: false,
        max_new_tokens: 1000,
        //   max_length: 200,
      },
    })

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${HF_INFERENCE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    })

    if (!res.ok) {
      const errorMessage =
        (await res.json()).error || 'An error occurred during fetch operation'

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

    AppLogger.info('coverLetter:POST.Success!: ', JSON.stringify(data, null, 2))

    if (generatedText !== '' && !generatedText) {
      throw new Error('No data returned from inference API')
    }

    AppLogger.info('extracted generatedText: ', generatedText)

    // todo enforce this response shape with TS
    return NextResponse.json({ generatedCoverLetter: generatedText })
  } catch (e: any) {
    console.log('error', e.errorMessage)
    AppLogger.error('coverLetter:POST.catchError: ', JSON.stringify(e, null, 2))

    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
