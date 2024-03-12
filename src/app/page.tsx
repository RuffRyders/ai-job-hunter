"use client";

import { fetchCoverLetter } from "@/data/api/fetchCoverLetter";
import { useFetchFunction } from "@/utils/fetch/useFetchFunction";
import { useEffect, useState } from "react";
import { PromptAnswerForm } from "@/components/forms/PromptAnswerForm";
import { jobs } from "@/data/samples/jobs";

interface PrompOption {
  label: string;
  callback: (data?: string) => void;
}

interface PromptStep {
  prompt: string;
  data: string;
  inputType?: "textarea" | "text";
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  options: PrompOption[];
}

export default function Home() {
  const { fetcher, data, loading, error } = useFetchFunction({
    fetchFunction: fetchCoverLetter,
  });
  const [coverLetter, setCoverLetter] = useState<string>();
  const [jobDescription, setJobDescription] = useState("");
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (data) {
      if (data.generatedCoverLetter) {
        const converted = data.generatedCoverLetter
          .split("\n")
          .map((line) => {
            if (line === "") {
              return null;
            }
            return `<p>${line}</p>`;
          })
          .filter(Boolean)
          .join("");
        setCoverLetter(converted);
      }
    }
  }, [data]);

  const handleSubmit = async (jobDescription: string) =>
    fetcher({
      jobDescription,
    });

  const steps = [
    {
      prompt: "Hi. I am an AI cover letter generator.",
      options: [
        {
          label: "Let's get started!",
          callback: () => {
            setStepIndex(stepIndex + 1);
          },
        },
      ],
    },
    {
      prompt: "Stupendous, but I need the job description to work my magic.",
      data: jobDescription,
      inputType: "textarea",
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        setJobDescription(event.target.value),
      options: [
        {
          label: "Send",
          callback: (data?: string) => {
            setStepIndex(stepIndex + 1);
            handleSubmit(jobDescription);
          },
        },
        {
          label: "Fill with test data",
          callback: () => {
            setJobDescription(jobs.disney);
          },
        },
      ],
    },
    {
      prompt: "Here is your generated cover letter...",
      data: coverLetter,
      inputType: "editor",
      onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) =>
        setCoverLetter(event.target.value),
      options: [
        {
          label: "Save",
          callback: (data?: string) => {
            alert("Save!\n\n" + data);
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
