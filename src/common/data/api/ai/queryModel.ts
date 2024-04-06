import { AppLogger } from '@/common/services/Logger/Logger'
import {
  HF_INFERENCE_API_BASE_URL,
  HF_INFERENCE_API_KEY,
} from '../../config/appConfig'
import { CURRENT_MODEL } from './models'
import { getErrorMessage } from '@/common/utils/getErrorMessage/getErrorMessage'
import { gemma_7b_it } from './configs'

interface QueryModelParams {
  input: string
  modelUrl?: string
  parameters?: Record<string, any>
}

interface QueryModelResponse<T = any> {
  error?: string
  data?: T
}

export const queryModel = async <T>({
  input,
  modelUrl,
  parameters = gemma_7b_it.parameters,
}: QueryModelParams): Promise<QueryModelResponse<T>> => {
  const requestUrl = modelUrl || `${HF_INFERENCE_API_BASE_URL}/${CURRENT_MODEL}`
  AppLogger.info('queryModel: ', requestUrl)

  // TODO - this body structure may be unique to each model
  const body = JSON.stringify({
    inputs: input,
    parameters,
  })

  console.log('body: ', body)

  try {
    const res = await fetch(requestUrl, {
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

      throw new Error(errorMessage)
    }

    const data = await res.json()

    return { data }
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    console.error('Error querying model:', error)
    return { error: errorMessage }
  }
}
