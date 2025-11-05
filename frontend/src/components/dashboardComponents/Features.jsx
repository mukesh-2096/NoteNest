import React from "react";

const features = [
  {
    title: "Organize with Folders",
    desc: "Create folders to organize your notes by project, topic, or any structure you prefer.",
    icon: (
      // FolderPlus-like icon
      <svg
        className="h-10 w-10 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11v4M10 13h4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Rich Text Notes",
    desc: "Write beautiful notes with formatting options to highlight important information.",
    icon: (
      // FileText-like icon
      <svg
        className="h-10 w-10 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 7h6M9 12h6M9 17h6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Quick Editing",
    desc: "Edit your notes instantly with our intuitive and responsive editor.",
    icon: (
      // Edit (pencil) icon
      <svg
        className="h-10 w-10 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 21l3-1 11-11 1-3-3 1L4 20z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 7l3 3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Code Documentation",
    desc: "Write and document code with our split-view editor for coding explanations.",
    icon: (
      // Code icon (angle brackets)
      <svg
        className="h-10 w-10 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 7l-6 10"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 7l6 10"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-white">
          Powerful Features for Your Notes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#1E293B] rounded-lg p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-blue-500/20 border border-white/5"
            >
              <div className="flex justify-center mb-6 text-white">
                {f.icon}
              </div>
              <h3 className="text-center text-xl font-semibold mb-3 text-white">
                {f.title}
              </h3>
              <p className="text-center text-slate-100">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
