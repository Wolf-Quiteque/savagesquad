# Content Seeding Script Guide

## ✅ Collection Name Verification

Your seed script is **correctly configured** to use the unique collection name:

**Collection Used:** `savagesquad_site_content`

---

## 📋 How It Works

The seed script imports the `SiteContent` model:

```javascript
import SiteContent from '../models/SiteContent.js';
```

This model is configured with the explicit collection name:

```javascript
// In models/SiteContent.js
mongoose.model('SiteContent', SiteContentSchema, 'savagesquad_site_content')
                                                   ↑
                                    Unique collection name - no conflicts!
```

**Result:** All seeded content goes into `savagesquad_site_content` collection.

---

## 🚀 Running the Seed Script

### Step 1: Set Up Environment

Create `.env.local` (copy from `.env.local.example`):

```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/your-database
```

### Step 2: Edit Seed Data

Open `scripts/seedContent.js` and customize the `seedData` array with your actual site content:

```javascript
const seedData = [
  {
    section_id: 'hero_title',  // ← Unique ID for this content
    content_type: 'rich_text',
    content: {
      text: 'Your Actual Hero Title',
      html: '<h1>Your Actual Hero Title</h1>',
    },
    metadata: {
      section_name: 'Hero Title',
      page: 'home',
      order: 1,
    },
    updated_by: 'system',
  },
  // ... add more sections
];
```

### Step 3: Run the Script

```bash
npm run seed
```

### Expected Output:

```
🌱 Starting content seeding...
📡 Connecting to MongoDB...
✅ Connected to MongoDB
📝 Using collection: savagesquad_site_content  ← Confirms unique collection!
📦 Seeding 10 content items...
✨ Created: hero_title
✨ Created: hero_subtitle
✨ Created: hero_description
✨ Created: hero_image
✨ Created: about_title
✨ Created: about_description
✨ Created: services_title
✨ Created: contact_title
✨ Created: contact_phone
✨ Created: contact_email

📊 Seeding Summary:
   ✅ Created: 10
   📝 Updated: 0
   ⏭️  Skipped: 0
   📦 Total: 10

🎉 Content seeding completed successfully!
👋 Disconnected from MongoDB
```

---

## 🔍 Verification

After running the seed script, verify in MongoDB:

### Using MongoDB Compass:

1. Connect to your database
2. Look for collection: `savagesquad_site_content`
3. Verify it contains 10 documents

### Using MongoDB CLI:

```javascript
// Connect to your database
use your-database-name

// List collections (should include savagesquad_site_content)
show collections

// Count documents
db.savagesquad_site_content.countDocuments()
// Output: 10

// View documents
db.savagesquad_site_content.find().pretty()
```

---

## 🔄 Re-running the Script

The script is **idempotent** (safe to run multiple times):

**First run:**
```
✨ Created: hero_title
✨ Created: hero_subtitle
...
```

**Second run:**
```
⏭️  Skipped: hero_title (already exists)
⏭️  Skipped: hero_subtitle (already exists)
...
```

It checks for existing `section_id` and only creates new ones!

---

## 📝 Customizing Seed Data

### Example: Add a New Section

```javascript
const seedData = [
  // ... existing sections ...

  // New Testimonials Section
  {
    section_id: 'testimonials_title',
    content_type: 'rich_text',
    content: {
      text: 'What Our Clients Say',
      html: '<h2>What Our Clients Say</h2>',
    },
    metadata: {
      section_name: 'Testimonials Title',
      page: 'home',
      order: 40,
    },
    updated_by: 'system',
  },
  {
    section_id: 'testimonial_1',
    content_type: 'rich_text',
    content: {
      text: 'Savage Squad helped me improve my credit score by 150 points!',
      html: '<p>"Savage Squad helped me improve my credit score by 150 points!"</p>',
    },
    metadata: {
      section_name: 'Testimonial 1',
      page: 'home',
      order: 41,
    },
    updated_by: 'system',
  },
];
```

### Content Types

**Text (plain):**
```javascript
{
  section_id: 'footer_copyright',
  content_type: 'text',
  content: {
    text: '© 2025 Savage Squad. All rights reserved.',
  },
  // ...
}
```

**Rich Text (HTML):**
```javascript
{
  section_id: 'about_description',
  content_type: 'rich_text',
  content: {
    text: 'Plain text version',
    html: '<p><strong>Bold</strong> and <em>italic</em> text</p>',
  },
  // ...
}
```

**Image:**
```javascript
{
  section_id: 'hero_background',
  content_type: 'image',
  content: {
    url: '/assets/images/hero-bg.jpg',
    alt: 'Hero background image',
  },
  // ...
}
```

**Link:**
```javascript
{
  section_id: 'cta_button',
  content_type: 'link',
  content: {
    text: 'Get Started',
    href: '/contact',
    target: '_self',
  },
  // ...
}
```

---

## ⚠️ Important Notes

1. **Unique section_id**: Each content item must have a unique `section_id`
2. **Collection prefix**: All data goes to `savagesquad_site_content` (no conflicts!)
3. **Idempotent**: Safe to run multiple times
4. **No deletion**: Script only creates, never deletes existing content
5. **Manual update**: To update existing content, use the CMS admin panel

---

## 🎯 Database Structure After Seeding

```
Your MongoDB Database
└── savagesquad_site_content (collection)
    ├── { section_id: "hero_title", ... }
    ├── { section_id: "hero_subtitle", ... }
    ├── { section_id: "hero_description", ... }
    ├── { section_id: "hero_image", ... }
    ├── { section_id: "about_title", ... }
    ├── { section_id: "about_description", ... }
    ├── { section_id: "services_title", ... }
    ├── { section_id: "contact_title", ... }
    ├── { section_id: "contact_phone", ... }
    └── { section_id: "contact_email", ... }
```

All isolated in the `savagesquad_site_content` collection! ✅

---

## 🚨 Troubleshooting

### Error: "MONGODB_URI is not defined"
**Fix:** Create `.env.local` file with your MongoDB connection string

### Error: "Connection refused"
**Fix:** Check your MongoDB URI and ensure the cluster is running

### All items show as "Skipped"
**Reason:** Content already exists in database (this is normal!)
**Action:** Either delete existing content in MongoDB or add new sections

### Different collection name appears
**Fix:** Ensure you're importing the model from `../models/SiteContent.js`

---

## ✨ Success Checklist

- [ ] `.env.local` file created with MONGODB_URI
- [ ] Seed data customized with your actual content
- [ ] Script runs without errors
- [ ] Output shows: "Using collection: savagesquad_site_content"
- [ ] MongoDB contains `savagesquad_site_content` collection
- [ ] All content items created successfully
- [ ] Website shows seeded content when using EditableText/EditableImage components

---

## 📚 Next Steps After Seeding

1. **Visit your site** - Content should display from database
2. **Login to admin** - `/admin/login`
3. **Edit content** - `/admin/editor`
4. **View analytics** - `/admin` (dashboard)

Your CMS is fully populated and ready to use! 🎉
