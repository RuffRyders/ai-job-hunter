'use server'

import { revalidatePath } from 'next/cache'
import { unarchiveJob } from '../api/jobApplications'
import { JOB_TRACKER_BASEURL } from '../contants/routes'

export async function unarchiveJobApplication(id: string) {
  revalidatePath(JOB_TRACKER_BASEURL)
  return await unarchiveJob(id)
}
