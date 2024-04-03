import { ApplicationStatus } from '../types'

interface ApplicationStatusData {
  name: string
  value: ApplicationStatus
  color: string
}

export const applicationStatuses = {
  NOT_APPLIED: {
    name: 'Saved',
    value: ApplicationStatus.NOT_APPLIED,
    color: '#b3b3b3',
  },
  APPLIED: {
    name: 'Applied',
    value: ApplicationStatus.APPLIED,
    color: '#00A8DD',
  },
  INTERVIEWING: {
    name: 'Interviewing',
    value: ApplicationStatus.INTERVIEWING,
    color: '#FFA800',
  },
  OFFER_PENDING: {
    name: 'Offer Pending',
    value: ApplicationStatus.OFFER_PENDING,
    color: '#ffdd00',
  },
} as {
  NOT_APPLIED: ApplicationStatusData
  APPLIED: ApplicationStatusData
  INTERVIEWING: ApplicationStatusData
  OFFER_PENDING: ApplicationStatusData
}
