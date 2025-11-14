'use client';

import { useEffect } from 'react';

export default function BackToTopButton() {
  useEffect(() => {
    // Define scrollToTop function when component mounts
    if (typeof window !== 'undefined') {
      window.scrollToTop = function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
    }
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button onClick={handleScrollToTop} id="backToTopBtn">
      <i className="fa-solid fa-arrow-turn-up"></i>
    </button>
  );
}
