'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith('/admin')) return;

    const trackView = async () => {
      try {
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname === '/' ? 'home' : pathname.replace('/', '')
          }),
        });
      } catch (error) {
        console.error('Analytics tracking failed:', error);
      }
    };

    trackView();
  }, [pathname]);

  return null;
}
