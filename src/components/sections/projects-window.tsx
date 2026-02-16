"use client";

import React, { useState, useRef, useEffect } from "react";

// --- Types ---
interface TechIcon {
  src: string;
  label: string;
}

interface Project {
  name: string;
  language: string;
  type: string;
  category: "major" | "minor";
  image: string;
  description: string;
  links: string[];
  techIcons: TechIcon[];
}

// --- Project Data ---
const projects: Project[] = [
  {
    name: "Andrew's Portfolio",
    language: "TypeScript",
    type: "Frontend",
    category: "major",
    image: "",
    description:
      "Retro-themed personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Three JS elements. The site is modular, and fully responsive for optimal performance and scalability.",
    links: [
      "https://github.com/shanon-g/shnplatz",
    ],
    techIcons: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", label: "TypeScript" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", label: "Next.js" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", label: "Tailwind CSS" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", label: "Three.js" },
    ],
  },
  {
    name: "Skill Bridge",
    language: "JavaScript",
    type: "Fullstack",
    category: "minor",
    image: "",
    description:
      "A matchmaking platform for collaborative skill exchange, built with React (Vite), Express, and MySQL in JavaScript. Features include swipe-to-match profiles, real-time messaging, and JWT-based authentication. Collab project; mainly made backend.",
    links: ["https://github.com/joannemarcelina/Sofeng-AOL"],
    techIcons: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", label: "Express" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", label: "MySQL" },
    ],
  },
  {
    name: "76th (2D Platformer)",
    language: "C# (Unity)",
    type: "Game",
    category: "major",
    image: "",
    description:
      "A 2D platformer for Indonesia's 76th Independence, built with Unity featuring room-based level transitions, shooting mechanics, wall-jumping, and player animation control.",
    links: [
      "https://shnplatz.itch.io/76th",
      "https://github.com/shanon-g/76th_Game",
    ],
    techIcons: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", label: "C#" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", label: "Unity" },
    ],
  },
  {
    name: "Portable Automatic Air Purifier - IoT",
    language: "Python",
    type: "IoT, Deep Learning",
    category: "major",
    image: "",
    description:
      "IoT prototype detects air quality with DHT11 & MQ135 sensors & activates air purifier based on LSTM-predicted pollution levels. Includes MongoDB storage, REST API, FastAPI + AI, Streamlit dashboard. Collab project; mainly helped model & database.",
    links: [
      "https://www.youtube.com/watch?v=-eJvXcAzU8k&t=8s",
      "https://l1nq.com/github-Prototype-PAAP",
    ],
    techIcons: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", label: "Python" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", label: "Jupyter" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", label: "MongoDB" },
    ],
  },
  {
    name: "ASL Alphabet Classifier",
    language: "Python",
    type: "Computer Vision, Deep Learning",
    category: "minor",
    image: "",
    description:
      "Trained a deep learning model to classify American Sign Language (ASL) alphabet using a MobileNetV2 base with data augmentation and fine-tuning. Achieved 99.08% F1 Score on test set using 85k+ training images and class balancing. Collab Project",
    links: ["https://github.com/shanon-g/asl"],
    techIcons: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", label: "Python" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg", label: "Jupyter" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", label: "TensorFlow" },
    ],
  },
  {
    name: "Bubble FizzPop",
    language: "C",
    type: "Game",
    category: "minor",
    image: "",
    description:
      'Console arcade game written in C. Players control a cannon to shoot balls & destroy falling targets labeled with decreasing values (3 to 2 to 1). Includes movement mechanics, random waves, scoring system. Features win/lose conditions & trail effects using ASCII.',
    links: ["https://github.com/shanon-g/bubbleFizzpop"],
    techIcons: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", label: "C" },
    ],
  },
  {
    name: "Christian Wijaya (Simple e-Commerce)",
    language: "JavaScript",
    type: "Frontend",
    category: "minor",
    image: "",
    description:
      "A very simple luxury fashion brand website built with HTML, CSS, & JavaScript. Features responsive pages for product listings (filters), detail views, and event registration. Includes interactive elements like dynamic image previews, scroll-to-top, and newsletter popups.",
    links: [
      "https://github.com/shanon-g/christianwijaya",
      "https://shanon-g.github.io/christianwijaya/",
    ],
    techIcons: [
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", label: "HTML" },
      { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", label: "CSS" },
    ],
  },
];

// --- Tech Icon Cube ---
function TechCube({ icon, isActive, onClick }: { icon: TechIcon; isActive: boolean; onClick: () => void }) {
  return (
    <div
      className={`group cube-wrapper-sm ${isActive ? "flipped" : ""}`}
      onClick={onClick}
    >
      <div className="cube-inner-sm">
        <div className="cube-face-sm cube-front-sm">
          <img src={icon.src} alt={icon.label} className="w-7 h-7 object-contain" />
        </div>
        <div className="cube-face-sm cube-back-sm">{icon.label}</div>
      </div>
    </div>
  );
}

