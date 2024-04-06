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

  const response = await queryModel({ prompt })

  return (response.data as any)[0].generated_text
}

export const simpleTest = async () => {
  const prompt = 'Tell me how to say "hi" in 5 different languages'

  const response = await queryModel({ prompt })

  return (response.data as any)[0].generated_text
}
