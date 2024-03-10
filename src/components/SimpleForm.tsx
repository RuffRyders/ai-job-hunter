"use client";
import { FormEventHandler, useState } from "react";
import { jobs } from "@/data/samples/jobs";

interface SimpleFormProps {
  onSubmit: (jobDescription: string, coverLetter: string) => void;
}

export const SimpleForm = ({ onSubmit }: SimpleFormProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    onSubmit(jobDescription, coverLetter);
  };

  const fillWithTestInfo = () => {
    // setJobDescription(
    //     'Software Engineer\nWe are looking for a software engineer to join our team. You will be working on a team of developers to build and maintain high-quality software. You will be responsible for writing clean, efficient code and working with other team members to develop new features and products. The ideal candidate will have experience with JavaScript, React, and Node.js. You should be passionate about creating clean, efficient code and be eager to learn new technologies. If you are a software engineer looking for a new opportunity, we encourage you to apply.'
    // )
    // setCoverLetter(
    //     'Dear Hiring Manager, I am writing to express my interest in the Software Engineer position at your company. I am a software engineer with 5 years of experience in the industry. I am proficient in JavaScript, React, and Node.js. I am passionate about creating clean, efficient code and I am always eager to learn new technologies. I am confident that my skills and experience make me a great fit for this position. Thank you for considering my application. I look forward to the opportunity to discuss my application in further detail.'
    // )
    // setJobDescription(
    //     'Senior software engineer.  Ideal candidate will have experience 5+ years with JavaScript, React, and Node.js.'
    // )
    setJobDescription(jobs.disney);
    // setCoverLetter(
    //   "Dear Hiring Manager, I am writing to express my interest in the Software Engineer position at your company."
    // );
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

        <div className="mb-6">
          <textarea
            className="w-full h-48 p-3 rounded border border-gray-300 text-black"
            placeholder="Enter cover letter here..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
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
