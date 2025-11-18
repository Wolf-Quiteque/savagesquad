# Frontend CMS Integration Guide

## The Problem

Your **frontend (app/page.js) is completely static** - it's hardcoded HTML that doesn't connect to the CMS database at all.

When you edit content in the admin panel:
- ✅ It saves to MongoDB correctly
- ✅ The editor shows the updated content
- ❌ **But the frontend doesn't fetch or use this data**

## The Solution

You have two options to integrate CMS content with your frontend:

### Option 1: Use the CMSContent Component (Recommended for Individual Elements)

I've created a `CMSContent` component that makes it easy to replace static content with dynamic CMS content.

**Before (Static):**
```jsx
<h1>EMPOWER YOUR CREDIT JOURNEY</h1>
```

**After (Dynamic):**
```jsx
import CMSContent from '@/app/components/CMSContent';

<CMSContent
  sectionId="hero_title"
  type="html"
  as="h1"
  fallback="EMPOWER YOUR CREDIT JOURNEY"
/>
```

**For Images:**
```jsx
// Before
<img src="/assets/images/logo2.png" alt="Logo" />

// After
<CMSContent
  sectionId="header_logo"
  type="image"
  fallback="/assets/images/logo2.png"
  alt="Savage Squade Logo"
  style={{height:"80px", width:"auto"}}
/>
```

### Option 2: Fetch All Content at Once (Recommended for Full Pages)

For better performance, fetch all content for a page at once:

```jsx
'use client';

import { useState, useEffect } from 'react';

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

  // Helper to get content by section_id
  const getContent = (sectionId, field = 'text') => {
    const item = content.find(c => c.section_id === sectionId);
    if (!item) return '';

    if (item.content_type === 'image') {
      return field === 'url' ? item.content?.url : item.content?.alt;
    }
    if (item.content_type === 'text') {
      return item.content?.text || '';
    }
    if (item.content_type === 'rich_text') {
      return field === 'html' ? item.content?.html : item.content?.text;
    }
    return '';
  };

  const getImageUrl = (sectionId) => getContent(sectionId, 'url');
  const getText = (sectionId) => getContent(sectionId, 'text');
  const getHTML = (sectionId) => getContent(sectionId, 'html');

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="site-wrapper">
      {/* Use dynamic content */}
      <img src={getImageUrl('header_logo') || '/assets/images/logo2.png'} alt="Logo" />
      <h1 dangerouslySetInnerHTML={{ __html: getHTML('hero_title') || 'EMPOWER YOUR CREDIT JOURNEY' }} />
      <p>{getText('hero_description')}</p>
    </div>
  );
}
```

## Example: Converting Hero Section

### Before (Static - Current):
```jsx
<section className="hero">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h1>EMPOWER YOUR CREDIT JOURNEY</h1>
        <p>Savage Squade provides surety bond certified credit services...</p>
      </div>
      <div className="col-md-6">
        <img src="/assets/images/index/hero23.png" alt="hero_img1" />
      </div>
    </div>
  </div>
</section>
```

### After (Dynamic):
```jsx
<section className="hero">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <CMSContent
          sectionId="hero_title"
          type="html"
          as="h1"
          fallback="EMPOWER YOUR CREDIT JOURNEY"
        />
        <CMSContent
          sectionId="hero_description"
          type="html"
          as="p"
          fallback="Savage Squade provides surety bond certified credit services..."
        />
      </div>
      <div className="col-md-6">
        <CMSContent
          sectionId="hero_image_main"
          type="image"
          fallback="/assets/images/index/hero23.png"
          alt="Hero Main Image"
          className="moving"
        />
      </div>
    </div>
  </div>
</section>
```

## Available Content in Database

After running `npm run seed:all`, you have 100+ content items including:

### Global
- `header_logo` - Header logo image
- `sidebar_logo` - Sidebar logo image
- `footer_logo` - Footer logo image

### Hero Section
- `hero_title` - Main hero title
- `hero_description` - Hero description text
- `hero_image_main` - Main hero image
- `hero_image_watch` - Watch image
- `hero_icon_star` - Star icon

### About Section
- `about_title` - About section title
- `about_description` - About description
- `about_clients_count` - Number of clients (e.g., "38")
- `about_clients_text` - Clients text
- `about_bonded_percentage` - Bonded percentage (e.g., "100%")
- `about_bonded_text` - Bonded text
- `about_card_image1` - About card image 1
- `about_card_image2` - About card image 2

### Services Section
- `finance_title` - Finance/services section title
- `finance_description` - Finance description
- `service_icon_graph` - Graph icon
- `service_credit_analysis_title` - Credit analysis title
- `service_credit_analysis_desc` - Credit analysis description
- `service_icon_dollar` - Dollar icon
- `service_consultation_title` - Consultation title
- `service_consultation_desc` - Consultation description
- `service_icon_arrow` - Arrow icon
- `service_guidance_title` - Guidance title
- `service_guidance_desc` - Guidance description

### Process Section
- `process_title` - Process section title
- `process_description` - Process description
- `process_icon_1` - Process icon 1
- `process_step1_title` - Step 1 title
- `process_step1_desc` - Step 1 description
- (and so on for steps 2 and 3)

### Contact Section
- `contact_title` - Contact title
- `contact_description` - Contact description
- `contact_address` - Address
- `contact_phone` - Phone number
- `contact_email` - Email address

### FAQ Section
- `faq_title` - FAQ section title
- `faq_description` - FAQ description
- `faq_q1` - Question 1
- `faq_a1` - Answer 1
- (and so on for all FAQs)

## Quick Start

