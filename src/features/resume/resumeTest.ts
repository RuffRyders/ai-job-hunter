'use server'

import { queryModel } from '@/common/data/api/ai/queryModel'
import { createResumePrompt } from './data/prompt/createResumePrompt'
import { job1 } from './data/fixtures/jobDescription'
import { user1 } from './data/fixtures/userInfo'

export const resumeTest = async () => {
  const responseSeed = '<header><h1>'
  const prompt = createResumePrompt({
    userInfo: user1,
    jobDescription: job1,
    promptTemplate: (rawPrompt) =>
      `<s>[INST] ${rawPrompt} [/INST] ${responseSeed}`,
  })

  console.log('prompt: ', prompt)

  const response = await queryModel({
    input: prompt,
    parameters: { max_new_tokens: 250, return_full_text: false },
  })

  const generatedText = (response.data as any)[0].generated_text
  console.log('generatedText: ', generatedText)

  return `${responseSeed}${generatedText}`
}

export const simpleTest = async () => {
  const prompt = 'Say hello in pygmy.'

  const response = await queryModel({ input: prompt })

  return (response.data as any)[0].generated_text
}
