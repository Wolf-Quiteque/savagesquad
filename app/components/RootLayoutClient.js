'use client';

import { useState } from 'react';
import ImagePreloader from './ImagePreloader';

export default function RootLayoutClient({ children }) {
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      {!showContent && <ImagePreloader onLoadComplete={handleLoadingComplete} />}
      <div style={{ opacity: showContent ? 1 : 0, transition: 'opacity 0.3s ease-in' }}>
        {children}
      </div>
    </>
  );
}
