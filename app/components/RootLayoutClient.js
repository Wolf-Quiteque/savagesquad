'use client';

import { useState, useEffect } from 'react';
import ImagePreloader from './ImagePreloader';
import { useImagePreloader } from '@/hooks/useImagePreloader';

export default function RootLayoutClient({ children }) {
  const [showContent, setShowContent] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);

  // Start background preloading immediately
  useImagePreloader();

  const handleLoadingComplete = () => {
    setImagesReady(true);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  useEffect(() => {
    // Fallback: if no images detected, show content after timeout
    const fallbackTimer = setTimeout(() => {
      if (!showContent) {
        handleLoadingComplete();
      }
    }, 18000);

    return () => clearTimeout(fallbackTimer);
  }, [showContent]);

  return (
    <>
      {!imagesReady && <ImagePreloader onLoadComplete={handleLoadingComplete} />}
      <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s ease-in' }}>
        {children}
      </div>
    </>
  );
}
