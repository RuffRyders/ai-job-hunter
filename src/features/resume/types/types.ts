/**
 * User/profile data for resume generation
 */
export interface ResumeInputUserInfo {
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

export interface ResumeInputExperience {
  title: string
  company: string
  startDate: string
  endDate: string
  summary: string[]
}

export interface ResumeInputEducation {
  institution: string
  credentialType: string
  fieldOfStudy: string
  startDate: string
  endDate: string
}

/**
 *
 */
