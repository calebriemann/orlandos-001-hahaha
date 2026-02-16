import React from 'react';

/**
 * SkyBackground Component
 * 
 * Desktop background with sky-blue color, centered logo watermark,
 * and animated parallax cloud layers.
 */
const SkyBackground: React.FC = () => {
  const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/images/logo-1.png";
  const cloudBackUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/images/cloudback-2.png";
  const cloudFrontUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0ede862f-a57f-46a3-a390-d129c1493ba1-shnplatz-vercel-app/assets/images/cloudfront-3.png";

  return (
    <div className="fixed inset-0 w-full h-full bg-[#C1E3E1] overflow-hidden -z-10 pointer-events-none">
      {/* Subtle Centered Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-3/4 max-w-2xl opacity-15 select-none">
          <img
            src={logoUrl}
            alt="Andrew Jonathan Watermark"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Parallax Cloud Layers */}
      <div className="absolute top-0 left-0 w-full h-[120px] sm:h-[220px] overflow-hidden">
        
        {/* Back Cloud Layer (Slower) */}
        <div 
          className="absolute top-0 left-0 w-[200%] h-full flex opacity-90"
          style={{ 
            animation: 'clouds-back 120s linear infinite',
          }}
        >
          <div className="relative w-1/2 h-full">
            <img 
              src={cloudBackUrl} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
          <div className="relative w-1/2 h-full">
            <img 
              src={cloudBackUrl} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Front Cloud Layer (Faster) */}
        <div 
          className="absolute top-0 left-0 w-[200%] h-full flex opacity-90"
          style={{ 
            animation: 'clouds-front 60s linear infinite',
          }}
        >
          <div className="relative w-1/2 h-full">
            <img 
              src={cloudFrontUrl} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
          <div className="relative w-1/2 h-full">
            <img 
              src={cloudFrontUrl} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes clouds-front {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes clouds-back {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default SkyBackground;
