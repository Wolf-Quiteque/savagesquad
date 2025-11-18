'use client';

import { useEffect } from 'react';

/**
 * Hook to preload images in the background
 * Specifically handles MongoDB/CMS images that load dynamically
 */
export function useImagePreloader() {
  useEffect(() => {
    const preloadImages = () => {
      // Get all images on the page
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        // Skip if already loaded
        if (img.complete && img.naturalHeight !== 0) {
          return;
        }

        // Create a new image element to preload
        const preloadImg = new Image();
        preloadImg.src = img.src;
        preloadImg.alt = img.alt;
        
        // When preload image loads, trigger a refresh
        preloadImg.onload = () => {
          // Dispatch custom event for image loaded
          window.dispatchEvent(new CustomEvent('imagePreloaded', { detail: { src: img.src } }));
        };

        preloadImg.onerror = () => {
          // Also dispatch on error to prevent hanging
          window.dispatchEvent(new CustomEvent('imagePreloaded', { detail: { src: img.src } }));
        };
      });
    };

    // Run preload immediately
    preloadImages();

    // Run again after a short delay to catch dynamically added images
    const timer1 = setTimeout(preloadImages, 500);
    const timer2 = setTimeout(preloadImages, 1000);
    const timer3 = setTimeout(preloadImages, 1500);
    const timer4 = setTimeout(preloadImages, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);
}
