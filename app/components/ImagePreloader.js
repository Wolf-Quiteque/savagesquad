'use client';

import { useEffect, useState } from 'react';
import './ImagePreloader.css';

export default function ImagePreloader({ onLoadComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles only on client to avoid hydration mismatch
    const generatedParticles = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(generatedParticles);

    const loadImages = async () => {
      // Wait for DOM to be fully ready and CMS content to load
      await new Promise(resolve => setTimeout(resolve, 800));

      // Keep polling for new images until they stabilize (CMS content loaded)
      const getImages = () => document.querySelectorAll('img:not([style*="display: none"])');
      
      let previousCount = 0;
      let stableCount = 0;
      const maxAttempts = 25;
      let attempts = 0;

      const checkImagesStabilized = () => {
        return new Promise((resolve) => {
          const checkStability = setInterval(() => {
            const currentImages = getImages();
            const currentCount = currentImages.length;

            // If image count hasn't changed, consider it stable
            if (currentCount === previousCount) {
              stableCount++;
            } else {
              stableCount = 0;
            }

            previousCount = currentCount;
            attempts++;

            // Continue if stable for 3 checks or reached max attempts
            if (stableCount >= 3 || attempts >= maxAttempts) {
              clearInterval(checkStability);
              resolve(currentImages);
            }
          }, 200);
        });
      };

      const imageElements = await checkImagesStabilized();
      const totalImages = imageElements.length;

      if (totalImages === 0) {
        handleLoadComplete();
        return;
      }

      let loadedCount = 0;
      const loadedImages = new Set();
      const imageLoadPromises = [];

      const updateProgress = (img) => {
        // Prevent duplicate counting
        if (loadedImages.has(img)) return;
        loadedImages.add(img);

        loadedCount++;
        const newProgress = Math.floor((loadedCount / totalImages) * 100);
        setProgress(newProgress);

        if (loadedCount >= totalImages) {
          handleLoadComplete();
        }
      };

      const loadImagePromise = (img) => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalHeight !== 0) {
            updateProgress(img);
            resolve();
          } else {
            const onLoad = () => {
              updateProgress(img);
              img.removeEventListener('load', onLoad);
              img.removeEventListener('error', onError);
              resolve();
            };
            const onError = () => {
              updateProgress(img);
              img.removeEventListener('load', onLoad);
              img.removeEventListener('error', onError);
              resolve();
            };
            img.addEventListener('load', onLoad);
            img.addEventListener('error', onError);
          }
        });
      };

      imageElements.forEach((img) => {
        imageLoadPromises.push(loadImagePromise(img));
      });

      // Wait for all images to load or timeout
      await Promise.race([
        Promise.all(imageLoadPromises),
        new Promise(resolve => setTimeout(resolve, 12000))
      ]);

      // Ensure we complete even if some images didn't load
      if (loadedCount < totalImages) {
        setProgress(100);
        handleLoadComplete();
      }
    };

    // Start loading after a brief delay to ensure DOM is ready
    const timer = setTimeout(loadImages, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadComplete = () => {
    // Ensure 100% is shown briefly
    setProgress(100);

    // Wait a bit longer to ensure all images truly loaded
    setTimeout(() => {
      setIsVisible(false);

      // Re-initialize AOS animations after loader is done
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.AOS) {
          window.AOS.refresh();
        }

        // Notify parent component
        if (onLoadComplete) {
          onLoadComplete();
        }
      }, 300);
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div className={`preloader-wrapper ${!isVisible ? 'fade-out' : ''}`}>
      {/* Animated Background Grid */}
      <div className="preloader-grid">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="grid-cell" style={{ animationDelay: `${i * 50}ms` }}></div>
        ))}
      </div>

      {/* Center Logo Area */}
      <div className="preloader-center">
        {/* Animated Circles */}
        <div className="loader-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>

        {/* Brand Text */}
        <div className="preloader-brand">
          <h1>Savage Squade</h1>
          <p>Loading your journey</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="preloader-progress">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">{progress}%</span>
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
