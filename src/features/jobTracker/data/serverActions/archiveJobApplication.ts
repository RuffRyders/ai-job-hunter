'use server'

import { revalidatePath } from 'next/cache'
import { archiveJob } from '../api/jobApplications'
import { ArchivedReason } from '../types'
import { JOB_TRACKER_BASEURL } from '../contants/routes'

export async function archiveJobApplication(
  id: string,
  archivedReason?: ArchivedReason,
) {
  revalidatePath(JOB_TRACKER_BASEURL)
  return await archiveJob(id, archivedReason)
}
