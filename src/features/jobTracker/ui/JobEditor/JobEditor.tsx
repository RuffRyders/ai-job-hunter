'use client'

import {
  Dialog,
  Modal,
  ModalOverlayProps,
  ModalOverlay,
} from 'react-aria-components'
import { useRouter } from 'next/navigation'
import { JobForm } from '../JobForm'
import { JobModel } from '../../data/types'
import { JOB_TRACKER_BASEURL } from '../../data/contants/routes'

interface CardEditorProps extends ModalOverlayProps {
  jobId?: string
  isNew?: boolean
  values?: JobModel
}

export function JobEditor({ jobId, isNew, values, ...rest }: CardEditorProps) {
  const router = useRouter()

  const handleOpenChange = () => {
    router.push(JOB_TRACKER_BASEURL)
  }

  return (
    <ModalOverlay
      className="fixed inset-0 bg-black/50 overflow-y-auto z-200"
      isDismissable
      onOpenChange={handleOpenChange}
      {...rest}
    >
      <Modal className="flex my-20 mx-auto bg-white max-w-3xl min-h-[500px] h-[calc(100vh - 100px)] drop-shadow-2xl rounded-3xl">
        <Dialog className="p-4 flex flex-1">
          {({ close }) => (
            <JobForm jobId={jobId} values={values} onClose={close} />
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
