"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Taskbar = ({ onCloseAll }: { onCloseAll?: () => void }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <footer className="opacity-95 z-[200] col-span-2 bg-[#7F9795] border-t-[4px] border-[#36312C] px-4 py-3 flex justify-between items-center text-[#F9F2E4] text-sm relative h-auto">
      <div className="relative flex items-center">
        {/* Start Button */}
          <button
            onClick={onCloseAll}
            className="peer rounded-full w-12 h-12 bg-[#F9F2E4] border-[3px] border-[#36312C] flex items-center justify-center animate-pulse-glow transition hover:scale-105 relative z-10"
            aria-label="Start"
          >
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/images/logo-1.png"
            alt="logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            style={{ transform: "rotate(-5deg)" }}
          />
        </button>

        {/* Tooltip: Close All */}
        <span className="ml-2 sm:ml-4 px-2 py-1 sm:px-3 sm:py-1.5 bg-[#F9F2E4] text-[#36312C] border-[2px] border-[#36312C] rounded-lg shadow-[2px_2px_0px_#36312C] font-extrabold text-[10px] sm:text-sm uppercase tracking-wider pointer-events-none opacity-60 origin-left transition-all duration-300 peer-hover:opacity-100 peer-hover:scale-110 whitespace-nowrap z-0">
          Close All
        </span>
      </div>

      {/* Status Area */}
      <div className="flex gap-4 sm:gap-6 items-center">
        {/* Battery Icon */}
        <div className="flex items-center">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/icons/battery_icon-7.png"
            alt="Battery status"
            width={32}
            height={32}
            className="w-8 h-auto object-contain"
          />
        </div>

        {/* WiFi Icon */}
        <div className="flex items-center">
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/icons/wifi_icon-8.png"
            alt="WiFi status"
            width={24}
            height={24}
            className="w-6 h-auto object-contain"
          />
        </div>

        {/* Digital Clock and Date */}
        <div className="text-right leading-tight text-sm font-semibold whitespace-nowrap hidden sm:block">
          <div className="font-status">{formatTime(currentTime)}</div>
          <div className="font-status">{formatDate(currentTime)}</div>
        </div>

        {/* Mobile View Clock (Compact) */}
        <div className="text-right leading-tight text-xs font-semibold sm:hidden">
          <div>{formatTime(currentTime)}</div>
          <div>{formatDate(currentTime)}</div>
        </div>
      </div>
    </footer>
  );
};

export default Taskbar;