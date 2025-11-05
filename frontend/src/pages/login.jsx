import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/dashboardComponents/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    console.log("Login attempt:", { email, password });
  };

  const handleGoogleSignIn = () => {
    window.location.href = "/auth/google"; // your backend OAuth route
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

      {/* LEFT SIDE: Logo + Tagline */}
      <motion.div
        className="flex-1 flex justify-center items-center p-10 md:p-16 text-center md:text-left"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <Link
            to="/"
            className="inline-block relative group"
            title="Go to dashboard"
            aria-label="Go to dashboard"
          >
            <img
              src="/Notenest-logo.png"
              alt="NoteNest Logo"
              className="w-72 mx-auto md:mx-0 mb-8 drop-shadow-xl cursor-pointer"
            />
            <span
              role="tooltip"
              className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Go to dashboard
            </span>
          </Link>
          <p className="mt-4 text-slate-300 text-lg max-w-md">
            Log in to access your notes, folders, and all your organized ideas — anytime, anywhere.
          </p>
        </div>
      </motion.div>

      {/* RIGHT SIDE: Login Form */}
      <motion.div
        className="flex-1 flex justify-center items-center"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-full max-w-md bg-[#1E293B]/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-8">
          <h2 className="text-3xl font-extrabold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* ✅ Forgot Password link */}
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:underline hover:text-blue-300 transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <div className="text-sm text-red-400 bg-red-900/20 p-2 rounded">
                {error}
              </div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg shadow-lg"
            >
              Log In
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

            {/* Switch to Signup */}
            <p className="text-center text-slate-400 text-sm mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
