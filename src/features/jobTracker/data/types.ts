export interface JobModel {
  applicationStatus: ApplicationStatus
  jobTitle: string
  jobDescription: string
  companyName: string
}

export enum ApplicationStatus {
  NOT_APPLIED = 'NOT_APPLIED',
  APPLIED = 'APPLIED',
  INTERVIEWING = 'INTERVIEWING',
  OFFER_PENDING = 'OFFER_PENDING',
}