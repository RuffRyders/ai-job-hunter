import {
  Dialog,
  Modal,
  ModalOverlayProps,
  ModalOverlay,
  Header,
} from "react-aria-components";
import { JobApplicationForm } from "../JobApplicationForm/JobApplicationForm";

export function EntryModal(props: ModalOverlayProps) {
  return (
    <ModalOverlay
      isDismissable
      {...props}
      className="fixed inset-0 bg-black/50"
    >
      <Modal className="absolute my-20 mx-auto inset-0 bg-white max-w-3xl max-h-[calc(100vh - 100px)] drop-shadow-2xl rounded-lg">
        <Dialog className="p-8">
          {({ close }) => (
            <div>
              <Header title="Software Engineer">Software Engineer</Header>
              <JobApplicationForm onSubmit={close} />
            </div>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
