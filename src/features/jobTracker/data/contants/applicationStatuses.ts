interface ApplicationStatusData {
  name: string
  value: string
  color: string
}

export const applicationStatuses = {
  not_applied: {
    name: 'Not Yet Applied',
    value: 'not_applied',
    color: '#b3b3b3',
  },
  applied: { name: 'Applied', value: 'applied', color: '#00A8DD' },
  interviewing: {
    name: 'Interviewing',
    value: 'interviewing',
    color: '#FFA800',
  },
  rejected: { name: 'Rejected', value: 'rejected', color: '#F04C4C' },
  closed: { name: 'Closed', value: 'closed', color: '#505050' },
  offer_pending: {
    name: 'Offer Pending',
    value: 'offer_pending',
    color: '#ffdd00',
  },
  accepted: {
    name: 'Accepted',
    value: 'accepted',
    color: '#3CC925',
  },
} as {
  not_applied: ApplicationStatusData
  applied: ApplicationStatusData
  interviewing: ApplicationStatusData
  offer_pending: ApplicationStatusData
  accepted: ApplicationStatusData
  rejected: ApplicationStatusData
  [key: string]: ApplicationStatusData
}