1. **Run the seed script** (if you haven't already):
   ```bash
   npm run seed:all
   ```

2. **Import the CMSContent component** in your page:
   ```jsx
   import CMSContent from '@/app/components/CMSContent';
   ```

3. **Replace static content** with dynamic content:
   ```jsx
   <CMSContent
     sectionId="hero_title"
     type="html"
     as="h1"
     fallback="Your fallback text"
   />
   ```

4. **Edit content** in the admin panel at `/admin/editor`

5. **Refresh the page** - changes appear immediately!

## Why This Is Important

Without connecting the frontend to the CMS:
- ❌ Admin edits don't affect the live site
- ❌ You're maintaining two copies of content (database + code)
- ❌ The CMS is essentially useless

With the CMS connected:
- ✅ Edit content once in admin panel
- ✅ Changes appear immediately on the site
- ✅ No need to redeploy for content changes
- ✅ Non-technical users can update content

## ✅ INTEGRATION COMPLETED!

The frontend CMS integration has been successfully implemented! The following sections have been converted to use dynamic CMS content:

### What's Been Integrated:

1. **Header Section** ✅
   - Main navigation logo ([page.js:15-21](app/page.js#L15-L21))
   - Sidebar logo ([page.js:66-72](app/page.js#L66-L72))
   - Right sidebar logo ([page.js:140-145](app/page.js#L140-L145))

2. **Hero Section** ✅
   - Hero title ([page.js:181-186](app/page.js#L181-L186))
   - Hero description ([page.js:187-192](app/page.js#L187-L192))
   - Hero main image ([page.js:196-202](app/page.js#L196-L202))
   - Hero watch image ([page.js:203-208](app/page.js#L203-L208))
   - Hero star icon ([page.js:209-214](app/page.js#L209-L214))

3. **About Section** ✅
   - About title ([page.js:226-231](app/page.js#L226-L231))
   - About description ([page.js:232-238](app/page.js#L232-L238))
   - Client count statistic ([page.js:254-260](app/page.js#L254-L260))
   - Client count text ([page.js:263-269](app/page.js#L263-L269))
   - Bonded percentage ([page.js:275-280](app/page.js#L275-L280))
   - Bonded text ([page.js:281-287](app/page.js#L281-L287))
   - About card images ([page.js:293-304](app/page.js#L293-L304))

4. **Services/Finance Section** ✅
   - Finance section title ([page.js:327-332](app/page.js#L327-L332))
   - Finance description ([page.js:333-339](app/page.js#L333-L339))
   - Credit Analysis service (icon, title, description) ([page.js:344-363](app/page.js#L344-L363))
   - Free Consultation service (icon, title, description) ([page.js:369-388](app/page.js#L369-L388))
   - Expert Guidance service (icon, title, description) ([page.js:394-413](app/page.js#L394-L413))

### How to Use:

1. **View Your Live Site**: Open [http://localhost:3001](http://localhost:3001) to see the integrated frontend
2. **Edit Content**: Navigate to [/admin/editor](/admin/editor) in your admin panel
3. **See Changes Live**: Edit any of the integrated sections and refresh the homepage - changes appear immediately!

### Example Edits to Try:

- Change the hero title from "EMPOWER YOUR CREDIT JOURNEY" to something new
- Update the client count from "38K+" to your actual number
- Replace any of the images with new ones
- Modify service descriptions to better match your offerings

5. **Gateway/Process Section** ✅
   - Process title and description ([page.js:473-485](app/page.js#L473-L485))
   - Process main image ([page.js:462-468](app/page.js#L462-L468))
   - Step 1: Icon, title, description ([page.js:488-509](app/page.js#L488-L509))
   - Step 2: Icon, title, description ([page.js:513-535](app/page.js#L513-L535))
   - Step 3: Icon, title, description ([page.js:539-561](app/page.js#L539-L561))

6. **Pricing Section** ✅
   - Pricing title and description ([page.js:747-760](app/page.js#L747-L760))
   - Pricing images (main image and star icon) ([page.js:728-743](app/page.js#L728-L743))
   - Pricing item 1: Title and description ([page.js:762-778](app/page.js#L762-L778))
   - Pricing item 2: Title and description ([page.js:788-803](app/page.js#L788-L803))

7. **Testimonials Section** ✅
   - Testimonials title and description ([page.js:823-836](app/page.js#L823-L836))
   - Testimonial 1: Image, text, name, role ([page.js:842-882](app/page.js#L842-L882))

8. **FAQ Section** ✅
   - FAQ title and description ([page.js:949-962](app/page.js#L949-L962))
   - FAQ Question 1 & Answer 1 ([page.js:972-987](app/page.js#L972-L987))
   - FAQ Question 2 & Answer 2 ([page.js:994-1009](app/page.js#L994-L1009))
   - FAQ Question 3 & Answer 3 ([page.js:1016-1031](app/page.js#L1016-L1031))
   - FAQ Question 4 & Answer 4 ([page.js:1038-1053](app/page.js#L1038-L1053))

9. **Contact Section** ✅
   - Contact title and description ([page.js:1068-1081](app/page.js#L1068-L1081))
   - Contact address, phone, email ([page.js:1104-1127](app/page.js#L1104-L1127))

10. **Footer Section** ✅
    - Footer logo ([page.js:1164-1170](app/page.js#L1164-L1170))
    - Copyright text and tagline ([page.js:1215-1226](app/page.js#L1215-L1226))

### 🎉 FULL INTEGRATION COMPLETE!

**All major sections of your website are now connected to the CMS!** You can now edit every piece of content through the admin panel.

## Next Steps

To integrate more sections:
1. Follow the same pattern used in the existing sections
2. Use the `CMSContent` component with appropriate `sectionId` values
3. Refer to the seeded content in the database for available section IDs
4. Test changes in the admin editor after integration
