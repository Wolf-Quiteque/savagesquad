# Example: Converting HomePage to Use CMS

## Current Problem

Your `app/page.js` is hardcoded. When you edit content in `/admin/editor`, the changes save to the database but don't show on the website.

## Solution Example - Hero Section

Here's a working example of how to convert just the hero section to use CMS content:

### Step 1: Update app/page.js

Replace the beginning of your page.js:

```jsx
'use client';

import { useState, useEffect } from 'react';
import CMSContent from '@/app/components/CMSContent';

export default function Home() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const res = await fetch('/api/content?page=home');
        const data = await res.json();
        setContent(data.content || []);
      } catch (error) {
        console.error('Failed to load content:', error);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  // Helper function to get content
  const getContent = (sectionId, field = 'text') => {
    const item = content.find(c => c.section_id === sectionId);
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
  };

  return (
    <div className="site-wrapper">
      {/* ... your existing code ... */}

      {/* ======== 1.2. hero section ======== */}
      <section className="hero">
        <div className="container">
          <div className="row text-md-start text-sm-center text-center gap-md-0 gap-sm-4 gap-5">
            <div data-aos="fade-up" className="col-md-6 d-flex align-items-md-start align-items-ms-center align-items-center justify-content-center flex-column">
              {/* Dynamic Content from CMS */}
              <h1 dangerouslySetInnerHTML={{
                __html: getContent('hero_title', 'html') || 'EMPOWER YOUR CREDIT JOURNEY'
              }} />

              <p dangerouslySetInnerHTML={{
                __html: getContent('hero_description', 'html') || 'Savage sqaud provides surety bond certified credit services...'
              }} />

              <a className="btn-hover1" target="_blank" href="https://portal.savagesquad.com/portal-signUp/signup.jsp?id=QUdmcDBvQzhXNTk4Yy92TXluRG5KUT09">
                Schedule Free Consultation
              </a>
            </div>

            <div data-aos="fade-down" className="col-md-6 position-relative d-flex flex-column justify-content-center align-items-center mt-md-0 mt-sm-5 mt-4">
              {/* Dynamic Images from CMS */}
              <img
                src={getContent('hero_image_main', 'url') || '/assets/images/index/hero23.png'}
                alt={getContent('hero_image_main', 'alt') || 'hero_img1'}
                className="moving"
              />
              <img
                src={getContent('hero_image_watch', 'url') || '/assets/images/index/hero_watch.png'}
                alt={getContent('hero_image_watch', 'alt') || 'hero_img2'}
              />
              <img
                src={getContent('hero_icon_star', 'url') || '/assets/images/icon/hero_star.png'}
                alt={getContent('hero_icon_star', 'alt') || 'hero_icon'}
              />
            </div>
          </div>
        </div>
      </section>
      {/* ======== End of 1.2. hero section ========  */}

      {/* ... rest of your code ... */}
    </div>
  );
}
```

## What This Does

1. **Fetches all content** for the "home" page when the component loads
2. **Provides a helper function** `getContent()` to easily access content by section_id
3. **Falls back to original text** if content isn't found in database
4. **Updates in real-time** - when you edit in admin, refresh the page to see changes

## Testing

1. Go to `/admin/editor`
2. Find "Hero Title" and click Edit
3. Change the text to "NEW HERO TITLE"
4. Save
5. Go back to the homepage
6. Refresh - you should see "NEW HERO TITLE"

## Converting More Sections

Once the hero section works, you can convert other sections using the same pattern:

### About Section
```jsx
<h3 dangerouslySetInnerHTML={{
  __html: getContent('about_title', 'html') || 'About Savage sqaud'
}} />

<p dangerouslySetInnerHTML={{
  __html: getContent('about_description', 'html') || 'We are a surety bond certified...'
}} />

<h3>
  <span className="count">{getContent('about_clients_count') || '38'}</span>K+
</h3>
```

### Service Cards
```jsx
<figure>
  <img
    src={getContent('service_icon_graph', 'url') || '/assets/images/icon/graphe.png'}
    alt={getContent('service_icon_graph', 'alt') || 'graph'}
  />
</figure>
<h4>{getContent('service_credit_analysis_title') || 'Credit Analysis'}</h4>
<p dangerouslySetInnerHTML={{
  __html: getContent('service_credit_analysis_desc', 'html') || 'Comprehensive credit report review...'
}} />
```

## Why You Need This

**Current State:**
- You edit in admin ✅
- It saves to database ✅
- Frontend shows old text ❌

**After Integration:**
- You edit in admin ✅
- It saves to database ✅
- Frontend shows new text ✅

The frontend MUST fetch and use the content from the database, otherwise the CMS is just a fancy notepad that doesn't affect your website.
