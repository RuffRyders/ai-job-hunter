"use client";
import { FormEventHandler, useState } from "react";
import { Button, Textarea } from "@mantine/core";
import { jobs } from "@/data/samples/jobs";

interface JobPostingFormProps {
  onSubmit: (jobDescription: string) => void;
}

export const JobPostingForm = ({ onSubmit }: JobPostingFormProps) => {
  const [jobDescription, setJobDescription] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    onSubmit(jobDescription);
  };

  const fillWithTestInfo = () => {
    setJobDescription(jobs.disney);
  };

  return (
    <div className="flex items-center justify-center">
      <form className="w-full" onSubmit={handleSubmit}>
        <Textarea
          className="w-full"
          placeholder="Enter job description here..."
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
        />
        <Button className="rounded-full" type="submit">
          Submit
        </Button>
        <Button className="rounded-full" onClick={fillWithTestInfo}>
          Fill with test info
        </Button>
      </form>
    </div>
  );
};
