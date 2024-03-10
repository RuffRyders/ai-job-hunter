"use client";
import { SimpleForm } from "@/components/SimpleForm";
import { fetchCoverLetter } from "@/data/api/fetchCoverLetter";
import { useFetchFunction } from "@/utils/fetch/useFetchFunction";

export default function Home() {
  const { fetcher, data, loading, error } = useFetchFunction({
    fetchFunction: fetchCoverLetter,
  });

  const handleSubmit = async (jobDescription: string, coverLetter: string) => {
    await fetcher({
      jobDescription,
      coverLetter,
    });
  };

  if (error) return <div>Failed to load</div>;

  return (
    <main className="w-full h-full p-6">
      <p className="text-2xl mb-6 text-center">
        Enter job description and (optionally) a starter cover letter
      </p>
      <SimpleForm onSubmit={handleSubmit} />

      <div className="mt-10 border-t-2 pt-6 pb-20">
        <p className="text-4xl mb-6">Generated Cover Letter</p>
        {data?.generatedCoverLetter ? (
          <p>{data.generatedCoverLetter}</p>
        ) : (
          <p>
            nothing generated yet... provide a job description and your cover
            letter template and click submit
          </p>
        )}
      </div>

      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <p className="text-white text-lg">Loading...</p>
        </div>
      )}
    </main>
  );
}
