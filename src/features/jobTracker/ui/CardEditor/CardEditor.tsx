'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  Modal,
  ModalOverlayProps,
  ModalOverlay,
  Header,
  Key,
  TextField,
  Input,
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from 'react-aria-components'
import { IconX } from '@tabler/icons-react'
import { applicationStatuses } from '@/features/jobTracker/data/contants/applicationStatuses'
import { Button } from '../../../../common/ui/Button/Button'
import { IconButton } from '../../../../common/ui/IconButton'
import { Select } from '../../../../common/ui/Select'
import { StatusLabel } from '../../../../common/ui/StatusLabel'
import { TextArea } from '../../../../common/ui/TextArea'
import { SelectOption } from '../../../../common/ui/Select/Select'
import { useRouter } from 'next/navigation'
import { getJob } from '../../data/api/jobApplicationsApi'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetch/fetcher'

interface CardEditorProps extends ModalOverlayProps {
  jobId?: string
  isNew?: boolean
}

export function CardEditor({ jobId, isNew, ...rest }: CardEditorProps) {
  const options = Object.values(applicationStatuses)
  const [status, setStatus] = useState<Key>('not-yet-applied')
  const [description, setDescription] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const router = useRouter()
  const { data, error } = useSWR(jobId, () =>
    fetcher(`/api/candidate/applications/${jobId}`),
  )
  console.log({ data, error })

  const handleOpenChange = () => {
    router.push('/candidate/job-tracker')
  }

  return (
    <ModalOverlay
      className="fixed inset-0 bg-black/50 overflow-y-auto"
      isDismissable
      onOpenChange={handleOpenChange}
      {...rest}
    >
      <Modal className="flex my-20 mx-auto bg-white max-w-3xl min-h-[500px] h-[calc(100vh - 100px)] drop-shadow-2xl rounded-lg">
        <Dialog className="p-4 flex flex-1">
          {({ close }) => (
            <div className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 gap-2">
                <Header className="flex gap-2">
                  <TextField
                    aria-label="jobTitle"
                    className="flex flex-1"
                    autoFocus
                  >
                    <Input
                      className="text-2xl flex-1 font-bold"
                      placeholder="Enter a job title..."
                      onChange={(event) => setJobTitle(event.target.value)}
                      value={jobTitle}
                    />
                  </TextField>
                  <IconButton onPress={close}>
                    <div className="flex">
                      <IconX />
                    </div>
                  </IconButton>
                </Header>
                <div className="flex flex-1 gap-2">
                  <div className="flex flex-1 flex-col gap-2">
                    <TextField className="flex flex-none">
                      <Input
                        aria-label="company"
                        className="text-xl flex-1"
                        placeholder="Enter a company name..."
                      />
                    </TextField>
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
                        <TextField className="flex flex-1">
                          <TextArea
                            className="min-h-48"
                            placeholder="Enter a job description..."
                            onChange={(event) =>
                              setDescription(event.target.value)
                            }
                            value={description}
                          />
                        </TextField>
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

                    <Button className="mt-2" variant="primary" onPress={close}>
                      Save
                    </Button>
                  </div>
                  <div id="sidebar" className="flex-col">
                    <Select
                      className="w-48"
                      items={options}
                      selectedKey={status as string}
                      aria-label="applicationStatus"
                      onSelectionChange={setStatus}
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
