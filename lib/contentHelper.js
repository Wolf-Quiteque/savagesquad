/**
 * Content Helper - Utilities for fetching and using CMS content
 */

export async function fetchContent(sectionId = null, page = null) {
  try {
    let url = '/api/content';
    const params = new URLSearchParams();

    if (sectionId) params.append('section_id', sectionId);
    if (page) params.append('page', page);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();

    return data.content || [];
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return [];
  }
}

export function getContentBySection(content, sectionId) {
  return content.find(item => item.section_id === sectionId);
}

export function getContentValue(content, sectionId, field = 'text') {
  const item = getContentBySection(content, sectionId);
  if (!item) return '';

  if (item.content_type === 'image') {
    return field === 'url' ? (item.content?.url || '') : (item.content?.alt || '');
  }

  if (item.content_type === 'text') {
    return item.content?.text || '';
  }

  if (item.content_type === 'rich_text') {
    return field === 'html' ? (item.content?.html || '') : (item.content?.text || '');
  }

  return '';
}

export function renderContent(content, sectionId, fallback = '') {
  const value = getContentValue(content, sectionId, 'html');
  return value || fallback;
}

export function getImageUrl(content, sectionId, fallback = '') {
  const value = getContentValue(content, sectionId, 'url');
  return value || fallback;
}

export function getImageAlt(content, sectionId, fallback = '') {
  const value = getContentValue(content, sectionId, 'alt');
  return value || fallback;
}
