'use client';

import useContent from '@/hooks/useContent';

export default function EditableText({
  sectionId,
  defaultText,
  className = '',
  tag: Tag = 'p',
  page = 'home',
  sectionName = ''
}) {
  const defaultContent = {
    section_id: sectionId,
    content_type: 'rich_text',
    content: {
      text: defaultText,
      html: defaultText
    },
    metadata: {
      section_name: sectionName,
      page: page,
      order: 0
    }
  };

  const { content, loading } = useContent(sectionId, defaultContent);

  // Show default text while loading to prevent layout shift
  if (loading) {
    return <Tag className={className}>{defaultText}</Tag>;
  }

  // Render HTML content if available, otherwise plain text, otherwise default
  const displayContent = content?.content?.html || content?.content?.text || defaultText;

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: displayContent }}
      data-section-id={sectionId}
      data-editable="text"
    />
  );
}
