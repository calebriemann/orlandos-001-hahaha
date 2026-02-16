"use client";

import React, { useState, useRef, useCallback } from "react";
import SkyBackground from "@/components/sections/sky-background";
import SideDock from "@/components/sections/side-dock";
import Taskbar from "@/components/sections/taskbar";
import SplashScreen from "@/components/sections/splash-screen";
import ProjectsWindow from "@/components/sections/projects-window";
import AboutWindow from "@/components/sections/about-window";
import ContactWindow from "@/components/sections/contact-window";
import SuggestionsWindow from "@/components/sections/suggestions-window";
import JourneyWindow from "@/components/sections/journey-window";

export default function Home() {
  const [showProjects, setShowProjects] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showJourney, setShowJourney] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "detailed">("detailed");

  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  // Drag state
  const dragTarget = useRef<React.RefObject<HTMLDivElement | null> | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, ref: React.RefObject<HTMLDivElement | null>) => {
      const el = ref.current;
      if (!el) return;
      dragTarget.current = ref;
      dragStart.current = { x: e.clientX, y: e.clientY };
      dragOffset.current = { x: el.offsetLeft, y: el.offsetTop };
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("pointercancel", handlePointerUp);
    },
    []
  );

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const ref = dragTarget.current;
    if (!ref || !ref.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    ref.current.style.left = `${dragOffset.current.x + dx}px`;
    ref.current.style.top = `${dragOffset.current.y + dy}px`;
  }, []);

  const handlePointerUp = useCallback(() => {
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    document.removeEventListener("pointercancel", handlePointerUp);
    dragTarget.current = null;
  }, [handlePointerMove]);

  const closeAll = () => {
    setShowProjects(false);
    setShowAbout(false);
    setShowContact(false);
    setShowSuggestions(false);
    setShowJourney(false);
  };

  return (
    <div className="h-dvh w-screen overflow-hidden grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] relative">
      {/* Splash intro overlay */}
      <SplashScreen />

      {/* Sky background with clouds */}
      <SkyBackground />

      {/* Left sidebar dock */}
      <SideDock
        onProjectsClick={() => setShowProjects(true)}
        onAboutClick={() => setShowAbout(true)}
        onContactClick={() => setShowContact(true)}
        onSuggestionsClick={() => setShowSuggestions(true)}
        onJourneyClick={() => setShowJourney(true)}
      />

      {/* Main content area with modal windows */}
      <main className="relative z-10 min-h-0">
        {showProjects && (
          <ProjectsWindow
            projectsRef={projectsRef}
            onPointerDown={(e) => handlePointerDown(e, projectsRef)}
            setShowProjects={setShowProjects}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        )}
        {showAbout && (
          <AboutWindow
            aboutRef={aboutRef}
            onPointerDown={(e) => handlePointerDown(e, aboutRef)}
            setShowAbout={setShowAbout}
          />
        )}
        {showContact && (
          <ContactWindow
            contactRef={contactRef}
            onPointerDown={(e) => handlePointerDown(e, contactRef)}
            setShowContact={setShowContact}
          />
        )}
        {showSuggestions && (
          <SuggestionsWindow
            suggestionsRef={suggestionsRef}
            onPointerDown={(e) => handlePointerDown(e, suggestionsRef)}
            setShowSuggestions={setShowSuggestions}
          />
        )}
        {showJourney && (
          <JourneyWindow
            journeyRef={journeyRef}
            onPointerDown={(e) => handlePointerDown(e, journeyRef)}
            setShowJourney={setShowJourney}
          />
        )}
      </main>

      {/* Bottom taskbar spanning full width */}
      <Taskbar onCloseAll={closeAll} />
    </div>
  );
}
