"use client";

// import { useFormState } from 'react-dom'
import { FormEvent, useState } from "react";
import { login } from "../actions";
import Link from "next/link";
import SubmitButton from "../_components/SubmitButton";
import { useRouter } from "next/navigation";

// const initialState = {
//     message: '',
// }

export default function LoginPage() {
  const router = useRouter();
  // const [state, action] = useFormState(login, initialState)

  // const handleSignup = () => {}
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (formData: FormData) => {
    setIsLoading(true);
    await login(formData);
    // setIsLoading(false);
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: formData,
    });

    // // Handle response if necessary
    // const data = await response.json();
    // ...
    // console.log("success", data);
    router.replace("/private");
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url(/login/lavender-blue-graph.webp)" }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-md flex flex-col space-y-4"
      >
        <div className="w-full text-center text-3xl">Log In</div>
        {isLoading && <div>Loading...</div>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className="p-2 border rounded-2xl"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className="p-2 border rounded-2xl"
          required
        />
        <button type="submit">Oldskool Log in</button>
        <SubmitButton disabled={isLoading} formAction={handleAction}>
          Log in
        </SubmitButton>

        <div className="flex flex-col w-full items-center">
          <div>New Here?</div>
          <Link
            href="/signup"
            passHref
            className="text-blue-500 hover:text-blue-700 font-bold"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
