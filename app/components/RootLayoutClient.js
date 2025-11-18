'use client';

import { useState, useEffect } from 'react';
import ImagePreloader from './ImagePreloader';

export default function RootLayoutClient({ children }) {
  const [showContent, setShowContent] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  const handleLoadingComplete = () => {
    setImagesReady(true);
    // Immediate transition
    setTimeout(() => {
      setShowContent(true);
    }, 50);
  };

  useEffect(() => {
    // Absolute fallback - never wait more than 10 seconds
    const fallbackTimer = setTimeout(() => {
      if (!showContent) {
        handleLoadingComplete();
      }
    }, 10000);

    return () => clearTimeout(fallbackTimer);
  }, [showContent]);

  return (
    <>
      {!imagesReady && <ImagePreloader onLoadComplete={handleLoadingComplete} />}
      <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.2s ease-in' }}>
        {children}
      </div>
    </>
  );
}
