"use client";

import React, { useState } from "react";

// --- Skills Data ---
const languages = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "TypeScript" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", label: "Java" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", label: "Python" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", label: "PHP" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", label: "C" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", label: "C++" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", label: "C#" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", label: "HTML" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", label: "CSS" },
];

const frameworks = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", label: "Next.js" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", label: "Laravel" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", label: "TensorFlow" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", label: "Node.js" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", label: "Django" },
];

const tools = [
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind CSS" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", label: "MySQL" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", label: "Jupyter" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", label: "Unity" },
];

function SkillCubeGrid({ items }: { items: { icon: string; label: string }[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="pt-2 flex flex-wrap justify-center items-center gap-6 px-4">
      {items.map((item, i) => (
        <div
          key={i}
          className={`cube-wrapper ${active === i ? "flipped" : ""}`}
          onClick={() => {
            if (window.innerWidth < 768) setActive((v) => (v === i ? null : i));
          }}
        >
          <div className="cube-inner">
            <div className="cube-face cube-front">
              <img src={item.icon} alt={item.label} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
            </div>
            <div className="cube-face cube-back text-sm sm:text-base">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Main About Window ---
interface AboutWindowProps {
  aboutRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent) => void;
  setShowAbout: (v: boolean) => void;
}

export default function AboutWindow({ aboutRef, onPointerDown, setShowAbout }: AboutWindowProps) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowAbout(false);
      setClosing(false);
    }, 300);
  };

  return (
    <div
      ref={aboutRef}
      className="fixed flex items-center justify-center w-[96vw] max-w-6xl h-[80vh] max-h-[900px] min-h-[650px] left-1/2 top-[47%] transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`relative h-full w-full ${closing ? "dockDown" : "dockUp"}`}>
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />
        <div className="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10">
          {/* Title Bar */}
          <div
            onPointerDown={onPointerDown}
            className="touch-none flex items-center justify-center gap-2 bg-[#a4c8e2] border-b-[4px] border-[#36312C] px-4 py-2 cursor-move rounded-t-xl text-center relative"
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/images/logo-1.png"
              alt="logo"
              className="absolute left-4 w-13 h-13"
            />
            <span className="font-bold text-center w-full pulse-glow">About Me</span>
            <div className="absolute right-4 flex gap-2">
              <button onClick={handleClose} className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#757ed3] transition-colors duration-200">
                −
              </button>
              <button onClick={handleClose} className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#c4576e] transition-colors duration-200">
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1 p-6 sm:p-10 text-[#36312C]">
            {/* Bio Section */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              {/* Photo */}
              <div className="w-full sm:w-1/3 flex justify-center">
                <div className="aspect-[4/6] w-full overflow-hidden rounded-xl border-[3px] border-[#36312C] bg-[#d7d0c4]">
                  <div className="w-full h-full flex items-center justify-center bg-[#d7d0c4] text-[#36312C]">
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                      <span className="text-sm font-bold opacity-60">Andrew Jonathan</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="text-[#36312C] text-sm sm:text-base space-y-4 w-full sm:w-2/3">
                <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-base">
                  <div className="font-bold">Name</div>
                  <div>: Andrew Jonathan</div>
                  <div className="font-bold">Major</div>
                  <div>: Computer Science - Software Engineering</div>
                  <div className="font-bold">GPA</div>
                  <div>: 3.92 (up to 5th semester)</div>
                </div>

                <div>
                  <p className="text-sm">
                    Aspiring <span className="font-bold">Full Stack Engineer</span> &{" "}
                    <span className="font-bold">iOS Developer</span>. Known for fast learning, and adaptability.
                  </p>
                </div>

                <div>
                  <p className="font-bold">Notable Highlights:</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Junior iOS Developer at Apple Developer Academy 2026</li>
                    <li>Lab Assistant at Software Laboratory Center</li>
                    <li>Mentor (Scholarship) at SASC, BINUS University</li>
                    <li>Regional President of HIMTI (Himpunan Mahasiswa Teknik Informatika)</li>
                    <li>Freshmen Partner at BINUS University</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold">Language:</p>
                  <ul className="list-disc list-inside text-sm">
                    <li>Indonesian – Native</li>
                    <li>English – Fluent</li>
                  </ul>
                </div>

                <div>
                  <p className="font-bold text-[13px]">
                    hint: try clicking on the <span className="underline">planes</span> 😌
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="border-t-4 border-[#36312C] pt-10 mt-8">
              <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10 relative inline-block w-full skill_motion">
                <span className="relative z-10">🤸‍♀️ Skills</span>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-24 h-[4px] bg-[#36312C] rounded-full z-0" />
              </h2>

              {/* Languages */}
              <div className="mt-8">
                <h3 className="text-center text-xl sm:text-2xl font-semibold mb-4 relative inline-block w-full skill_animate">
                  <span className="relative z-10">💻 Languages</span>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-16 h-[3px] bg-[#7F9795] rounded-full z-0" />
                </h3>
                <SkillCubeGrid items={languages} />
              </div>

              {/* Frameworks */}
              <div className="mt-14">
                <h3 className="text-center text-xl sm:text-2xl font-semibold mb-4 relative inline-block w-full skill_animate">
                  <span className="relative z-10">📚 Frameworks & Libraries</span>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-20 h-[3px] bg-[#7F9795] rounded-full z-0" />
                </h3>
                <SkillCubeGrid items={frameworks} />
              </div>

              {/* Tools */}
              <div className="mt-14">
                <h3 className="text-center text-xl sm:text-2xl font-semibold mb-4 relative inline-block w-full skill_animate">
                  <span className="relative z-10">🛠️ Tools & Platforms</span>
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-16 h-[3px] bg-[#7F9795] rounded-full z-0" />
                </h3>
                <SkillCubeGrid items={tools} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
