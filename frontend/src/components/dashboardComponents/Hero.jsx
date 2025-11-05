import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="mt-8 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-16">
        {/* Left: Text Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
            Organize your thoughts with
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              NoteNest
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-prose">
            Create folders, add files, and write notes effortlessly. Your ideas,
            neatly organized and always accessible.
          </p>

          <Link
            to="/signup"
            className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-lg text-white font-medium"
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Right: Image Section */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-[#1E293B] rounded-xl p-8 shadow-2xl w-full max-w-md ring-1 ring-white/10 hover:ring-blue-500/30 transition">
            <img
              src="/Notenest-logo.png"
              alt="NoteNest logo"
              className="w-full h-auto object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
