import { Button, Textarea } from "@mantine/core";
import { TextEditor } from "../TextEditor";
import { MessageWriter } from "../MessageWriter";

type PromptOption = {
  label: string;
  callback: (data?: string) => void;
};

export function PromptAnswerForm({
  prompt,
  data,
  inputType,
  onChange,
  options,
}: {
  prompt: string;
  data?: string;
  inputType?: "text" | "textarea" | "editor";
  onChange?: React.ChangeEventHandler;
  options: PromptOption[];
}) {
  return (
    <form>
      <div className="flex flex-col gap-2 ">
        <label>
          <MessageWriter message={prompt} />
        </label>
        {inputType == "textarea" && (
          <Textarea
            value={data}
            onChange={onChange}
            autosize
            maxRows={6}
            className="text-lg"
          />
        )}
        {inputType == "editor" && data && <TextEditor content={data} />}
        <div className="flex justify-end gap-2">
          {options?.map((option, index) => (
            <Button key={index} onClick={() => option.callback(data)}>
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </form>
  );
}
