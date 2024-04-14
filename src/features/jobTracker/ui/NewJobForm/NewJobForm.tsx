'use client'

import { VALID_URL } from '@/common/data/constants/validation'
import { Button } from '@/common/ui/Button'
import { Input } from '@/common/ui/Input'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

type FormValues = {
  jobUrl: string
}

export function NewJobForm() {
  const [jobData, setJobData] = useState(
    {} as { jobTitle: string; companyName: string },
  )
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      jobUrl: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data)

    const res = await fetch('/api/job-reader', {
      method: 'POST',
      body: JSON.stringify({ jobUrl: data.jobUrl }),
    })

    const { schema } = await res.json()
    console.log(schema)

    if (schema) {
      setJobData(schema)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col items-stretch"
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
      {formState.isSubmitting && <div>Loading...</div>}
      {jobData && (
        <div>
          <div>{jobData?.['jobTitle']}</div>
          <div>{jobData?.['companyName']}</div>
        </div>
      )}
    </form>
  )
}
