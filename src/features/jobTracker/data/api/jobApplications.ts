import { createClient } from '@/common/services/supabase/server'
import { ArchivedReason, JobModel } from '../types'

const tableName = 'jobApplications'

export async function getJobsCount() {
  const supabase = await createClient()
  return await supabase
    .from(tableName)
    .select('*', { count: 'exact', head: true })
}

export async function getJobs({
  limit = 100,
  offset = 0,
  orderBy = 'updatedAt',
  filter = '',
  isArchived = false,
  fields = [],
}: {
  limit?: number
  offset?: number
  orderBy?: string
  filter?: string
  isArchived?: boolean
  fields?: string[]
}) {
  const supabase = await createClient()
  // TYPE HACK: https://github.com/supabase/supabase-js/issues/551
  const query = supabase.from(tableName).select(fields.join(',') as '*')
  const filterBuilder = query.or(
    `companyName.ilike.%${filter}%,jobTitle.ilike.%${filter}%`,
  )
  if (!isArchived) {
    filterBuilder.is('archivedAt', null)
  } else {
    filterBuilder.not('archivedAt', 'is', null)
  }

  filterBuilder
    .range(offset, offset + limit)
    .order(orderBy, { ascending: false })

  return await filterBuilder
}

export async function getJob(id: string) {
  const supabase = await createClient()
  return await supabase.from(tableName).select().eq('id', id)
}

export async function archiveJob(
  id: string,
  archivedReason: ArchivedReason = 'CLOSED',
) {
  return updateJob(id, {
    archivedAt: new Date().toISOString().toLocaleString(),
    archivedReason,
  })
}

export async function unarchiveJob(id: string) {
  return updateJob(id, {
    archivedAt: null,
    archivedReason: null,
  })
}

export async function createJob(data: JobModel) {
  const supabase = await createClient()
  return await supabase
    .from(tableName)
    .insert({ ...data })
    .select()
}

export async function updateJob(id: string, data: Partial<JobModel>) {
  const supabase = await createClient()
  return await supabase
    .from(tableName)
    .update({ ...data, id })
    .eq('id', id)
    .select()
}

export async function deleteJob(id: string) {
  const supabase = await createClient()
  return await supabase.from(tableName).delete().eq('id', id)
}
