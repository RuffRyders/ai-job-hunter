import { TextArea } from '../../../common/ui/TextArea'
import { RichTextEditor } from '../../../common/ui/RichTextEditor'
import { MessageWriter } from '../../../common/ui/MessageWriter/MessageWriter'
import { useState } from 'react'
import { Button } from '../../../common/ui/Button/Button'

export type OnActionHandler = () => any
export type OnDoneHandler = (data?: any) => void
export type OnErrorHandler = (error?: unknown) => void

export type PromptInputType = 'text' | 'textarea' | 'editor'
export type PromptOption = {
  label: string
  onAction: OnActionHandler
  onDone?: OnDoneHandler
  onError?: OnErrorHandler
}

export function PromptAnswerForm({
  botText,
  data,
  inputType,
  inputPlaceholder,
  onChange,
  wordDelay,
  options,
}: {
  botText: string
  data?: string
  inputType?: PromptInputType
  inputPlaceholder?: string
  wordDelay?: number
  onChange?: React.ChangeEventHandler
  options: PromptOption[]
}) {
  const [botDone, setBotDone] = useState(false)
  const [selected, setSelected] = useState<number>()

  const handleAction =
    (
      index: number,
      onAction: OnActionHandler,
      onDone?: OnDoneHandler,
      onError?: OnErrorHandler,
    ) =>
    async () => {
      setSelected(index)
      try {
        const response = await onAction()
        onDone?.(response)
      } catch (error) {
        onError?.(error)
      }
    }

  return (
    <div className="flex flex-col gap-2">
      <div className="pb-2 text-lg">
        <MessageWriter
          message={botText}
          wordDelay={wordDelay}
          onDone={() => setBotDone(true)}
        />
      </div>
      {botDone && (
        <>
          {inputType == 'textarea' && (
            <TextArea
              value={data}
              onChange={
                onChange as React.ChangeEventHandler<HTMLTextAreaElement>
              }
              autoSize
              placeholder={inputPlaceholder}
              onPaste={(e) => {
                console.log(
                  'Pasted the following text...',
                  e.clipboardData.getData('Text'),
                  // https://jobs.lever.co/Anthropic/673b3fa0-ea19-4384-84dd-7deabc3f29a5
                )
                // TODO: Check for URL, fetch and try to pull a JD, replace text
                // TODO: If failed to find JD, add a message to the chat saying so (needs design)
                // TODO: We also need to check that they provided a valid JD, that could be another inference
              }}
            />
          )}
          {inputType == 'editor' && data && <RichTextEditor content={data} />}
          {
            <div className="flex justify-end gap-2">
              {options?.map((option, index) => (
                <Button
                  key={index}
                  isDisabled={selected !== undefined}
                  onPress={handleAction(
                    index,
                    option.onAction,
                    option.onDone,
                    option.onError,
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
  )
}
