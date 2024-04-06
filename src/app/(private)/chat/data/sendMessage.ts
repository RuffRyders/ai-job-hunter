'use server'

import { queryModel } from '@/common/data/api/ai/queryModel'
import { getErrorMessage } from '@/common/utils/getErrorMessage/getErrorMessage'
import { wordCountToMaxTokens } from './wordCountToMaxTokens'

const AGENT_PREMISE =
  'As a knowledgeable and concise chatbot, provide direct answers to questions without adding any further questions or initiating additional topics. Focus solely on delivering a straightforward response.'

interface SendMessageParams {
  message: string
}
export const sendMessage = async ({ message }: SendMessageParams) => {
  try {
    const response = await queryModel({
      input: `${AGENT_PREMISE}\nUSER:\n${message}\n\nBOT:\n`,
      parameters: {
        return_full_text: false,
        max_new_tokens: wordCountToMaxTokens({
          wordCount: message.length - AGENT_PREMISE.length,
          curveFactor: 2,
        }),
      },
    })

    console.log('response: ', response)

    if (!response.data) {
      return 'No data returned from model'
    }

    return (response.data as any)[0].generated_text as string
  } catch (err) {
    console.error(err)
    const errorMessage = getErrorMessage(err)
    return errorMessage
  }
}
