import { Database } from '@/common/services/supabase/database.types'

export type ApplicationStatus =
  Database['public']['Enums']['jobApplicationStatus']

// export interface JobModel {
//   applicationStatus: ApplicationStatus
//   jobTitle: string | null
//   jobDescription: string | null
//   companyName: string | null
//   salaryMax?: number
//   salaryMin?: number
//   [key: string]: any
// }

export type JobModel = Database['public']['Tables']['jobApplications']['Row']
