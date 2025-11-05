import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-md bg-white flex items-center justify-center text-[#0C1892] font-bold">
                NN
              </div>
              <span className="text-lg font-semibold text-white">NoteNest</span>
            </Link>

            <p className="mt-4 text-slate-300 max-w-sm">
              NoteNest helps you keep notes organized and accessible. Simple, fast and reliable.
            </p>
          </div>

          <div className="flex flex-col md:items-center">
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <nav className="space-y-2 text-slate-300">
              <Link to="#" className="hover:text-white">Features</Link>
              <Link to="#" className="hover:text-white">Pricing</Link>
              <Link to="#" className="hover:text-white">Docs</Link>
            </nav>
          </div>

          <div className="flex flex-col md:items-end">
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <nav className="space-y-2 text-slate-300 text-right">
              <Link to="#" className="hover:text-white">About</Link>
              <Link to="#" className="hover:text-white">Careers</Link>
              <Link to="#" className="hover:text-white">Contact</Link>
            </nav>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-slate-400 text-sm flex flex-col md:flex-row md:justify-between">
          <div>© {new Date().getFullYear()} NoteNest. All rights reserved.</div>
          <div className="mt-3 md:mt-0">Built with care • Privacy • Terms</div>
        </div>
      </div>
    </footer>
  );
}
