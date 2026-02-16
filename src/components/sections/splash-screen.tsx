"use client";

import React, { useState, useEffect } from "react";

/**
 * SplashScreen component that displays a full-screen video overlay as an intro.
 * It automatically fades out and removes itself from the DOM after the video finishes or a timeout occurs.
 */
const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // The splash screen should typically fade out after the video has played
    // or after a fixed duration (e.g., 2.5 - 3 seconds).
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    // Completely remove from DOM after the transition is finished
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 3500); // 2800ms + transition duration

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden="true"
    >
      <video
        src="https://shnplatz.vercel.app/assets/logo_video2.mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default SplashScreen;