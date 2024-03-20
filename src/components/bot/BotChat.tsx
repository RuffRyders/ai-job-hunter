import {
  OnActionHandler,
  OnDoneHandler,
  OnErrorHandler,
  PromptAnswerForm,
} from "../../components/bot/PromptAnswerForm";

export interface PrompOption {
  label: string;
  onAction: OnActionHandler;
  onDone: OnDoneHandler;
  onError: OnErrorHandler;
}

export interface PromptStep {
  botText: string;
  data: string;
  inputType?: "textarea" | "text" | "editor";
  inputPlaceholder?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  options: PrompOption[];
}

export function BotChat({
  botSteps,
  stepIndex,
  wordDelay,
}: {
  botSteps: any;
  stepIndex: number;
  wordDelay?: number;
}) {
  return (
    <div>
      {botSteps?.map((step: PromptStep, index: number) => {
        if (index <= stepIndex) {
          return (
            <PromptAnswerForm key={index} wordDelay={wordDelay} {...step} />
          );
        }
        return null;
      })}
    </div>
  );
}
