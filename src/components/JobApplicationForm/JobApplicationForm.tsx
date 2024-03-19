import {
  Button,
  Input,
  ListBoxItem,
  ListBoxItemProps,
  TextField,
} from "react-aria-components";
import { Select } from "../Select";
import { cn } from "@/utils/style/cn";
import { Key, useState } from "react";

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

function StatusLabel({
  statusText,
  color,
}: {
  statusText: string;
  color: string;
}) {
  return (
    <div
      className={cn("text-white px-1 rounded bg-slate-300 w-full text-center")}
      style={{ backgroundColor: color }}
    >
      {statusText}
    </div>
  );
}

export function JobApplicationForm({ onSubmit }: { onSubmit: () => void }) {
  const options = [
    { name: "Not Yet Applied", value: "not-yet-applied", color: "#DEDEDE" },
    { name: "Applied", value: "applied", color: "#00A8DD" },
    { name: "Interviewing", value: "interviewing", color: "#FFA800" },
    { name: "Rejected", value: "rejected", color: "#F04C4C" },
    { name: "Offered", value: "offered", color: "#3CC925" },
  ];
  const [status, setStatus] = useState<Key>("not-yet-applied");
  return (
    <form>
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
            <StatusLabel statusText={item.name} color={item.color} />
          </ListItem>
        )}
      </Select>
      <TextField autoFocus aria-label="jobTitle">
        <Input placeholder="Job Title" />
      </TextField>
      <TextField>
        <Input placeholder="Company" aria-label="company" />
      </TextField>
      <Button onPress={onSubmit} style={{ marginTop: 8 }}>
        Submit
      </Button>
    </form>
  );
}
