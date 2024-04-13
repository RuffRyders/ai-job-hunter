/**
 * User/profile data for resume generation
 */
interface ResumeInputUserInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  website?: string
  linkedin?: string
  github?: string
  location: string
  skills: string[]
  experiences: ResumeInputExperience[]
  education: ResumeInputEducation[]
}

interface ResumeInputExperience {
  title: string
  company: string
  startDate: string
  endDate: string
  summary: string[]
}

interface ResumeInputEducation {
  institution: string
  credentialType: string
  fieldOfStudy: string
  startDate: string
  endDate: string
}

/**
 * 
 */