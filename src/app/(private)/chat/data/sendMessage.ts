import { queryModel } from '@/common/data/api/ai/queryModel'

interface SendMessageParams {
  message: string
}
export const sendMessage = async ({ message }: SendMessageParams) => {
  const response = await queryModel({ prompt: message })

  console.log('response: ', response)

  if (!response.data) {
    return 'No data returned from model'
  }

  return (response.data as any)[0].generated_text as string
}
