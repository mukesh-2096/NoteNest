import React from "react";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
        Ready to organize your notes?
      </h2>
      <p className="text-lg text-white/90 mb-8">
        Sign up for free and start creating your first note today.
      </p>
      <a
        href="#"
        className="inline-block px-8 py-3 bg-white text-blue-700 rounded-full text-lg font-semibold shadow hover:bg-slate-100 transition"
      >
        Get Started Now
      </a>
    </section>
  );
}
