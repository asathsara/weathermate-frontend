import { useState } from "react";

export default function Login({ onLogin }: { onLogin: () => void }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            onLogin(); // Call the onLogin prop to update the login state
        } catch (error) {
            console.error("Login failed", error);
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 max-w-sm w-full mx-auto p-8 bg-white rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Sign In</h2>
                <input
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                />
                <input
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium transition"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}
