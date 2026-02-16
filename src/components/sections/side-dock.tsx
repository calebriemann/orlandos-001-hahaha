import React from 'react';

interface SideDockProps {
  onProjectsClick: () => void;
  onAboutClick: () => void;
  onContactClick: () => void;
  onSuggestionsClick: () => void;
  onJourneyClick: () => void;
}

const SideDock = ({
  onProjectsClick,
  onAboutClick,
  onContactClick,
  onSuggestionsClick,
  onJourneyClick,
}: SideDockProps) => {
  const navItems = [
    {
      id: 'projects',
      label: 'Projects',
      icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/icons/folder_icon-1.png',
      onClick: onProjectsClick,
    },
    {
      id: 'about',
      label: 'About Me',
      icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/icons/about_icon-2.png',
      onClick: onAboutClick,
    },
    {
      id: 'contact',
      label: 'Contact Me',
      icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/icons/contact_icon-3.png',
      onClick: onContactClick,
    },
    {
      id: 'cv',
      label: 'CV',
      icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/icons/cv_icon-4.png',
      type: 'link' as const,
      href: '/CV_Andrew_Jonathan.pdf',
    },
    {
      id: 'suggestions',
      label: 'Suggestions',
      icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/icons/suggestions_icon-5.png',
      onClick: onSuggestionsClick,
    },
    {
      id: 'journey',
      label: 'Journey',
      icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/icons/journey_icon-6.png',
      onClick: onJourneyClick,
    },
  ];

  const commonClasses = "hover:bg-[#7F9795] rounded-xl p-0 sm:p-[0.1rem] transition flex items-center justify-center flex-shrink group focus:outline-none";
  const imgClasses = "h-[15dvh] w-auto object-contain max-w-[110px] sm:max-w-[160px] active:scale-95 transition-transform duration-100";

  return (
    <aside className="z-40 flex flex-col items-center justify-evenly py-[0.1rem] px-1 sm:py-[0.1rem] sm:px-3 min-h-0 overflow-hidden h-full">
      {navItems.map((item) => {
        if (item.type === 'link') {
          return (
            <button key={item.id} className="focus:outline-none">
              <a
                href={item.href}
                className={commonClasses}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={item.icon} alt={item.label} className={imgClasses} loading="lazy" />
              </a>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            className={commonClasses}
            onClick={item.onClick}
          >
            <img src={item.icon} alt={item.label} className={imgClasses} loading="lazy" />
          </button>
        );
      })}
    </aside>
  );
};

export default SideDock;
