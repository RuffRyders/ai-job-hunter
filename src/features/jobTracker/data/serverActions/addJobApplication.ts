'use server'

import { revalidatePath } from 'next/cache'
import { createJob } from '../api/jobApplications'
import { JOB_TRACKER_BASEURL } from '../contants/routes'
import { JobModel } from '@/common/services/supabase/database.helper.types'

export async function addJobApplication(data: JobModel) {
  revalidatePath(JOB_TRACKER_BASEURL)
  return await createJob(data)
}
