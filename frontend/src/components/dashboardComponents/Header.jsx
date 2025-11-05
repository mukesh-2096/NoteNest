import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    // Make header full width and fixed to top so the colored bar spans the whole viewport.
    <>
      <header className="w-full fixed top-0 left-0 z-50 bg-[#1E293B]/90 backdrop-blur-md shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                  NN
                </div>
                <span className="text-lg font-semibold text-white tracking-wide">
                  NoteNest
                </span>
              </Link>
            </div>

            {/* Desktop actions */}
            <nav className="hidden md:flex items-center gap-4">
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-medium text-white hover:underline"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 bg-white text-[#0C1892] text-sm font-medium rounded-md shadow-sm hover:opacity-95"
              >
                Sign up
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
                className="p-2 rounded-md inline-flex items-center justify-center text-white hover:bg-[#314058]/80"
              >
                {open ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="md:hidden bg-[#314058] border-t border-[#29444b]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:opacity-95"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-[#0C1892] bg-white hover:opacity-90"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent page content from being hidden under the fixed header */}
      <div style={{ height: 64 }} aria-hidden />
    </>
  );
}
