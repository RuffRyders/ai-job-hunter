'use client'

import { JobModel } from '@/common/services/supabase/database.helper.types'
import { Control, useWatch } from 'react-hook-form'

export function CompanyNameWatched({
  control,
}: {
  control: Control<JobModel>
}) {
  const companyName = useWatch({
    control,
    name: 'companyName',
    defaultValue: 'Company Name',
  })
  return <div>{companyName || 'Company Name'}</div>
}
