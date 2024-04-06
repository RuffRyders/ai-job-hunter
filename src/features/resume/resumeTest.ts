'use server'

import { queryModel } from '@/common/data/api/ai/queryModel'
import { createResumePrompt } from './data/createResumePrompt'
import { job1 } from './data/fixtures/jobDescription'
import { user1 } from './data/fixtures/userInfo'

export const resumeTest = async () => {
  const prompt = createResumePrompt({
    userInfo: user1,
    jobDescription: job1,
  })

  console.log('prompt: ', prompt)

  const response = await queryModel({ prompt })

  return (response.data as any)[0].generated_text
}

export const simpleTest = async () => {
  const prompt = 'Say hello in pygmy.'

  const response = await queryModel({ prompt })

  return (response.data as any)[0].generated_text
}
