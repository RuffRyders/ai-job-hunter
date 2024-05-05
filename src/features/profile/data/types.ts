export interface Experience {
  id?: string
  jobTitle: string
  companyName: string
  description?: string
  stateDate?: string
  endDate?: string
  location?: string
  isCurrent?: boolean
}

export interface Education {
  id?: string
  schoolName: string
  degreeType: string // None, Other, GED, High School, Technical Diploma, Associates, Non-Degree Program, Bachelor, Higher Degree, Masters, Doctorate
  discipline?: string
  gpa?: number
}

export interface Skill {
  id?: string
  name?: string
}

interface Website {
  id?: string
  url?: string
}

interface Social {
  id?: string
  url?: string
  name?: string
}

export type ProfileModel = {
  avatarUrl?: string
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  location?: string
  experience?: Experience[]
  education?: Education[]
  skills?: Skill[]
  websites?: Website[]
  socials?: Social[]
}
