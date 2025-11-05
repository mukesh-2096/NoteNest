import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BACKEND } from "../utils/api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    // Frontend password validation (matches backend rules)
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!/[A-Z]/.test(form.password)) {
      setError('Password must contain at least one uppercase letter');
      return;
    }
    // call backend register
    fetch(`${BACKEND}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Signup failed');
        // After signup, ask user to login instead of auto-logging in
        setSuccess('Account created successfully. Please log in.');
        navigate('/login');
      })
      .catch((err) => setError(err.message || 'Signup failed'));
  };

  const handleGoogleSignIn = () => {
    window.location.href = `${BACKEND}/api/auth/google`;
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#0F172A] text-white relative overflow-hidden"
      style={{
  backgroundImage: `
    radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(135deg, rgba(59,130,246,0.12), rgba(14,165,233,0.08))
  `,
  backgroundSize: "20px 20px, 100% 100%",
}}

    >
      {/* Floating decorative blob */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        animate={{ x: [0, 120, -120, 0], y: [0, 80, -60, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      {/* LEFT: Logo / Illustration */}
      <motion.div
        className="flex-1 flex justify-center items-center p-10 md:p-20"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-md text-center">
          <Link to="/" className="inline-block relative group" title="Go to dashboard" aria-label="Go to dashboard">
            <img
              src="/Notenest-logo.png"
              alt="NoteNest Logo"
              className="w-64 mx-auto mb-8 drop-shadow-xl cursor-pointer"
            />
            <span
              role="tooltip"
              className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Go to dashboard
            </span>
          </Link>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Welcome to NoteNest
          </h1>
          <p className="mt-4 text-slate-300 text-lg">
            Organize your ideas beautifully with folders, notes, and powerful
            features built for creators.
          </p>
        </div>
      </motion.div>

      {/* RIGHT: Signup Form */}
      <motion.div
        className="flex-1 flex justify-center items-center px-6 py-12 md:py-0"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-md bg-[#1E293B]/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-8">
          <h2 className="text-3xl font-extrabold text-center mb-6">
            Create your account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 text-slate-300"
              >
                {showPassword ? (
                  // Eye-off
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3.5-10-8 1.084-2.821 3.246-4.967 6.001-6.009M3 3l18 18"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.94 10.94A3 3 0 0113.06 13.06"
                    />
                  </svg>
                ) : (
                  // Eye
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Confirm Password
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="w-full px-4 py-2 rounded-lg bg-[#0F172A] border border-slate-700 text-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-2 top-9 text-slate-300"
              >
                {showConfirm ? (
                  // Eye-off
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3.5-10-8 1.084-2.821 3.246-4.967 6.001-6.009M3 3l18 18"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.94 10.94A3 3 0 0113.06 13.06"
                    />
                  </svg>
                ) : (
                  // Eye
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Success message */}
            {success && (
              <div className="text-sm text-green-400 bg-green-900/20 p-2 rounded">
                {success}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="text-sm text-red-400 bg-red-900/20 p-2 rounded">
                {error}
              </div>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg shadow-lg"
            >
              Sign Up
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-sm text-slate-400">or continue with</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Google Sign-in */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full inline-flex items-center justify-center gap-3 px-4 py-2 rounded-lg border border-white/10 bg-[#0B1220] hover:bg-[#0E1726] transition text-slate-100"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 533.5 544.3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M533.5 278.4c0-17.4-1.2-34.1-3.4-50.4H272v95.4h146.9c-6.3 34-25.5 62.8-54.6 82v68.3h88.2c51.6-47.6 81-117.6 81-195.3z"
                  fill="#4285F4"
                />
                <path
                  d="M272 544.3c73.6 0 135.4-24.2 180.5-65.6l-88.2-68.3c-24.5 16.5-56 26.3-92.3 26.3-70.9 0-131-47.9-152.4-112.4H26.1v70.8C70.2 485.1 165 544.3 272 544.3z"
                  fill="#34A853"
                />
                <path
                  d="M119.6 322.3c-10.6-31.9-10.6-66.1 0-98l-93.5-70.8C8.9 194 0 233.3 0 272c0 38.7 8.9 78 26.1 118.5l93.5-68.2z"
                  fill="#FBBC05"
                />
                <path
                  d="M272 107.7c38.9 0 74 13.4 101.6 39.6l76.2-76.2C407.4 26.1 349.3 0 272 0 165 0 70.2 59.1 26.1 151.5l93.5 70.8C141 155.6 201.1 107.7 272 107.7z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>

            {/* Login link */}
            <p className="text-center text-slate-400 text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
