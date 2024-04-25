'use server'

import { queryModel } from '@/common/data/api/ai/queryModel'
import { ResumeInputUserInfo } from '../../../types/types'

interface GenerateExperienceParams {
  userInfo: ResumeInputUserInfo
  jobDescription: string
}

export const generateExperience = async ({
  userInfo: { experiences },
  jobDescription,
}: GenerateExperienceParams) => {
  // Generate the experience section using AI (providing the job description and experiences user data)
  // format as needed

  const response = await queryModel({
    input: `Given a job description and experience information create 2 - 3 sentences which capture the essence of each experience in a way that is relevant to the job description.  The response should be a JSON object following this structure: [{"title": "software engineer", "company": "Google", "summary": ["Implemented load balancing strategy that reduced client errors by 15%", "Established code quality standards that improved development by 20%", "Mentored other developers and oversaw hiring"]}].  Job Description: ${jobDescription}\n\nExperience Info:${experiences.toString()}`,
    parameters: {
      return_full_text: false,
      max_new_tokens: 500,
    },
  })

  console.log('response: ', response)

  const extracted = (response.data as any)[0].generated_text as string

  console.log('extracted: ', extracted)
  console.log('parsed: ', JSON.parse(extracted))

  return `
    <p>
        <strong><span style="font-size: 17px">Skills</span></strong>
        <br>
        <span style="font-size: 15px">${extracted}</span>
    </p>
    <hr>
  `
}
