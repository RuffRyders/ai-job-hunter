'use client'
import { FormEventHandler, useState } from 'react'

interface SimpleFormProps {
    onSubmit: (jobDescription: string, coverLetter: string) => void
}

export const SimpleForm = ({ onSubmit }: SimpleFormProps) => {
    const [jobDescription, setJobDescription] = useState('')
    const [coverLetter, setCoverLetter] = useState('')

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        onSubmit(jobDescription, coverLetter)
    }

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
            </form>
        </div>
    )
}
