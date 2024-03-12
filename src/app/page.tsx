"use client";

import { fetchCoverLetter } from "@/data/api/fetchCoverLetter";
import { useFetchFunction } from "@/utils/fetch/useFetchFunction";
import { useEffect, useState } from "react";
import { PromptAnswerForm } from "@/components/forms/PromptAnswerForm";
import { jobs } from "@/data/samples/jobs";
import { textToHtml } from "@/utils/string/textToHtml";

interface PrompOption {
  label: string;
  onAction: (data?: string) => void;
}

interface PromptStep {
  botText: string;
  data: string;
  inputType?: "textarea" | "text";
  inputPlaceholder: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  options: PrompOption[];
}

export default function Home() {
  // const { fetcher, data, loading, error } = useFetchFunction({
  //   fetchFunction: fetchCoverLetter,
  // });
  const [coverLetter, setCoverLetter] = useState<string>();
  const [jobDescription, setJobDescription] = useState("");
  const [stepIndex, setStepIndex] = useState(0);

  // useEffect(() => {
  //   if (data) {
  //     if (data.generatedCoverLetter) {
  //       const converted = textToHtml(data.generatedCoverLetter);
  //       setCoverLetter(converted);
  //     }
  //   }
  // }, [data]);

  // const handleSubmit = async (jobDescription: string) =>
  //   fetcher({
  //     jobDescription,
  //   });

  const steps = [
    {
      botText:
        "Hi. I am an AI Job Assistant. I have been tasked with writing cover letters.",
      options: [
        {
          label: "Let's get started!",
          onAction: () => {
            setStepIndex(stepIndex + 1);
          },
        },
      ],
    },
    {
      botText: "Stupendous! I just need the job description to work my magic.",
      data: jobDescription,
      inputType: "textarea",
      inputPlaceholder: "Paste the job description...",
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        setJobDescription(event.target.value),
      options: [
        {
          label: "Send",
          onAction: async () => {
            return await fetchCoverLetter({
              jobDescription,
            });
          },
          onDone: (data?: any) => {
            const converted = textToHtml(data.generatedCoverLetter);
            setCoverLetter(converted);
            setStepIndex(stepIndex + 1);
          },
          onError: (error: any) => {
            console.log(error);
          },
        },
        {
          label: "Fill with test data",
          onAction: () => {
            setJobDescription(jobs.disney);
          },
        },
      ],
    },
    {
      botText: "Here is your generated cover letter...",
      data: coverLetter,
      inputType: "editor",
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        setCoverLetter(event.target.value),
      options: [
        {
          label: "Save",
          onAction: () => {
            alert("Save!\n\n" + coverLetter);
          },
        },
      ],
    },
  ] as PromptStep[];

  // if (error) return <div>Failed to load</div>;

  return (
    <main className="max-w-5xl h-full p-6">
      {steps.map((step, index) => {
        if (index <= stepIndex) {
          return <PromptAnswerForm key={index} {...step} />;
        }
        return null;
      })}
    </main>
  );
}
