'use client'

import { Header, Key, Group, Input } from 'react-aria-components'
import { Tab, TabList, TabPanel, Tabs } from '@/common/ui/Tabs'
import { IconWand, IconX } from '@tabler/icons-react'
import { applicationStatuses } from '@/features/jobTracker/data/contants/applicationStatuses'
import { Button } from '../../../../common/ui/Button/Button'
import { IconButton } from '../../../../common/ui/IconButton'
import { Select } from '../../../../common/ui/Select'
import { StatusLabel } from '../../../../common/ui/StatusLabel'
import { TextArea } from '../../../../common/ui/TextArea'
import { SelectOption } from '../../../../common/ui/Select/Select'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { addJobApplication } from '../../data/serverActions/addJobApplication'
import { JobModel } from '../../data/types'
import { useRouter } from 'next/navigation'
import { updateJobApplication } from '../../data/serverActions/updateJobApplication'
import { JOB_TRACKER_BASEURL } from '../../data/contants/routes'
import { JobTitleWatched } from './components/JobTitleWatched'
import { CompanyNameWatched } from './components'
import { TextField } from '@/common/ui/TextField/TextField'
import { Label } from '@/common/ui/Label'
import { NumberInput, TextInput } from '@/common/ui/Form'

interface JobFormProps {
  jobId?: string
  onClose?: () => void
  values?: JobModel
}

export function JobForm({ jobId, values, onClose }: JobFormProps) {
  const router = useRouter()
  const statusOptions = Object.values(applicationStatuses)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      applicationStatus: 'NOT_APPLIED',
      jobTitle: '',
      jobDescription: '',
      jobUrl: '',
      companyName: '',
      salaryMax: undefined,
      salaryMin: undefined,
    },
    values,
  })

  const onSubmit: SubmitHandler<JobModel> = async (data) => {
    console.log('form-submitted', data)
    if (!jobId) {
      const result = await addJobApplication(data)
      console.log('result', result)
    } else {
      const result = await updateJobApplication(jobId, data)
      console.log('updated', result)
    }
    router.push(JOB_TRACKER_BASEURL)
  }

  return (
    <form className="flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col flex-1 gap-2">
        <Header className="flex gap-2 items-start">
          <div className="flex flex-col flex-1 min-h-16">
            <JobTitleWatched control={control} />
            <CompanyNameWatched control={control} />
          </div>
          <IconButton onPress={onClose}>
            <div className="flex">
              <IconX />
            </div>
          </IconButton>
        </Header>
        <div className="flex flex-1 gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <Tabs>
              <TabList aria-label="Tabs representing parts of a saved job application">
                <Tab id="details">Job Details</Tab>
                <Tab id="cover-letter">Cover Letter</Tab>
                <Tab id="resume">Tailored Resume</Tab>
              </TabList>
              <TabPanel id="details">
                <div className="flex gap-2">
                  <Controller
                    name="jobTitle"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextInput
                          ariaLabel="jobTitle"
                          autoFocus
                          label="Job Title"
                          placeholder="Enter a job title..."
                          {...field}
                        />
                      )
                    }}
                  />
                  <Controller
                    name="applicationStatus"
                    control={control}
                    render={({ field }) => {
                      return (
                        <div>
                          <Label className="text-xs font-bold">
                            Application Status
                          </Label>
                          <Select
                            {...field}
                            className="w-48"
                            items={statusOptions}
                            selectedKey={field.value}
                            aria-label="applicationStatus"
                            onSelectionChange={(key: Key) => {
                              field.onChange(key)
                            }}
                          >
                            {(item: any) => (
                              <SelectOption id={item.value}>
                                <StatusLabel
                                  statusText={item.name}
                                  color={item.color}
                                />
                              </SelectOption>
                            )}
                          </Select>
                        </div>
                      )
                    }}
                  />
                </div>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextInput
                        ariaLabel="company"
                        label="Company Name"
                        placeholder="Enter a company name..."
                        {...field}
                      />
                    )
                  }}
                />
                <Controller
                  name="jobUrl"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextInput
                        ariaLabel="jobUrl"
                        label="Job Post URL"
                        placeholder="https://example.com/job/123"
                        {...field}
                      />
                    )
                  }}
                />
                <div className="flex flex-1 gap-2">
                  <Controller
                    name="salaryMin"
                    control={control}
                    render={({ field }) => {
                      return <NumberInput label="Salary Min" {...field} />
                    }}
                  />
                  <Controller
                    name="salaryMax"
                    control={control}
                    render={({ field }) => {
                      return <NumberInput label="Salary Max" {...field} />
                    }}
                  />
                </div>
                <Controller
                  name="jobDescription"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField>
                        <Label>Job Description</Label>
                        <TextArea
                          {...field}
                          className="min-h-48"
                          placeholder="Enter a job description..."
                        />
                      </TextField>
                    )
                  }}
                />
              </TabPanel>
              <TabPanel id="cover-letter">
                <div className="rounded bg-gray-100 flex flex-1 items-center justify-center">
                  <Button>
                    <span>Generate Cover Letter</span>
                    <IconWand size={20} />
                  </Button>
                </div>
              </TabPanel>
              <TabPanel id="resume">
                <div className="rounded bg-gray-100 flex flex-1 items-center justify-center">
                  <Button>
                    <span>Generate Resume</span>
                    <IconWand size={20} />
                  </Button>
                </div>
              </TabPanel>
            </Tabs>

            <Button className="mt-2" variant="primary" type="submit">
              Save
            </Button>
          </div>
          <div id="sidebar" className="flex-col"></div>
        </div>
      </div>
    </form>
  )
}
