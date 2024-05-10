import { ApplicationStatus } from '@/common/services/supabase/database.helper.types'

export interface ApplicationStatusData {
  name: string
  value: ApplicationStatus
  color: string
}

export const applicationStatuses = {
  NOT_APPLIED: {
    name: 'Saved',
    value: 'NOT_APPLIED',
    color: '#b3b3b3',
  },
  APPLIED: {
    name: 'Applied',
    value: 'APPLIED',
    color: '#00A8DD',
  },
  INTERVIEWING: {
    name: 'Interview',
    value: 'INTERVIEWING',
    color: '#FFA800',
  },
  OFFER_PENDING: {
    name: 'Offer',
    value: 'OFFER_PENDING',
    color: '#3CC925',
  },
} as {
  NOT_APPLIED: ApplicationStatusData
  APPLIED: ApplicationStatusData
  INTERVIEWING: ApplicationStatusData
  OFFER_PENDING: ApplicationStatusData
}
