'use server'

import { revalidatePath } from 'next/cache'
import { createJob } from '../api/jobApplications'
import { JobModel } from '../types'
import { JOB_TRACKER_BASEURL } from '../contants/routes'

export async function addJobApplication(data: JobModel) {
  revalidatePath(JOB_TRACKER_BASEURL)
  return await createJob(data)
}
