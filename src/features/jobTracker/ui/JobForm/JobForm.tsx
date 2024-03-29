'use client'

import {
  Header,
  TextField,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Key,
} from 'react-aria-components'
import { IconX } from '@tabler/icons-react'
import { applicationStatuses } from '@/features/jobTracker/data/contants/applicationStatuses'
import { Button } from '../../../../common/ui/Button/Button'
import { IconButton } from '../../../../common/ui/IconButton'
import { Select } from '../../../../common/ui/Select'
import { StatusLabel } from '../../../../common/ui/StatusLabel'
import { TextArea } from '../../../../common/ui/TextArea'
import { SelectOption } from '../../../../common/ui/Select/Select'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface JobFormProps {
  onClose?: () => void
}

interface FormInput {
  applicationStatus: string
  jobTitle: string
  jobDescription: string
  companyName: string
}

export function JobForm({ onClose }: JobFormProps) {
  const statusOptions = Object.values(applicationStatuses)
  const { control, handleSubmit } = useForm({
    defaultValues: {
      applicationStatus: 'not_applied',
      jobTitle: '',
      jobDescription: '',
      companyName: '',
    },
  })

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log('form-submitted', data)
  }

  return (
    <form className="flex flex-col flex-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col flex-1 gap-2">
        <Header className="flex gap-2">
          <Controller
            name="jobTitle"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  aria-label="jobTitle"
                  className="flex flex-1"
                  autoFocus
                >
                  <Input
                    {...field}
                    className="text-2xl flex-1 font-bold"
                    placeholder="Enter a job title..."
                  />
                </TextField>
              )
            }}
          />
          <IconButton onPress={onClose}>
            <div className="flex">
              <IconX />
            </div>
          </IconButton>
        </Header>
        <div className="flex flex-1 gap-2">
          <div className="flex flex-1 flex-col gap-2">
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => {
                return (
                  <TextField className="flex flex-none">
                    <Input
                      {...field}
                      aria-label="company"
                      className="text-xl flex-1"
                      placeholder="Enter a company name..."
                    />
                  </TextField>
                )
              }}
            />
            <Tabs className="flex flex-1 flex-col">
              <TabList
                className="flex border-b border-solid border-gray-300"
                aria-label="History of Ancient Rome"
              >
                <Tab
                  className="p-2 selected:text-blue-500 selected:border-b-4 border-solid border-blue-500 user-select-none cursor-pointer text-sm"
                  id="description"
                >
                  Description
                </Tab>
                <Tab
                  className="p-2 selected:text-blue-500 selected:border-b-4 border-solid border-blue-500 user-select-none cursor-pointer text-sm"
                  id="cover-letter"
                >
                  Cover Letter
                </Tab>
                <Tab
                  className="p-2 selected:text-blue-500 selected:border-b-4 border-solid border-blue-500 user-select-none cursor-pointer text-sm"
                  id="resume"
                >
                  Tailored Resume
                </Tab>
              </TabList>
              <TabPanel className="flex flex-1 pt-2" id="description">
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
              <TabPanel className="flex flex-1 pt-2" id="cover-letter">
                <div className="rounded bg-gray-100 flex flex-1 items-center justify-center">
                  <Button>Generate Cover Letter</Button>
                </div>
              </TabPanel>
              <TabPanel className="flex flex-1 pt-2" id="resume">
                <div className="rounded bg-gray-100 flex flex-1 items-center justify-center">
                  <Button>Generate Resume</Button>
                </div>
              </TabPanel>
            </Tabs>

            <Button className="mt-2" variant="primary" type="submit">
              Save
            </Button>
          </div>
          <div id="sidebar" className="flex-col">
            <Controller
              name="applicationStatus"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    className="w-48"
                    items={statusOptions}
                    selectedKey={field.value as string}
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
        </div>
      </div>
    </form>
  )
}
