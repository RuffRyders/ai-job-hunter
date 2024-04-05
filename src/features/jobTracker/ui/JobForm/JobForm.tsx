'use client'

import {
  Header,
  TextField,
  Input,
  // Tabs,
  // TabList,
  // Tab,
  // TabPanel,
  Key,
  Label,
  Group,
} from 'react-aria-components'
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
import { NumberField } from '@/common/ui/NumberField'

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
    router.push('/candidate/job-tracker')
  }

  return (
    <form className="flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col flex-1 gap-2">
        <Header className="flex gap-2 items-start">
          <div className="flex flex-col flex-1 h-24">
            <div className="font-bold">{'{Job Title}'}</div>
            <div>{'{Company Name}'}</div>
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
                <div className="flex">
                  <Controller
                    name="jobTitle"
                    control={control}
                    render={({ field }) => {
                      return (
                        <TextField
                          aria-label="jobTitle"
                          className="flex flex-1 flex-col"
                          autoFocus
                        >
                          <Label className="text-xs font-bold ">
                            Job Title
                          </Label>
                          <Input
                            {...field}
                            className="flex-1 border border-gray-300 border-solid"
                            placeholder="Enter a job title..."
                          />
                        </TextField>
                      )
                    }}
                  />
                  <Controller
                    name="applicationStatus"
                    control={control}
                    render={({ field }) => {
                      return (
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
                          {(item) => (
                            <SelectOption id={item.value}>
                              <StatusLabel
                                statusText={item.name}
                                color={item.color}
                              />
                            </SelectOption>
                          )}
                        </Select>
                      )
                    }}
                  />
                </div>
                <Controller
                  name="companyName"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField className="flex flex-none flex-col">
                        <Label className="text-xs font-bold">
                          Company Name
                        </Label>
                        <Input
                          {...field}
                          aria-label="company"
                          className="flex-1 border border-gray-300 border-solid"
                          placeholder="Enter a company name..."
                        />
                      </TextField>
                    )
                  }}
                />
                <div className="flex flex-1">
                  <Controller
                    name="salaryMin"
                    control={control}
                    render={({ field: { value, ...rest } }) => {
                      return (
                        <NumberField
                          {...rest}
                          step={1000}
                          defaultValue={0}
                          minValue={0}
                          value={value ?? undefined}
                          className="flex flex-col"
                        >
                          <Label className="text-xs font-bold">
                            Salary Min
                          </Label>
                          <Group>
                            <IconButton slot="decrement">-</IconButton>
                            <Input className="border border-gray-300 border-solid" />
                            <IconButton slot="increment">+</IconButton>
                          </Group>
                        </NumberField>
                      )
                    }}
                  />
                  <Controller
                    name="salaryMax"
                    control={control}
                    render={({ field }) => {
                      return (
                        <NumberField
                          {...field}
                          step={1000}
                          defaultValue={0}
                          minValue={0}
                          value={field.value}
                          className="flex flex-col"
                        >
                          <Label className="text-xs font-bold">
                            Salary Max
                          </Label>
                          <Group>
                            <IconButton slot="decrement">-</IconButton>
                            <Input className="flex-1 border border-gray-300 border-solid" />
                            <IconButton slot="increment">+</IconButton>
                          </Group>
                        </NumberField>
                      )
                    }}
                  />
                </div>
                <Controller
                  name="jobDescription"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField className="flex flex-1">
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
