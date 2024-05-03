'use server'

import { revalidatePath } from 'next/cache'
import { updateJob } from '../api/jobApplications'
import { JOB_TRACKER_BASEURL } from '../contants/routes'
import { JobModel } from '@/common/services/supabase/database.helper.types'

export async function updateJobApplication(
  jobId: string,
  data: Partial<JobModel>,
) {
  revalidatePath(JOB_TRACKER_BASEURL)
  return await updateJob(jobId, data)
}
