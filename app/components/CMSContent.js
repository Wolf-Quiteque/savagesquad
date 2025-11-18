'use client';

import { useState, useEffect } from 'react';

/**
 * CMSContent Component
 *
 * Fetches and displays dynamic content from the CMS
 * Falls back to provided static content if CMS fetch fails
 */
export default function CMSContent({
  sectionId,
  type = 'text', // 'text', 'html', or 'image'
  fallback = '',
  className = '',
  style = {},
  alt = '',
  as: Component = 'div'
}) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch(`/api/content?section_id=${sectionId}`);
        const data = await res.json();

        if (data.content && data.content.length > 0) {
          setContent(data.content[0]);
        }
      } catch (error) {
        console.error(`Failed to load content for ${sectionId}:`, error);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [sectionId]);

  if (loading) {
    return null; // Or return fallback immediately
  }

  // No content found, use fallback
  if (!content) {
    if (type === 'image') {
      return <img src={fallback} alt={alt} className={className} style={style} />;
    }
    if (type === 'html') {
      return <Component className={className} style={style} dangerouslySetInnerHTML={{ __html: fallback }} />;
    }
    return <Component className={className} style={style}>{fallback}</Component>;
  }

  // Render based on content type
  if (content.content_type === 'image') {
    return (
      <img
        src={content.content?.url || fallback}
        alt={content.content?.alt || alt}
        className={className}
        style={style}
      />
    );
  }

  if (content.content_type === 'rich_text') {
    return (
      <Component
        className={className}
        style={style}
        dangerouslySetInnerHTML={{ __html: content.content?.html || content.content?.text || fallback }}
      />
    );
  }

  if (content.content_type === 'text') {
    return (
      <Component className={className} style={style}>
        {content.content?.text || fallback}
      </Component>
    );
  }

  return <Component className={className} style={style}>{fallback}</Component>;
}
