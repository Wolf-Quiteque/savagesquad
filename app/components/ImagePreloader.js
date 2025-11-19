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
      // Quick initial wait for first render
      await new Promise(resolve => setTimeout(resolve, 200));

      const getImages = () => document.querySelectorAll('img:not([style*="display: none"])');
      
      let imageElements = getImages();
      let totalImages = imageElements.length;
      let stableChecks = 0;
      let previousCount = totalImages;

      // Quick stability check - only wait 2-3 seconds max for new images
      const stabilityCheckInterval = setInterval(() => {
        const currentImages = getImages();
        const currentCount = currentImages.length;

        if (currentCount === previousCount) {
          stableChecks++;
        } else {
          stableChecks = 0;
        }

        previousCount = currentCount;
        imageElements = currentImages;
        totalImages = currentCount;

        // Consider stable after 2 checks or 3 second timeout
        if (stableChecks >= 2) {
          clearInterval(stabilityCheckInterval);
        }
      }, 500);

      // Timeout for stability check
      await new Promise(resolve => setTimeout(resolve, 3000));
      clearInterval(stabilityCheckInterval);

      // If no images found, complete immediately
      if (totalImages === 0) {
        handleLoadComplete();
        return;
      }

      let loadedCount = 0;
      const loadedImages = new Set();
      const imageLoadPromises = [];

      const updateProgress = (img) => {
        if (loadedImages.has(img)) return;
        loadedImages.add(img);

        loadedCount++;
        const newProgress = Math.max(progress, Math.floor((loadedCount / totalImages) * 95));
        setProgress(newProgress);

        // Don't wait for all - complete at 85% to show content sooner
        if (loadedCount >= Math.ceil(totalImages * 0.85)) {
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
            
            // Set timeout for individual image
            const timeout = setTimeout(() => {
              updateProgress(img);
              img.removeEventListener('load', onLoad);
              img.removeEventListener('error', onError);
              resolve();
            }, 5000);

            img.addEventListener('load', () => {
              clearTimeout(timeout);
              onLoad();
            });
            img.addEventListener('error', () => {
              clearTimeout(timeout);
              onError();
            });
          }
        });
      };

      // Start loading all images in parallel immediately
      imageElements.forEach((img) => {
        imageLoadPromises.push(loadImagePromise(img));
      });

      // Wait for images but with a max timeout
      await Promise.race([
        Promise.all(imageLoadPromises),
        new Promise(resolve => setTimeout(resolve, 8000))
      ]);

      // Force complete after timeout
      if (loadedCount < totalImages) {
        setProgress(100);
        handleLoadComplete();
      }
    };

    // Start immediately
    const timer = setTimeout(loadImages, 50);
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
          <h1>Savage Squad</h1>
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
