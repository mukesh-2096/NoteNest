import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Sidebar from "../components/homeComponents/Sidebar";

export default function Home() {
  return (
    <div className="min-h-screen flex bg-[#0F172A] text-white relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(135deg, rgba(59,130,246,0.12), rgba(14,165,233,0.08))
        `,
        backgroundSize: "20px 20px, 100% 100%",
      }}
    >
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Welcome */}
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="text-blue-400">Mukesh 👋</span>
          </h1>
          <p className="text-slate-400 mb-8">
            Here’s what’s happening with your notes today.
          </p>

          {/* Recent Notes */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-white">Recent Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["UI ideas", "React Notes", "Meeting Summary"].map((note) => (
                <motion.div
                  key={note}
                  whileHover={{ y: -5 }}
                  className="bg-[#243244]/80 p-5 rounded-xl border border-white/10 shadow-lg hover:shadow-blue-500/10 transition"
                >
                  <h3 className="font-semibold text-white mb-2">{note}</h3>
                  <p className="text-slate-400 text-sm">
                    Some sample content from your note goes here...
                  </p>
                  <div className="flex justify-between items-center mt-3 text-xs text-slate-400">
                    <span>Edited 2h ago</span>
                    <button className="text-blue-400 hover:underline">Open</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Floating Add Note Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white text-xl w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
        >
          +
        </motion.button>
      </main>
    </div>
  );
}
