import { ResumeInputUserInfo } from '../../types/types'
import { job1 } from '../fixtures/jobDescription'
import { generateExperience } from './sections/generateExperience'
import { generateHeader } from './sections/generateHeader'
import { generateSkills } from './sections/generateSkills'

export const generateResume = async (
  userInfo: ResumeInputUserInfo,
  jobDescription: string,
) => {
  let resumeHTML = ''

  // Header
  resumeHTML += generateHeader(userInfo)

  // Skills
  resumeHTML += generateSkills(userInfo)

  // Experience
  resumeHTML += await generateExperience({ userInfo, jobDescription })

  return resumeHTML
}
