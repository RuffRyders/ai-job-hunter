'use client'

import { useState } from 'react'
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
import useSWR from 'swr'
import { fetcher } from '@/common/utils/fetcher/fetcher'
import { Controller, useForm } from 'react-hook-form'
import { JobForm } from '../JobForm'

interface CardEditorProps extends ModalOverlayProps {
  jobId?: string
  isNew?: boolean
}

export function JobEditor({ jobId, isNew, ...rest }: CardEditorProps) {
  // const options = Object.values(applicationStatuses)
  // const [status, setStatus] = useState<Key>('not_applied')
  // const [description, setDescription] = useState('')
  // const [jobTitle, setJobTitle] = useState('')
  const router = useRouter()
  // const { control, handleSubmit } = useForm({
  //   defaultValues: {
  //     jobTitle: '',
  //     jobDescription: '',
  //     companyName: '',
  //   },
  // })

  const { data, error } = useSWR(jobId ?? null, () =>
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
          {({ close }) => <JobForm onClose={close} />}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
