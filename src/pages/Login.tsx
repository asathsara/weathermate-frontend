import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const { refetch } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const mutation = useMutation({
        mutationFn: () => login(username, password),
        onSuccess: async () => {
            refetch();
        },
        onError: () => {
            setError("Invalid username or password");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        mutation.mutate();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 max-w-md w-full p-10 bg-white rounded-3xl shadow-2xl border border-gray-100"
            >
                <h2 className="text-3xl font-bold text-center text-blue-400 mb-2">
                    Welcome Back
                </h2>
                <p className="text-center text-sky-600 text-sm mb-4">
                    Sign in to your account
                </p>

                {error && (
                    <p className="text-red-500 text-center font-medium">{error}</p>
                )}

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                />

                <button
                    type="submit"
                    disabled={mutation.status === "pending"}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded-xl shadow-md transition duration-300 disabled:opacity-50 cursor-pointer"
                >
                    {mutation.status === "pending" ? "Logging in..." : "Login"}
                </button>

                <div className="flex justify-center items-center text-sm text-blue-400 mt-2 space-x-1">
                    <span>Don't have an account?</span>
                    <a href="/register" className="hover:text-blue-600 transition">Sign up</a>
                </div>
            </form>
        </div>
    );
}
