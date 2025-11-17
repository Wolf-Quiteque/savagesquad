'use client';

import { useState, useEffect } from 'react';

export default function useContent(sectionId, defaultContent) {
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sectionId) {
      setLoading(false);
      return;
    }

    fetchContent();
  }, [sectionId]);

  const fetchContent = async () => {
    try {
      const res = await fetch(`/api/content?section_id=${sectionId}`);
      const data = await res.json();

      if (data.content && data.content.length > 0) {
        setContent(data.content[0]);
      } else {
        // Use default content if nothing found
        setContent(defaultContent);
      }
    } catch (err) {
      console.error('Failed to fetch content:', err);
      setError(err);
      // Fallback to default content on error
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  return { content, loading, error };
}
