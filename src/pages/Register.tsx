import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { register } from "../services/auth";
import type { AxiosError } from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mutation = useMutation({
    mutationFn: () => register(username, password),
    onSuccess: () => {
      setSuccess("Registration successful! You can now log in.");
      setError("");
      setUsername("");
      setPassword("");
    },
    onError: (error: AxiosError) => {
    if (error.response?.status === 409) {
      setError("Username already exists. Please choose another one.");
    } else {
      setError("Registration failed. Please try again.");
    }
    setSuccess("");
  },
  });

  const validateInputs = () => {
    if (!username.trim()) {
      setError("Username is required.");
      return false;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateInputs()) return;

    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-white p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 max-w-md w-full p-12 bg-white rounded-3xl shadow-2xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-2">
          Create Account
        </h2>
        <p className="text-center text-blue-500 text-sm mb-4">
          Sign up to get started
        </p>

        {error && <p className="text-red-500 text-center font-medium">{error}</p>}
        {success && <p className="text-green-600 text-center font-medium">{success}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />

        <button
          type="submit"
          disabled={mutation.status === "pending"}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-5 rounded-xl shadow-md transition duration-300 disabled:opacity-50"
        >
          {mutation.status === "pending" ? "Registering..." : "Sign Up"}
        </button>

        <div className="flex justify-center items-center text-sm text-blue-400 mt-2 space-x-1">
          <span>Already have an account?</span>
          <a href="/login" className="hover:text-blue-600 transition font-medium">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
