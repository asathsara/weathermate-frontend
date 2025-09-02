import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const { refetch } = useAuth(); // will re-check auth after login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
   

    const mutation = useMutation({
        mutationFn: () => login(username, password),
        onSuccess:  async () => {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 max-w-sm w-full p-8 bg-white rounded-lg shadow-lg"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

                {error && <p className="text-red-500">{error}</p>}

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-3 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-3 rounded"
                />

                <button
                    type="submit"
                    disabled={mutation.status === "pending"}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded cursor-pointer disabled:opacity-50"
                >
                    {mutation.status ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
