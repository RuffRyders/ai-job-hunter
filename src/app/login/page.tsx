import { MouseEventHandler } from 'react'
import { login, signup } from './actions'

export default function LoginPage() {
    const handleLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()

        const email = (e.target as HTMLFormElement).email.value
        const password = (e.target as HTMLFormElement).password.value

        login({ email, password })
    }

    const handleSignup: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault()

        const email = (e.target as HTMLFormElement).email.value
        const password = (e.target as HTMLFormElement).password.value

        signup({ email, password })
    }

    return (
        <div
            className="w-full h-screen flex justify-center items-center bg-no-repeat bg-cover"
            style={{ backgroundImage: 'url(/public/login/dark-graph.webp)' }}
        >
            <form className="w-full max-w-md p-8 bg-white rounded-lg shadow-md flex flex-col space-y-4">
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    className="p-2 border rounded"
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    className="p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    onClick={handleLogin}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Log in
                </button>
                <button
                    type="button"
                    onClick={handleSignup}
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                >
                    Sign up
                </button>
            </form>
        </div>
    )
}
