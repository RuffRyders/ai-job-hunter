import { Button, Textarea } from "@mantine/core";
import { TextEditor } from "../TextEditor";
import { MessageWriter } from "../MessageWriter";
import { useState } from "react";

export type OnActionHandler = () => any;
export type OnDoneHandler = (data?: any) => void;
export type OnErrorHandler = (error?: unknown) => void;

export type PromptInputType = "text" | "textarea" | "editor";
export type PromptOption = {
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
  wordDelay,
  options,
}: {
  botText: string;
  data?: string;
  inputType?: PromptInputType;
  inputPlaceholder?: string;
  wordDelay?: number;
  onChange?: React.ChangeEventHandler;
  options: PromptOption[];
}) {
  const [botDone, setBotDone] = useState(false);
  const [selected, setSelected] = useState<number>();

  const handleAction =
    (
      index: number,
      onAction: OnActionHandler,
      onDone?: OnDoneHandler,
      onError?: OnErrorHandler
    ) =>
    async () => {
      setSelected(index);
      try {
        const response = await onAction();
        onDone?.(response);
      } catch (error) {
        onError?.(error);
      }
    };

  return (
    <form className="flex flex-col gap-2">
      <label>
        <MessageWriter
          message={botText}
          wordDelay={wordDelay}
          onDone={() => setBotDone(true)}
        />
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
                  disabled={selected !== undefined}
                  onClick={handleAction(
                    index,
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
    </form>
  );
}
