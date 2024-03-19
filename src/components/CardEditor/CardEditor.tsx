import {
  Dialog,
  Modal,
  ModalOverlayProps,
  ModalOverlay,
  Header,
  ListBoxItem,
  ListBoxItemProps,
  Key,
  TextField,
  Input,
} from "react-aria-components";
import { useState } from "react";
import { IconX } from "@tabler/icons-react";
import { applicationStatuses } from "@/data/applicationStatuses";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Select } from "../Select";
import { StatusLabel } from "../StatusLabel";
import { TextArea } from "../TextArea";

function ListItem(props: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={({ isFocused, isSelected }) =>
        `p-1 ${isFocused ? "focused" : ""} ${isSelected ? "selected" : ""}`
      }
    />
  );
}

export function CardEditor(props: ModalOverlayProps) {
  const options = Object.values(applicationStatuses);
  const [status, setStatus] = useState<Key>("not-yet-applied");
  const [description, setDescription] = useState("This is on a wait list");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  return (
    <ModalOverlay
      isDismissable
      {...props}
      className="fixed inset-0 bg-black/50 overflow-y-auto"
    >
      <Modal className="my-20 mx-auto bg-white max-w-3xl min-h-[500px] h-[calc(100vh - 100px)] drop-shadow-2xl rounded-lg">
        <Dialog className="p-4">
          {({ close }) => (
            <div className="flex">
              <div className="flex flex-col flex-1 gap-2">
                <Header className="flex">
                  <TextField
                    className="flex flex-1"
                    autoFocus
                    aria-label="jobTitle"
                  >
                    <Input
                      className="text-2xl flex-1"
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
                <div className="flex gap-2">
                  <div className="flex-1 flex flex-col gap-2">
                    <TextField className="flex flex-1">
                      <Input
                        className="text-xl flex-1"
                        placeholder="Enter a company name..."
                        aria-label="company"
                      />
                    </TextField>
                    <TextField className="flex-1">
                      <TextArea
                        value={description}
                        placeholder="Enter a job description..."
                        onChange={(event) => setDescription(event.target.value)}
                      />
                    </TextField>
                    <Button onPress={close} style={{ marginTop: 8 }}>
                      Save
                    </Button>
                  </div>
                  <div id="sidebar" className="flex-col">
                    <Select
                      className="w-48"
                      items={options}
                      selectedKey={status as string}
                      aria-label="applicationStatus"
                      onSelectionChange={(selected) => {
                        console.log("status change", selected);
                        setStatus(selected);
                      }}
                    >
                      {(item) => (
                        <ListItem id={item.value}>
                          <StatusLabel
                            statusText={item.name}
                            color={item.color}
                          />
                        </ListItem>
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
  );
}
