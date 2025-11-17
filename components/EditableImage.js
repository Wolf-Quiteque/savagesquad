'use client';

import useContent from '@/hooks/useContent';
import Image from 'next/image';

export default function EditableImage({
  sectionId,
  defaultSrc,
  alt = '',
  className = '',
  width,
  height,
  page = 'home',
  sectionName = '',
  priority = false,
  ...props
}) {
  const defaultContent = {
    section_id: sectionId,
    content_type: 'image',
    content: {
      url: defaultSrc,
      alt: alt
    },
    metadata: {
      section_name: sectionName,
      page: page,
      order: 0
    }
  };

  const { content, loading } = useContent(sectionId, defaultContent);

  const src = content?.content?.url || defaultSrc;
  const altText = content?.content?.alt || alt;

  // Show default image while loading
  if (loading) {
    return (
      <img
        src={defaultSrc}
        alt={alt}
        className={className}
        {...props}
      />
    );
  }

  // Use Next.js Image component for optimization if width/height provided
  if (width && height) {
    return (
      <Image
        src={src}
        alt={altText}
        width={width}
        height={height}
        className={className}
        priority={priority}
        data-section-id={sectionId}
        data-editable="image"
        {...props}
      />
    );
  }

  // Use regular img tag for images without dimensions
  return (
    <img
      src={src}
      alt={altText}
      className={className}
      data-section-id={sectionId}
      data-editable="image"
      {...props}
    />
  );
}
