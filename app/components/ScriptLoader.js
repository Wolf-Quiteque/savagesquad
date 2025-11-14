'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function ScriptLoader() {
  useEffect(() => {
    // Initialize AOS when it's available
    const initAOS = () => {
      if (typeof window !== 'undefined' && window.AOS) {
        window.AOS.init({ once: true, duration: 1500 });
      }
    };

    // Wait a bit for all scripts to load
    const timer = setTimeout(initAOS, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* jQuery - load first as other scripts depend on it */}
      <Script
        src="/assets/js/jquery.js"
        strategy="beforeInteractive"
      />
      {/* bootstrap min javascript */}
      <Script
        src="/assets/js/javascript-lib/bootstrap.min.js"
        strategy="afterInteractive"
      />
      {/* slick slider js */}
      <Script
        src="/assets/js/slick.min.js"
        strategy="afterInteractive"
      />
      {/* counter javascript file */}
      <Script
        src="/assets/js/waypoints.min.js"
        strategy="afterInteractive"
      />
      {/* animation from javascript */}
      <Script
        src="/assets/js/aos.js"
        strategy="afterInteractive"
      />
      {/* main javascript - load last as it may depend on others */}
      <Script
        src="/assets/js/custom.js"
        strategy="lazyOnload"
      />
    </>
  );
}