// --- Detailed Project Card ---
function ProjectCard({ project }: { project: Project }) {
  const [activeIcon, setActiveIcon] = useState<number | null>(null);
  const hoverBg = project.category === "major" ? "hover:bg-[#F0CFCF]" : "hover:bg-[#E0D0FF]";

  return (
    <div className={`flex flex-col sm:flex-row sm:items-stretch gap-3 sm:gap-4 px-2 py-2 sm:p-4 rounded-lg ${hoverBg} transition-colors duration-200`}>
      <div className="w-full sm:w-78 shrink-0">
        <div className="aspect-video w-full overflow-hidden border-[3px] border-[#36312C] rounded-xl bg-[#d7d0c4] flex items-center justify-center">
          {project.image ? (
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-[#36312C]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
              </svg>
              <span className="text-xs font-bold opacity-50 mt-1 block">{project.name}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div>
          <h3 className="font-bold sm:text-base text-sm">{project.name}</h3>
          <p className="sm:text-sm text-xs text-[#726e5f]">{project.description}</p>
          <div className="mt-2 sm:text-sm text-xs text-[#726e5f]">
            <p className="font-semibold text-[#36312C] mb-1">Links:</p>
            {project.links.map((link, i) => (
              <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="block hover:underline text-blue-600">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="flex gap-1 mt-1 flex-row flex-wrap items-center">
          {project.techIcons.map((icon, i) => (
            <TechCube key={i} icon={icon} isActive={activeIcon === i} onClick={() => setActiveIcon(activeIcon === i ? null : i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Section Header ---
function SectionHeader({
  title,
  count,
  open,
  onToggle,
  tone,
}: {
  title: string;
  count: number;
  open: boolean;
  onToggle: () => void;
  tone: "major" | "minor";
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full flex items-center justify-between px-4 py-3 border-b-[3px] border-[#36312C] transition-colors duration-200 ${
        tone === "major" ? "bg-[#E4ABAB] hover:bg-[#DFA0A0]" : "bg-[#C9B0F2] hover:bg-[#BBA0EA]"
      }`}
      aria-expanded={open}
    >
      <div className="flex items-center gap-2">
        <span className="font-extrabold tracking-tight">{title}</span>
        <span className="text-xs px-2 py-[2px] rounded-full bg-[#d7d0c4] border-[2px] border-[#36312C]">{count}</span>
      </div>
      <span className="font-black text-lg leading-none select-none">{open ? "▾" : "▸"}</span>
    </button>
  );
}

// --- Collapsed Summary ---
function CollapsedSummary({ projects: projs, tone }: { projects: Project[]; tone: "major" | "minor" }) {
  return (
    <div className={`px-4 py-3 text-xs text-[#726e5f] border-b-[3px] border-[#36312C] ${tone === "major" ? "bg-[#F2C7C7]" : "bg-[#E3D7FF]"}`}>
      <span className="font-semibold text-[#36312C]">Available:</span>{" "}
      {projs.map((p, i) => (
        <span key={p.name}>
          {p.name}
          {i < projs.length - 1 ? " • " : ""}
        </span>
      ))}
    </div>
  );
}

// --- Main Projects Window ---
interface ProjectsWindowProps {
  projectsRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent) => void;
  setShowProjects: (v: boolean) => void;
  viewMode: "list" | "detailed";
  setViewMode: (v: "list" | "detailed") => void;
}

export default function ProjectsWindow({
  projectsRef,
  onPointerDown,
  setShowProjects,
  viewMode,
  setViewMode,
}: ProjectsWindowProps) {
  const [closing, setClosing] = useState(false);
  const [majorOpen, setMajorOpen] = useState(true);
  const [minorOpen, setMinorOpen] = useState(false);

  const majorProjects = projects.filter((p) => p.category === "major");
  const minorProjects = projects.filter((p) => p.category === "minor");

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowProjects(false);
      setClosing(false);
    }, 300);
  };

  return (
    <div
      ref={projectsRef}
      className="fixed flex items-center justify-center w-[96vw] max-w-6xl h-[80vh] max-h-[900px] min-h-[650px] left-1/2 top-[47%] transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`relative h-full w-full ${closing ? "dockDown" : "dockUp"}`}>
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />
        <div className="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10">
          {/* Title Bar */}
          <div
            onPointerDown={onPointerDown}
            className="touch-none flex items-center justify-center gap-2 bg-[#efeea4] border-b-[4px] border-[#36312C] px-4 py-2 cursor-move rounded-t-xl text-center relative"
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/images/logo-1.png"
              alt="logo"
              className="absolute left-4 w-13 h-13"
            />
            <span className="font-bold text-center w-full pulse-glow">Projects</span>
            <div className="absolute right-4 flex gap-2">
              <button onClick={handleClose} className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#757ed3] transition-colors duration-200">
                −
              </button>
              <button onClick={handleClose} className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#c4576e] transition-colors duration-200">
                ✕
              </button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-4 px-4 py-2 border-b-[4px] border-[#36312C]">
            <button onClick={() => setViewMode("list")} className="flex items-center gap-1 hover:bg-[#d7d0c4] rounded-sm transition-colors duration-200">
              <span className="font-semibold">📋 List View</span>
            </button>
            <button onClick={() => setViewMode("detailed")} className="flex items-center gap-1 hover:bg-[#d7d0c4] rounded-sm transition-colors duration-200">
              <span className="font-semibold">📄 Detailed View</span>
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto flex-1">
            {viewMode === "detailed" ? (
              <div className="space-y-4 p-3">
                <div className="rounded-xl border-[3px] border-[#36312C] overflow-hidden bg-[#F9F2E4] shadow-[6px_6px_0_0_#36312C]">
                  <SectionHeader title="Major Projects" count={majorProjects.length} open={majorOpen} onToggle={() => setMajorOpen((v) => !v)} tone="major" />
                  {majorOpen ? (
                    <div className="space-y-2 p-3 bg-[#F6DADA]">
                      {majorProjects.map((p, i) => (
                        <ProjectCard key={`major-${i}`} project={p} />
                      ))}
                    </div>
                  ) : (
                    <CollapsedSummary projects={majorProjects} tone="major" />
                  )}
                </div>
                <div className="rounded-xl border-[3px] border-[#36312C] overflow-hidden bg-[#F9F2E4] shadow-[6px_6px_0_0_#36312C]">
                  <SectionHeader title="Mini Projects" count={minorProjects.length} open={minorOpen} onToggle={() => setMinorOpen((v) => !v)} tone="minor" />
                  {minorOpen ? (
                    <div className="space-y-2 p-3 bg-[#EEE6FF]">
                      {minorProjects.map((p, i) => (
                        <ProjectCard key={`minor-${i}`} project={p} />
                      ))}
                    </div>
                  ) : (
                    <CollapsedSummary projects={minorProjects} tone="minor" />
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4 p-3">
                <div className="rounded-xl border-[3px] border-[#36312C] overflow-hidden bg-[#F9F2E4] shadow-[6px_6px_0_0_#36312C]">
                  <SectionHeader title="Major Projects" count={majorProjects.length} open={majorOpen} onToggle={() => setMajorOpen((v) => !v)} tone="major" />
                  {majorOpen ? (
                    <div className="p-4 bg-[#F6DADA] text-xs sm:text-base">
                      <table className="w-full text-left border-separate border-spacing-y-2 table-fixed">
                        <thead>
                          <tr className="border-b-[2px] border-[#36312C]">
                            <th className="pr-4 w-8">No</th>
                            <th className="pr-4 w-1/2">Name</th>
                            <th className="pr-4 w-1/4">Language</th>
                            <th className="pr-4 w-1/4">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {majorProjects.map((p, i) => (
                            <tr key={`major-row-${i}`} className="rounded-md hover:bg-[#F0CFCF] transition-colors duration-200">
                              <td>{i + 1}.</td>
                              <td className="underline text-[#36312C] hover:opacity-80">
                                <a href={p.links[0] || "#"} target="_blank" rel="noopener noreferrer">{p.name}</a>
                              </td>
                              <td>{p.language}</td>
                              <td>{p.type}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <CollapsedSummary projects={majorProjects} tone="major" />
                  )}
                </div>
                <div className="rounded-xl border-[3px] border-[#36312C] overflow-hidden bg-[#F9F2E4] shadow-[6px_6px_0_0_#36312C]">
                  <SectionHeader title="Mini Projects" count={minorProjects.length} open={minorOpen} onToggle={() => setMinorOpen((v) => !v)} tone="minor" />
                  {minorOpen ? (
                    <div className="p-4 bg-[#EEE6FF]">
                      <table className="w-full text-left border-separate border-spacing-y-2 table-fixed">
                        <thead>
                          <tr className="border-b-[2px] border-[#36312C]">
                            <th className="pr-4 w-8">No</th>
                            <th className="pr-4 w-1/2">Name</th>
                            <th className="pr-4 w-1/4">Language</th>
                            <th className="pr-4 w-1/4">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {minorProjects.map((p, i) => (
                            <tr key={`minor-row-${i}`} className="rounded-md hover:bg-[#E0D0FF] transition-colors duration-200">
                              <td>{i + 1}.</td>
                              <td className="underline text-[#36312C] hover:opacity-80">
                                <a href={p.links[0] || "#"} target="_blank" rel="noopener noreferrer">{p.name}</a>
                              </td>
                              <td>{p.language}</td>
                              <td>{p.type}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <CollapsedSummary projects={minorProjects} tone="minor" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
