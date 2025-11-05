import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#1E293B]/80 backdrop-blur-xl border-r border-white/10 flex flex-col justify-between p-6">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-white text-[#0C1892] rounded-md flex items-center justify-center font-bold">NN</div>
          <h1 className="text-xl font-semibold text-white">NoteNest</h1>
        </div>

        {/* Nav Links */}
        <nav className="space-y-3">
          <Link to="/home" className="flex items-center gap-3 px-3 py-2 rounded-md bg-blue-600/20 text-blue-400 font-medium">
            <i className="ri-dashboard-line"></i> Dashboard
          </Link>
          <Link to="/notes" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition">
            <i className="ri-sticky-note-line"></i> My Notes
          </Link>
          <Link to="/pinned" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition">
            <i className="ri-pushpin-line"></i> Pinned Notes
          </Link>
          <Link to="/shared" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition">
            <i className="ri-share-line"></i> Collabed Notes
          </Link>
        </nav>
      </div>

      {/* Profile */}
      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
            M
          </div>
          <div>
            <p className="text-sm font-semibold">Mukesh</p>
            <p className="text-xs text-slate-400">mukesh@example.com</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-red-600/20 text-red-400 hover:bg-red-600/30 py-2 rounded-lg text-sm transition">
          Logout
        </button>
      </div>
    </aside>
  );
}
