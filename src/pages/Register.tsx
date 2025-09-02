import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../services/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  

  const mutation = useMutation({
    mutationFn: () => register(username, password),
    onSuccess: () => {
      setSuccess("Registration successful! You can now login.");
      setError("");
      setUsername("");
      setPassword("");
    },
    onError: () => {
      setError("Registration failed");
      setSuccess("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm w-full p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

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
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded cursor-pointer disabled:opacity-50"
        >
          {mutation.status === "pending" ? "Registering..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
