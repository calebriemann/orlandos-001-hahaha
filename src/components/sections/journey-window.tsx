"use client";

import React, { useState } from "react";

// Timeline data extracted from the original site
const timelineEntries = [
  { label: "Door Start", t: 0, description: "The beginning of the journey" },
  { label: "BINUS Inauguration", t: 1.5, description: "Started at BINUS University, Computer Science" },
  { label: "FP + Mentor", t: 14, description: "Freshmen Partner & Mentor at BINUS University" },
  { label: "HIMTI Whiteboard", t: 27.5, description: "Active involvement in HIMTI organization" },
  { label: "Arcade: Lab Assistant", t: 40.2, description: "Lab Assistant at Software Laboratory Center (2024-2026)" },
  { label: "TV: Apple Academy", t: 55.4, description: "Apple Developer Academy - Talent Spark Cohort 2025" },
  { label: "Chest", t: 71.5, description: "Achievements and memories collected along the way" },
  { label: "Door End", t: 79.5, description: "The journey continues..." },
];

// Gallery images from the original site
const galleryImages: { name: string; title: string; src: string }[] = [
  { name: "pic_entrance", title: "BINUS Inauguration 2023", src: "https://shnplatz.vercel.app/journey/gallery/pic_entrance.png" },
  { name: "pic_himti1a", title: "TECHNO - Bekasi Booth", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti1a.png" },
  { name: "pic_himti1b", title: "TECHNO - Committee", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti1b.png" },
  { name: "pic_himti1c", title: "TECHNO - Visualization Div.", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti1c.png" },
  { name: "pic_himti2", title: "Seminar @BKS 2024", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti2.png" },
  { name: "pic_himti3", title: "Workshop @BKS 2024", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti3.png" },
  { name: "pic_himti4", title: "SESVENT 2024", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti4.png" },
  { name: "pic_himti5", title: "Exec Board Mem. (Pengurus) 2025/2026", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti5.png" },
  { name: "pic_himti6a", title: "President Title Handover", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti6a.png" },
  { name: "pic_himti6b", title: "Exec Board Mem. @BKS", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti6b.png" },
  { name: "pic_himti7", title: "HILET 2025", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti7.png" },
  { name: "pic_himti8a", title: "Kunjungan Kerja Ketua Organisasi 2025/2026", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti8a.png" },
  { name: "pic_himti8b", title: "HIMTI x BNEC", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti8b.png" },
  { name: "pic_himti9", title: "ICPC 2025", src: "https://shnplatz.vercel.app/journey/gallery/pic_himti9.png" },
  { name: "pic_shelf1", title: "Mentor MC", src: "https://shnplatz.vercel.app/journey/gallery/pic_shelf1.png" },
  { name: "pic_shelf2", title: "Mentor B27", src: "https://shnplatz.vercel.app/journey/gallery/pic_shelf2.png" },
  { name: "pic_shelf3", title: "Mentor B28", src: "https://shnplatz.vercel.app/journey/gallery/pic_shelf3.png" },
  { name: "pic_shelf4", title: "FP Session 4", src: "https://shnplatz.vercel.app/journey/gallery/pic_shelf4.png" },
  { name: "pic_shelf5", title: "FP Session 12", src: "https://shnplatz.vercel.app/journey/gallery/pic_shelf5.png" },
  { name: "pic_shelf6", title: "FP Opening", src: "https://shnplatz.vercel.app/journey/gallery/pic_shelf6.png" },
  { name: "arcade_screen", title: "Lab Assistant 2024 - 2026", src: "https://shnplatz.vercel.app/journey/gallery/arcade.png" },
  { name: "tv_screen", title: "Apple Developer Academy - Talent Spark Cohort 2025", src: "https://shnplatz.vercel.app/journey/gallery/tv.png" },
];

interface JourneyWindowProps {
  journeyRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent) => void;
  setShowJourney: (v: boolean) => void;
}

export default function JourneyWindow({
  journeyRef,
  onPointerDown,
  setShowJourney,
}: JourneyWindowProps) {
  const [closing, setClosing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ title: string; src: string } | null>(null);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setShowJourney(false);
      setClosing(false);
    }, 300);
  };

  return (
    <>
      <div
        ref={journeyRef}
        className="fixed flex items-center justify-center w-[96vw] max-w-6xl h-[80vh] max-h-[900px] min-h-[650px] left-1/2 top-[47%] transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className={`relative h-full w-full ${closing ? "dockDown" : "dockUp"}`}>
          <div className="absolute -bottom-3 -right-3 w-full h-full rounded-xl bg-[#36312C] z-0" />
          <div className="bg-[#F9F2E4] border-[6px] border-[#36312C] rounded-xl h-full flex flex-col relative z-10">
            {/* Title Bar */}
            <div
              onPointerDown={onPointerDown}
              className="touch-none flex items-center justify-center gap-2 bg-[#e2b8a4] border-b-[4px] border-[#36312C] px-4 py-2 cursor-move rounded-t-xl text-center relative"
            >
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/images/logo-1.png"
                alt="logo"
                className="absolute left-4 w-13 h-13"
              />
              <span className="font-bold text-center w-full pulse-glow">My Journey</span>
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
            <div className="overflow-y-auto flex-1 p-4 sm:p-6">
              {/* Timeline */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Timeline</h2>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[3px] bg-[#36312C] rounded-full" />
                  <div className="space-y-6">
                    {timelineEntries.map((entry, i) => (
                      <div key={i} className="flex gap-4 sm:gap-6 items-start ml-0">
                        <div className="relative z-10 w-8 h-8 sm:w-12 sm:h-12 shrink-0 rounded-full bg-[#7F9795] border-[3px] border-[#36312C] flex items-center justify-center text-[#F9F2E4] font-bold text-xs sm:text-sm">
                          {i + 1}
                        </div>
                        <div className="pt-1">
                          <h3 className="font-bold text-sm sm:text-base">{entry.label}</h3>
                          <p className="text-xs sm:text-sm text-[#726e5f]">{entry.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <div className="border-t-4 border-[#36312C] pt-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {galleryImages.map((img) => (
                    <button
                      key={img.name}
                      onClick={() => setSelectedImage(img)}
                      className="group relative aspect-video overflow-hidden rounded-xl border-[3px] border-[#36312C] bg-[#d7d0c4] hover:border-[#7F9795] transition-colors"
                    >
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#36312C]/80 to-transparent p-2">
                        <span className="text-[#F9F2E4] text-[10px] sm:text-xs font-bold">{img.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-3 py-6"
          onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedImage(null); }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-4xl rounded-xl bg-[#F9F2E4] border-[6px] border-[#36312C] shadow-[10px_10px_0_0_#36312C] overflow-hidden">
            <div className="flex items-center justify-between gap-3 bg-[#efeea4] border-b-[4px] border-[#36312C] px-4 py-2">
              <div className="min-w-0">
                <div className="font-extrabold text-xs sm:text-base truncate">{selectedImage.title}</div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C] text-[#36312C] text-base font-extrabold hover:bg-[#c4576e] transition-colors duration-200"
                title="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-3 sm:p-4 bg-[#e4cdac]">
              <div className="w-full max-h-[70vh] overflow-auto rounded-lg border-[4px] border-[#36312C] bg-black">
                <img src={selectedImage.src} alt={selectedImage.title} className="block w-full h-auto object-contain" draggable={false} />
              </div>
              <div className="mt-2 text-[10px] sm:text-xs font-bold text-[#36312C] opacity-80">
                Click ✕ / press ESC to close
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
