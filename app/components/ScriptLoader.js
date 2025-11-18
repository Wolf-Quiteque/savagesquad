'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function ScriptLoader() {
  useEffect(() => {
    // Initialize AOS and other animations when available
    const initScripts = () => {
      if (typeof window !== 'undefined') {
        // Initialize AOS animations
        if (window.AOS) {
          window.AOS.init({
            once: false,  // Allow animations to trigger multiple times
            duration: 1500,
            offset: 120,
            delay: 0,
            easing: 'ease-in-out',
            mirror: false,  // Don't animate out when scrolling past
            anchorPlacement: 'top-bottom'
          });
        }

        // Refresh animations on page load
        if (window.AOS) {
          window.AOS.refresh();
        }

        // Initialize sliders when jQuery and Slick are available
        if (window.jQuery && window.jQuery.fn.slick) {
          const $ = window.jQuery;

          // Initialize testimonial slider if not already initialized
          const profSlider = $('.prof-slider');
          if (profSlider.length && !profSlider.hasClass('slick-initialized')) {
            profSlider.slick({
              arrows: true,
              dots: false,
              infinite: true,
              autoplay: true,
              speed: 700,
              slidesToShow: 1,
              slidesToScroll: 1,
              prevArrow: '<button class="prev-arrow"><i class="fa-solid fa-arrow-left"></i></button>',
              nextArrow: '<button class="next-arrow"><i class="fa-solid fa-arrow-right"></i></button>',
              responsive: [{
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: false,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }]
            });
          }
        }
      }
    };

    // Wait for all scripts to load
    const timer = setTimeout(initScripts, 200);

    // Also reinitialize when testimonials might have loaded
    const testimonialTimer = setTimeout(initScripts, 1000);

    // Re-initialize on scroll for better detection
    const handleScroll = () => {
      if (window.AOS) {
        window.AOS.refresh();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(testimonialTimer);
      window.removeEventListener('scroll', handleScroll);
    };
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
      <Script
        src="/assets/js/counter.js"
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
        strategy="afterInteractive"
      />
    </>
  );
}
