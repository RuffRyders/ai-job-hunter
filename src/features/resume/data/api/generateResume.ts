import { ResumeInputUserInfo } from '../../types/types'
import { generateHeader } from './generateHeader'

export const generateResume = async (userInfo: ResumeInputUserInfo) => {
  let resumeHTML = ''

  // Header
  resumeHTML += generateHeader(userInfo)

  return resumeHTML
}
