'use client'

import {
  Dialog,
  Modal,
  ModalOverlayProps,
  ModalOverlay,
} from 'react-aria-components'
import { useRouter } from 'next/navigation'
import { JobForm } from '../JobForm'
import useSWR from 'swr'
import { fetcher } from '@/common/utils/fetcher/fetcher'
import { JobModel } from '../../data/types'

interface CardEditorProps extends ModalOverlayProps {
  jobId?: string
  isNew?: boolean
  values?: JobModel
}

export function JobEditor({ jobId, isNew, values, ...rest }: CardEditorProps) {
  const router = useRouter()
  // const { data, error, isLoading } = useSWR(jobId ?? null, () =>
  //   fetcher<JobModel[]>(`/api/candidate/applications/${jobId}`),
  // )
  // console.log('job', { data, error, isLoading })
  console.log('values', values)

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
            <JobForm jobId={jobId} values={values} onClose={close} />
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
