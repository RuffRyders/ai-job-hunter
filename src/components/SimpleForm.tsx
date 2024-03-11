"use client";
import { FormEventHandler, useState } from "react";
import { jobs } from "@/data/samples/jobs";

interface SimpleFormProps {
  onSubmit: (jobDescription: string) => void;
}

export const SimpleForm = ({ onSubmit }: SimpleFormProps) => {
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
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-6">
          <textarea
            className="w-full h-48 p-3 rounded border border-gray-300 text-black"
            placeholder="Enter job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={fillWithTestInfo}
          className="bg-lime-500 text-white font-bold py-2 px-4 rounded hover:bg-lime-700 ml-6"
        >
          Fill with test info
        </button>
      </form>
    </div>
  );
};
