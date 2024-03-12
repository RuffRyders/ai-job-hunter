import { Button, Textarea } from "@mantine/core";
import { TextEditor } from "../TextEditor";
import { MessageWriter } from "../MessageWriter";
import { useState } from "react";

type OnActionHandler = () => any;
type OnDoneHandler = (data?: any) => void;
type OnErrorHandler = (error?: unknown) => void;

type PromptOption = {
  label: string;
  onAction: OnActionHandler;
  onDone?: OnDoneHandler;
  onError?: OnErrorHandler;
};

export function PromptAnswerForm({
  botText,
  data,
  inputType,
  inputPlaceholder,
  onChange,
  options,
}: {
  botText: string;
  data?: string;
  inputType?: "text" | "textarea" | "editor";
  inputPlaceholder?: string;
  onChange?: React.ChangeEventHandler;
  options: PromptOption[];
}) {
  const [botDone, setBotDone] = useState(false);
  //   const [actionDone, setActionDone] = useState(false);

  const handleAction =
    (
      onAction: OnActionHandler,
      onDone?: OnDoneHandler,
      onError?: OnErrorHandler
    ) =>
    async () => {
      try {
        const response = await onAction();
        onDone?.(response);
      } catch (error) {
        onError?.(error);
      }
    };

  return (
    <form>
      <div className="flex flex-col gap-2 ">
        <label>
          <MessageWriter message={botText} onDone={() => setBotDone(true)} />
        </label>
        {botDone && (
          <>
            {inputType == "textarea" && (
              <Textarea
                value={data}
                onChange={onChange}
                autosize
                maxRows={6}
                className="text-lg"
                placeholder={inputPlaceholder}
              />
            )}
            {inputType == "editor" && data && <TextEditor content={data} />}
            {
              <div className="flex justify-end gap-2">
                {options?.map((option, index) => (
                  <Button
                    key={index}
                    onClick={handleAction(
                      option.onAction,
                      option.onDone,
                      option.onError
                    )}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            }
          </>
        )}
      </div>
    </form>
  );
}
