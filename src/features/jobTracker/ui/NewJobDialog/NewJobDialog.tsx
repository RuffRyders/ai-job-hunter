'use client'

import {
  Dialog,
  Modal,
  ModalOverlayProps,
  ModalOverlay,
} from 'react-aria-components'
import { useRouter } from 'next/navigation'
import { JOB_TRACKER_BASEURL } from '../../data/contants/routes'
import { NewJobForm } from '../NewJobForm'

export function NewJobDialog(props: ModalOverlayProps) {
  const router = useRouter()

  const handleOpenChange = () => {
    router.push(JOB_TRACKER_BASEURL)
  }

  return (
    <ModalOverlay
      className="fixed inset-0 bg-black/50 overflow-y-auto z-200"
      isDismissable
      isOpen
      onOpenChange={handleOpenChange}
      {...props}
    >
      <Modal className="flex my-20 mx-auto bg-white max-w-3xl min-h-[500px] h-[calc(100vh - 100px)] drop-shadow-2xl rounded-3xl">
        <Dialog className="p-5 flex flex-1">
          {({ close }) => <NewJobForm />}
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
