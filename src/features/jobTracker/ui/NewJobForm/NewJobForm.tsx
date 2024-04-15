'use client'

import { VALID_URL } from '@/common/data/constants/validation'
import { Button } from '@/common/ui/Button'
import { Input } from '@/common/ui/Input'
import { LoadingIndicator } from '@/common/ui/LoadingIndicator'
import { useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { addJobApplication } from '../../data/serverActions/addJobApplication'
import { JobModel } from '../../data/types'

type FormValues = {
  jobUrl: string
}

interface NewJobFormProps {
  onClose?(): void
}

export function NewJobForm({ onClose }: NewJobFormProps) {
  const [jobData, setJobData] = useState<{
    jobTitle: string
    jobDescription: string
    companyName: string
    companyLogo: string
    salaryMin: number
    salaryMax: number
  }>()
  const { control, handleSubmit, formState, getValues } = useForm({
    defaultValues: {
      jobUrl: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await fetch('/api/job-reader', {
      method: 'POST',
      body: JSON.stringify({ jobUrl: data.jobUrl }),
    })

    const { schema } = await res.json()

    if (schema) {
      setJobData(schema)
    }
  }

  const onSaveJob = useCallback(async () => {
    const formData = getValues()

    await addJobApplication({
      applicationStatus: 'NOT_APPLIED',
      companyName: jobData?.companyName || '',
      jobDescription: jobData?.jobDescription || '',
      jobTitle: jobData?.jobTitle || '',
      jobUrl: formData?.jobUrl,
      salaryMin: jobData?.salaryMin,
      salaryMax: jobData?.salaryMax,
    } as JobModel)

    // Close modal
    onClose?.()
  }, [
    getValues,
    jobData?.companyName,
    jobData?.jobDescription,
    jobData?.jobTitle,
    onClose,
  ])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-1 flex-col items-stretch"
    >
      <div className="flex self-center pb-6">
        <h1 className="flex flex-1 font-bold text-xl justify-center">
          Add a job
        </h1>
      </div>
      <div className="flex gap-2">
        <Controller
          name="jobUrl"
          control={control}
          rules={{
            required: true,
            pattern: VALID_URL,
          }}
          render={({ field }) => {
            return (
              <Input
                placeholder="Enter a job post URL..."
                className="rounded-full px-5"
                {...field}
              />
            )
          }}
        />
        <Button type="submit" isDisabled={!formState.isValid}>
          Scan
        </Button>
      </div>
      <div className="mt-4">
        {formState.isSubmitting && <LoadingIndicator size="xl" />}
        {jobData && (
          <div className="flex gap-4 p-4 border border-solid border-grey-300 rounded-xl">
            <div className="flex-none">
              <img
                className="rounded-lg object-cover"
                src={jobData['companyLogo']}
                alt={`Logo for ${jobData['companyName']}`}
                width="100"
                height="100"
              />
            </div>
            <div className="flex-1">
              <div>{jobData?.['jobTitle']}</div>
              <div>{jobData?.['companyName']}</div>
              <div className="line-clamp-6">{jobData?.['jobDescription']}</div>
            </div>
          </div>
        )}
      </div>
      {jobData && (
        <div className="absolute bottom-0 right-0">
          <Button variant="primary" onPress={onSaveJob}>
            Save
          </Button>
        </div>
      )}
    </form>
  )
}
