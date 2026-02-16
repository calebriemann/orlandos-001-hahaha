"use client";

import React, { useState, useEffect } from "react";

const contactLinks = [
  { href: "https://github.com/shanon-g", icon: "https://shnplatz.vercel.app/assets/github_icon.png", label: "GitHub" },
  { href: "https://www.linkedin.com/in/shanon-giuly-istanto/", icon: "https://shnplatz.vercel.app/assets/linkedin_icon.png", label: "LinkedIn" },
  { href: "https://discord.com/users/551231698046812160", icon: "https://shnplatz.vercel.app/assets/discord_icon.png", label: "Discord" },
  { href: "https://www.instagram.com/shanon_g.i/", icon: "https://shnplatz.vercel.app/assets/instagram_icon.png", label: "Instagram" },
  { href: "https://x.com/shannn_tw9", icon: "https://shnplatz.vercel.app/assets/x_icon.png", label: "Twitter/X" },
  { href: "https://www.youtube.com/@shn.mp4", icon: "https://shnplatz.vercel.app/assets/youtube_icon.png", label: "YouTube" },
];

interface ContactWindowProps {
  contactRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent) => void;
  setShowContact: (v: boolean) => void;
}

export default function ContactWindow({ contactRef, onPointerDown, setShowContact }: ContactWindowProps) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowContact(false);
      setClosing(false);
    }, 300);
  };

  return (
    <div
      ref={contactRef}
      className="fixed z-100 flex items-center justify-center w-[90%] max-w-4xl h-[500px] left-1/2 top-[46%] transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className={`relative h-full w-full ${closing ? "dockDown" : "dockUp"}`}>
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />
        <div className="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10">
          {/* Title Bar */}
          <div
            onPointerDown={(e) => { onPointerDown(e); }}
            className="touch-none flex items-center justify-center gap-2 bg-[#a4e2a0] border-b-[4px] border-[#36312C] px-4 py-2 cursor-move rounded-t-xl text-center relative"
          >
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/images/logo-1.png"
              alt="logo"
              className="absolute left-4 w-13 h-13"
            />
            <span className="font-bold text-center w-full pulse-glow">Contact Me</span>
            <div className="absolute right-4 flex gap-2">
              <button onClick={handleClose} className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#757ed3] transition-colors duration-200">
                −
              </button>
              <button onClick={handleClose} className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#c4576e] transition-colors duration-200">
                ✕
              </button>
            </div>
          </div>

          {/* Contact Icons Grid */}
          <div className="px-6 py-8 sm:px-14 sm:py-10 flex flex-wrap justify-center items-center gap-x-6 gap-y-10 sm:gap-14 overflow-y-auto max-h-full">
            {contactLinks.map((item, i) => (
              <span
                key={i}
                onClick={() => {
                  setTimeout(() => {
                    window.open(item.href, "_blank");
                  }, 600);
                }}
                className="relative group inline-block cursor-pointer border-none outline-none bg-transparent p-0"
              >
                {/* Shadow layer */}
                <span className="absolute inset-0 bg-[#36312C] border-[3px] sm:border-[5px] border-[#36312C] rounded-xl sm:rounded-2xl translate-y-[6px] translate-x-[6px] sm:translate-y-[10px] sm:translate-x-[10px] z-0 transition-all group-hover:translate-y-[3px] group-active:translate-y-[3px]" />
                {/* Card */}
                <span className="relative z-10 flex flex-col items-center justify-center w-20 h-20 sm:w-40 sm:h-40 bg-[#F9F2E4] border-[3px] sm:border-[5px] border-[#36312C] rounded-xl sm:rounded-2xl transition-transform group-hover:-translate-y-1 group-active:translate-y-[2px]">
                  <img src={item.icon} alt={item.label} className="w-10 h-10 sm:w-16 sm:h-16 object-contain" />
                  {/* Label on hover (desktop) */}
                  <span className="absolute top-full mt-2 sm:mt-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-[#36312C] font-bold text-xs sm:text-base text-center whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
